import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { MathJaxContext, MathJax } from "better-react-mathjax"
import { Info, CheckCircle2, XCircle, ArrowRight, ArrowLeft, RotateCcw } from "lucide-react"

interface Location {
  id: string
  name: string
  supply: number
}

interface Destination {
  id: string
  name: string
  demand: number
}

interface ShippingCost {
  from: string
  to: string
  cost: number
}

const origins: Location[] = [
  { id: "origin1", name: "Factory A", supply: 100 },
  { id: "origin2", name: "Factory B", supply: 150 },
  { id: "origin3", name: "Factory C", supply: 200 },
]

const destinations: Destination[] = [
  { id: "dest1", name: "Store X", demand: 120 },
  { id: "dest2", name: "Store Y", demand: 180 },
  { id: "dest3", name: "Store Z", demand: 150 },
]

const shippingCosts: ShippingCost[] = [
  { from: "origin1", to: "dest1", cost: 5 },
  { from: "origin1", to: "dest2", cost: 7 },
  { from: "origin1", to: "dest3", cost: 6 },
  { from: "origin2", to: "dest1", cost: 4 },
  { from: "origin2", to: "dest2", cost: 5 },
  { from: "origin2", to: "dest3", cost: 8 },
  { from: "origin3", to: "dest1", cost: 6 },
  { from: "origin3", to: "dest2", cost: 4 },
  { from: "origin3", to: "dest3", cost: 5 },
]

const config = {
  loader: { load: ["[tex]/html"] },
  tex: {
    packages: { "[+]": ["html"] },
    inlineMath: [["$", "$"]],
    displayMath: [["$$", "$$"]],
  },
}

