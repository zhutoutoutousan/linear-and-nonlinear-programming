"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Network, RefreshCw, CheckCircle, XCircle, HelpCircle } from "lucide-react"
import * as d3 from "d3"

interface Node extends d3.SimulationNodeDatum {
  id: string
  group: number
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: Node
  target: Node
  value: number
  capacity: number
}

interface GraphData {
  nodes: Node[]
  links: Link[]
}

const createInitialData = (): GraphData => {
  const nodes: Node[] = [
    { id: "S", group: 0 }, // Source
    { id: "A", group: 1 },
    { id: "B", group: 1 },
    { id: "C", group: 1 },
    { id: "T", group: 2 }, // Sink
  ]

  const links: Link[] = [
    { source: nodes[0], target: nodes[1], value: 0, capacity: 5 },
    { source: nodes[0], target: nodes[2], value: 0, capacity: 3 },
    { source: nodes[1], target: nodes[3], value: 0, capacity: 4 },
    { source: nodes[2], target: nodes[3], value: 0, capacity: 2 },
    { source: nodes[3], target: nodes[4], value: 0, capacity: 6 },
  ]

  return { nodes, links }
}

const initialData = createInitialData()

export function MaximalFlowProblemGame() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [data, setData] = useState<GraphData>(initialData)
  const [selectedLink, setSelectedLink] = useState<Link | null>(null)
  const [flowValue, setFlowValue] = useState<number>(0)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showInstructions, setShowInstructions] = useState<boolean>(true)
  const [simulation, setSimulation] = useState<d3.Simulation<Node, Link> | null>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const width = 600
    const height = 400

    // Clear previous graph
    d3.select(svgRef.current).selectAll("*").remove()

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)

    // Create a new simulation
    const newSimulation = d3.forceSimulation<Node>(data.nodes)
      .force("link", d3.forceLink<Node, Link>(data.links).id(d => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(40))
    
    setSimulation(newSimulation)

    // Create links
    const link = svg.append("g")
      .selectAll("line")
      .data(data.links)
      .join("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", d => Math.sqrt(d.value) + 1)
      .style("cursor", "pointer")
      .on("click", (event, d) => {
        setSelectedLink(d)
        setFlowValue(d.value)
        setIsCorrect(null)
      })

    // Create nodes
    const nodeGroup = svg.append("g")
      .selectAll("circle")
      .data(data.nodes)
      .join("circle")
      .attr("r", 20)
      .attr("fill", d => {
        if (d.group === 0) return "#22c55e" // Source - green
        if (d.group === 2) return "#ef4444" // Sink - red
        return "#3b82f6" // Intermediate nodes - blue
      })
      .style("cursor", "grab")
      .call(d3.drag<SVGCircleElement, Node>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended))

    // Add node labels
    const label = svg.append("g")
      .selectAll("text")
      .data(data.nodes)
      .join("text")
      .text(d => d.id)
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .attr("dy", 4)
      .attr("fill", "white")
      .style("pointer-events", "none")

    // Add capacity labels
    const capacityLabel = svg.append("g")
      .selectAll("text")
      .data(data.links)
      .join("text")
      .text(d => `${d.value}/${d.capacity}`)
      .attr("font-size", 10)
      .attr("text-anchor", "middle")
      .attr("dy", -5)
      .style("pointer-events", "none")

    // Update positions on each tick
    newSimulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x!)
        .attr("y1", d => d.source.y!)
        .attr("x2", d => d.target.x!)
        .attr("y2", d => d.target.y!)

      nodeGroup
        .attr("cx", d => d.x!)
        .attr("cy", d => d.y!)

      label
        .attr("x", d => d.x!)
        .attr("y", d => d.y!)

      capacityLabel
        .attr("x", d => (d.source.x! + d.target.x!) / 2)
        .attr("y", d => (d.source.y! + d.target.y!) / 2)
    })

    function dragstarted(event: d3.D3DragEvent<SVGCircleElement, Node, Node>) {
      if (!event.active) newSimulation.alphaTarget(0.3).restart()
      event.subject.fx = event.subject.x
      event.subject.fy = event.subject.y
      d3.select(event.sourceEvent.currentTarget as Element).style("cursor", "grabbing")
    }

    function dragged(event: d3.D3DragEvent<SVGCircleElement, Node, Node>) {
      event.subject.fx = event.x
      event.subject.fy = event.y
    }

    function dragended(event: d3.D3DragEvent<SVGCircleElement, Node, Node>) {
      if (!event.active) newSimulation.alphaTarget(0)
      event.subject.fx = null
      event.subject.fy = null
      d3.select(event.sourceEvent.currentTarget as Element).style("cursor", "grab")
    }

    return () => {
      newSimulation.stop()
    }
  }, [data])

  const handleFlowChange = (value: number) => {
    if (!selectedLink) return

    const newData = { ...data }
    const link = newData.links.find(
      (l) => l.source.id === selectedLink.source.id && l.target.id === selectedLink.target.id
    )
    if (link) {
      link.value = Math.min(Math.max(0, value), link.capacity)
      setData(newData)
    }
  }

  const checkSolution = () => {
    // Check if flow conservation is maintained at intermediate nodes
    const nodeBalances = new Map<string, number>()
    
    data.links.forEach(link => {
      const sourceBalance = nodeBalances.get(link.source.id) || 0
      const targetBalance = nodeBalances.get(link.target.id) || 0
      
      nodeBalances.set(link.source.id, sourceBalance - link.value)
      nodeBalances.set(link.target.id, targetBalance + link.value)
    })

    // All intermediate nodes should have zero net flow
    const isFlowConserved = Array.from(nodeBalances.entries())
      .filter(([nodeId]) => {
        const node = data.nodes.find(n => n.id === nodeId)
        return node && node.group === 1 // Only check intermediate nodes
      })
      .every(([_, balance]) => Math.abs(balance) < 0.001)

    setIsCorrect(isFlowConserved)
  }

  const resetGame = () => {
    setData(createInitialData())
    setSelectedLink(null)
    setFlowValue(0)
    setIsCorrect(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Network className="h-5 w-5" />
          Maximal Flow Problem Interactive
        </CardTitle>
        <CardDescription>
          Find the maximum flow from source (S) to sink (T) while respecting capacity constraints
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {showInstructions && (
          <div className="bg-muted p-4 rounded-lg mb-4">
            <h3 className="font-medium flex items-center gap-2 mb-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              How to Play
            </h3>
            <ol className="list-decimal pl-5 space-y-2 text-sm">
              <li><strong>Rearrange the network:</strong> Drag nodes to position them for better visualization.</li>
              <li><strong>Select an edge:</strong> Click on any edge (line) to select it for flow adjustment.</li>
              <li><strong>Adjust flow:</strong> Use the slider to set the flow value for the selected edge (cannot exceed capacity).</li>
              <li><strong>Check solution:</strong> Click "Check Solution" to verify if flow conservation is maintained at intermediate nodes.</li>
              <li><strong>Goal:</strong> Find a valid flow that maximizes the total flow from source (S) to sink (T).</li>
              <li><strong>Reset:</strong> Click "Reset" to start over with zero flows.</li>
            </ol>
            <div className="mt-3 flex justify-end">
              <Button variant="outline" size="sm" onClick={() => setShowInstructions(false)}>
                Got it
              </Button>
            </div>
          </div>
        )}
        
        <div className="flex justify-center">
          <svg ref={svgRef} className="border rounded-lg bg-white" />
        </div>
        
        <div className="flex flex-col items-center gap-4">
          {selectedLink && (
            <div className="space-y-2 w-full max-w-md">
              <p className="text-sm text-center">
                Adjust flow for {selectedLink.source.id} → {selectedLink.target.id}
              </p>
              <input
                type="range"
                min="0"
                max={selectedLink.capacity}
                value={flowValue}
                onChange={(e) => {
                  setFlowValue(Number(e.target.value))
                  handleFlowChange(Number(e.target.value))
                }}
                className="w-full"
              />
              <p className="text-sm text-center">
                Current flow: {flowValue} / Capacity: {selectedLink.capacity}
              </p>
            </div>
          )}

          <div className="flex gap-2">
            <Button onClick={checkSolution} disabled={!selectedLink}>
              Check Solution
            </Button>
            <Button variant="outline" onClick={resetGame}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button variant="ghost" onClick={() => setShowInstructions(true)}>
              <HelpCircle className="h-4 w-4 mr-2" />
              Instructions
            </Button>
          </div>

          {isCorrect !== null && (
            <div className={`flex items-center gap-2 ${isCorrect ? "text-green-500" : "text-red-500"}`}>
              {isCorrect ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <XCircle className="h-5 w-5" />
              )}
              <span>
                {isCorrect
                  ? "Flow conservation is maintained!"
                  : "Flow conservation is violated. Try again!"}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 