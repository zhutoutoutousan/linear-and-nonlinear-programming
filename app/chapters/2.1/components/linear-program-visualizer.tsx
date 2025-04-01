import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { MathJaxContext, MathJax } from "better-react-mathjax"

const config = {
  loader: { load: ["[tex]/html"] },
  tex: {
    packages: { "[+]": ["html"] },
    inlineMath: [["$", "$"]],
    displayMath: [["$$", "$$"]],
  },
}

interface Point {
  x: number
  y: number
}

interface Constraint {
  a: number
  b: number
  c: number
  type: "≤" | "≥" | "="
}

export function LinearProgramVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [objective, setObjective] = useState({ c1: 1, c2: 1 })
  const [constraints, setConstraints] = useState<Constraint[]>([
    { a: 1, b: 1, c: 4, type: "≤" },
    { a: 2, b: 1, c: 6, type: "≤" },
    { a: 0, b: 1, c: 2, type: "≤" },
  ])
  const [showFeasibleRegion, setShowFeasibleRegion] = useState(true)
  const [showObjective, setShowObjective] = useState(true)

  const drawLinearProgram = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const padding = 40

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw axes
    ctx.beginPath()
    ctx.strokeStyle = "#666"
    ctx.lineWidth = 1
    ctx.moveTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.moveTo(padding, height - padding)
    ctx.lineTo(padding, padding)
    ctx.stroke()

    // Draw constraints
    constraints.forEach((constraint, index) => {
      const { a, b, c, type } = constraint
      ctx.beginPath()
      ctx.strokeStyle = `hsl(${(index * 120) % 360}, 70%, 50%)`
      ctx.lineWidth = 2

      // Calculate points for the line
      let x1, y1, x2, y2
      if (b !== 0) {
        x1 = padding
        y1 = height - padding - ((c - a * x1) / b) * (height - 2 * padding) / 6
        x2 = width - padding
        y2 = height - padding - ((c - a * x2) / b) * (height - 2 * padding) / 6
      } else {
        x1 = (c / a) * (width - 2 * padding) / 6 + padding
        y1 = padding
        x2 = x1
        y2 = height - padding
      }

      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()

      // Draw inequality direction
      const midX = (x1 + x2) / 2
      const midY = (y1 + y2) / 2
      ctx.fillStyle = ctx.strokeStyle
      ctx.font = "16px Arial"
      ctx.fillText(type, midX + 5, midY - 5)
    })

    // Draw feasible region
    if (showFeasibleRegion) {
      ctx.fillStyle = "rgba(100, 200, 255, 0.2)"
      ctx.beginPath()
      ctx.moveTo(padding, height - padding)
      ctx.lineTo(width - padding, height - padding)
      ctx.lineTo(width - padding, padding)
      ctx.lineTo(padding, padding)
      ctx.closePath()
      ctx.fill()
    }

    // Draw objective function
    if (showObjective) {
      ctx.beginPath()
      ctx.strokeStyle = "#ff4444"
      ctx.lineWidth = 2
      ctx.setLineDash([5, 5])

      const { c1, c2 } = objective
      const x1 = padding
      const y1 = height - padding - ((1 - c1 * x1) / c2) * (height - 2 * padding) / 6
      const x2 = width - padding
      const y2 = height - padding - ((1 - c1 * x2) / c2) * (height - 2 * padding) / 6

      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()
      ctx.setLineDash([])
    }
  }

  useEffect(() => {
    drawLinearProgram()
  }, [objective, constraints, showFeasibleRegion, showObjective])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif">Linear Program Visualizer</CardTitle>
        <CardDescription>Visualize linear programming problems and their feasible regions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-medium">Objective Function</h3>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="text-sm text-muted-foreground">c₁</label>
              <Slider
                value={[objective.c1]}
                onValueChange={([value]) => setObjective({ ...objective, c1: value })}
                min={-2}
                max={2}
                step={0.1}
              />
            </div>
            <div className="flex-1">
              <label className="text-sm text-muted-foreground">c₂</label>
              <Slider
                value={[objective.c2]}
                onValueChange={([value]) => setObjective({ ...objective, c2: value })}
                min={-2}
                max={2}
                step={0.1}
              />
            </div>
          </div>
          <div className="text-sm">
            <MathJaxContext config={config}>
              <MathJax>
                {`minimize $${objective.c1}x_1 + ${objective.c2}x_2$`}
              </MathJax>
            </MathJaxContext>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">Constraints</h3>
          {constraints.map((constraint, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="flex-1">
                <label className="text-sm text-muted-foreground">a</label>
                <Slider
                  value={[constraint.a]}
                  onValueChange={([value]) => {
                    const newConstraints = [...constraints]
                    newConstraints[index] = { ...constraint, a: value }
                    setConstraints(newConstraints)
                  }}
                  min={-2}
                  max={2}
                  step={0.1}
                />
              </div>
              <div className="flex-1">
                <label className="text-sm text-muted-foreground">b</label>
                <Slider
                  value={[constraint.b]}
                  onValueChange={([value]) => {
                    const newConstraints = [...constraints]
                    newConstraints[index] = { ...constraint, b: value }
                    setConstraints(newConstraints)
                  }}
                  min={-2}
                  max={2}
                  step={0.1}
                />
              </div>
              <div className="flex-1">
                <label className="text-sm text-muted-foreground">c</label>
                <Slider
                  value={[constraint.c]}
                  onValueChange={([value]) => {
                    const newConstraints = [...constraints]
                    newConstraints[index] = { ...constraint, c: value }
                    setConstraints(newConstraints)
                  }}
                  min={-6}
                  max={6}
                  step={0.1}
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const newConstraints = [...constraints]
                  newConstraints[index] = {
                    ...constraint,
                    type: constraint.type === "≤" ? "≥" : "≤",
                  }
                  setConstraints(newConstraints)
                }}
              >
                {constraint.type}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const newConstraints = constraints.filter((_, i) => i !== index)
                  setConstraints(newConstraints)
                }}
              >
                ×
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setConstraints([
                ...constraints,
                { a: 1, b: 1, c: 4, type: "≤" },
              ])
            }}
          >
            Add Constraint
          </Button>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">Display Options</h3>
          <div className="flex gap-4">
            <Button
              variant={showFeasibleRegion ? "default" : "outline"}
              size="sm"
              onClick={() => setShowFeasibleRegion(!showFeasibleRegion)}
            >
              Show Feasible Region
            </Button>
            <Button
              variant={showObjective ? "default" : "outline"}
              size="sm"
              onClick={() => setShowObjective(!showObjective)}
            >
              Show Objective Function
            </Button>
          </div>
        </div>

        <canvas
          ref={canvasRef}
          width={400}
          height={300}
          className="w-full border rounded-md"
        />
      </CardContent>
    </Card>
  )
} 