export function TransportationProblemGame() {
  const [shipments, setShipments] = useState<{ [key: string]: number }>({})
  const [showSolution, setShowSolution] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [showExplanation, setShowExplanation] = useState(false)

  const steps = [
    {
      title: "Understanding the Problem",
      description: "The transportation problem aims to minimize shipping costs while meeting supply and demand requirements.",
    },
    {
      title: "Setting Up Variables",
      description: "For each origin-destination pair, we need to determine how many units to ship (xij).",
    },
    {
      title: "Supply and Demand",
      description: "Each origin has a limited supply, and each destination has a specific demand that must be met.",
    },
    {
      title: "Objective Function",
      description: "We want to minimize the total shipping cost while satisfying all supply and demand constraints.",
    },
  ]

  useEffect(() => {
    // Initialize shipments to 0
    const initialShipments: { [key: string]: number } = {}
    shippingCosts.forEach((route) => {
      initialShipments[`${route.from}-${route.to}`] = 0
    })
    setShipments(initialShipments)
  }, [])

  const calculateSupplyUsage = () => {
    const usage: { [key: string]: number } = {}
    origins.forEach((origin) => {
      usage[origin.id] = shippingCosts
        .filter((route) => route.from === origin.id)
        .reduce((total, route) => {
          return total + (shipments[`${route.from}-${route.to}`] || 0)
        }, 0)
    })
    return usage
  }

  const calculateDemandSatisfaction = () => {
    const satisfaction: { [key: string]: number } = {}
    destinations.forEach((destination) => {
      satisfaction[destination.id] = shippingCosts
        .filter((route) => route.to === destination.id)
        .reduce((total, route) => {
          return total + (shipments[`${route.from}-${route.to}`] || 0)
        }, 0)
    })
    return satisfaction
  }

  const calculateTotalCost = () => {
    return shippingCosts.reduce((total, route) => {
      return total + route.cost * (shipments[`${route.from}-${route.to}`] || 0)
    }, 0)
  }

  const checkFeasibility = () => {
    const supplyUsage = calculateSupplyUsage()
    const demandSatisfaction = calculateDemandSatisfaction()

    const supplyFeasible = origins.every(
      (origin) => supplyUsage[origin.id] <= origin.supply
    )

    const demandFeasible = destinations.every(
      (destination) => demandSatisfaction[destination.id] >= destination.demand
    )

    return supplyFeasible && demandFeasible
  }

  const handleShipmentChange = (routeKey: string, value: number) => {
    setShipments((prev) => ({
      ...prev,
      [routeKey]: value,
    }))
  }

  const resetProblem = () => {
    const initialShipments: { [key: string]: number } = {}
    shippingCosts.forEach((route) => {
      initialShipments[`${route.from}-${route.to}`] = 0
    })
    setShipments(initialShipments)
    setShowSolution(false)
    setCurrentStep(0)
    setShowExplanation(false)
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const supplyUsage = calculateSupplyUsage()
  const demandSatisfaction = calculateDemandSatisfaction()
  const totalCost = calculateTotalCost()
  const isFeasible = checkFeasibility()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Interactive Transportation Problem</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Step {currentStep + 1}: {steps[currentStep].title}</h3>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowExplanation(!showExplanation)}
                >
                  <Info className="h-4 w-4 mr-2" />
                  {showExplanation ? "Hide Explanation" : "Show Explanation"}
                </Button>
              </div>
            </div>
            {showExplanation && (
              <p className="text-sm text-muted-foreground">{steps[currentStep].description}</p>
            )}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={nextStep}
                disabled={currentStep === steps.length - 1}
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Shipping Routes</h4>
            {shippingCosts.map((route) => (
              <div key={`${route.from}-${route.to}`} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">
                    {origins.find((o) => o.id === route.from)?.name} →{" "}
                    {destinations.find((d) => d.id === route.to)?.name}
                  </span>
                  <span className="text-sm text-muted-foreground">${route.cost}/unit</span>
                </div>
                <Slider
                  value={[shipments[`${route.from}-${route.to}`] || 0]}
                  onValueChange={([value]) =>
                    handleShipmentChange(`${route.from}-${route.to}`, value)
                  }
                  max={Math.max(
                    origins.find((o) => o.id === route.from)?.supply || 0,
                    destinations.find((d) => d.id === route.to)?.demand || 0
                  )}
                  step={1}
                />
                <div className="text-sm text-muted-foreground">
                  Quantity: {shipments[`${route.from}-${route.to}`] || 0} units
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <h4 className="font-medium">Supply Usage</h4>
              {origins.map((origin) => (
                <div key={origin.id} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{origin.name}</span>
                    <span>
                      {supplyUsage[origin.id]}/{origin.supply}
                    </span>
                  </div>
                  <Progress
                    value={(supplyUsage[origin.id] / origin.supply) * 100}
                    className="h-2"
                  />
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Demand Satisfaction</h4>
              {destinations.map((destination) => (
                <div key={destination.id} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{destination.name}</span>
                    <span>
                      {demandSatisfaction[destination.id]}/{destination.demand}
                    </span>
                  </div>
                  <Progress
                    value={(demandSatisfaction[destination.id] / destination.demand) * 100}
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Total Cost: ${totalCost.toFixed(2)}</h4>
              {isFeasible ? (
                <div className="flex items-center text-green-600">
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                  Feasible Solution
                </div>
              ) : (
                <div className="flex items-center text-red-600">
                  <XCircle className="h-5 w-5 mr-2" />
                  Infeasible Solution
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={resetProblem}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSolution(!showSolution)}
              >
                {showSolution ? "Hide Solution" : "Show Solution"}
              </Button>
            </div>
          </div>

          {showSolution && (
            <div className="space-y-4 p-4 bg-muted rounded-lg">
              <h4 className="font-medium">Optimal Solution</h4>
              <MathJaxContext config={config}>
                <div className="text-sm space-y-2">
                  <MathJax>
                    {`minimize $5x_{11} + 7x_{12} + 6x_{13} + 4x_{21} + 5x_{22} + 8x_{23} + 6x_{31} + 4x_{32} + 5x_{33}$`}
                  </MathJax>
                  <MathJax>
                    {`subject to:`}
                  </MathJax>
                  <MathJax>
                    {`$x_{11} + x_{12} + x_{13} \\leq 100$ (Factory A supply)`}
                  </MathJax>
                  <MathJax>
                    {`$x_{21} + x_{22} + x_{23} \\leq 150$ (Factory B supply)`}
                  </MathJax>
                  <MathJax>
                    {`$x_{31} + x_{32} + x_{33} \\leq 200$ (Factory C supply)`}
                  </MathJax>
                  <MathJax>
                    {`$x_{11} + x_{21} + x_{31} \\geq 120$ (Store X demand)`}
                  </MathJax>
                  <MathJax>
                    {`$x_{12} + x_{22} + x_{32} \\geq 180$ (Store Y demand)`}
                  </MathJax>
                  <MathJax>
                    {`$x_{13} + x_{23} + x_{33} \\geq 150$ (Store Z demand)`}
                  </MathJax>
                  <MathJax>
                    {`$x_{ij} \\geq 0$ for all $i,j$`}
                  </MathJax>
                </div>
              </MathJaxContext>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 