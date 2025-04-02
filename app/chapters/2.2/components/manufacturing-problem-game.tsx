import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { MathJaxContext, MathJax } from "better-react-mathjax"
import { Info, CheckCircle2, XCircle, ArrowRight, ArrowLeft, RotateCcw } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  resources: {
    labor: number
    materials: number
    energy: number
    time: number
  }
}

interface Resources {
  labor: number
  materials: number
  energy: number
  time: number
}

const products: Product[] = [
  {
    id: "product1",
    name: "Product A",
    price: 100,
    resources: {
      labor: 2,
      materials: 4,
      energy: 3,
      time: 1,
    },
  },
  {
    id: "product2",
    name: "Product B",
    price: 150,
    resources: {
      labor: 3,
      materials: 2,
      energy: 4,
      time: 2,
    },
  },
  {
    id: "product3",
    name: "Product C",
    price: 200,
    resources: {
      labor: 4,
      materials: 3,
      energy: 2,
      time: 3,
    },
  },
]

const availableResources: Resources = {
  labor: 40,
  materials: 60,
  energy: 50,
  time: 30,
}

const config = {
  loader: { load: ["[tex]/html"] },
  tex: {
    packages: { "[+]": ["html"] },
    inlineMath: [["$", "$"]],
    displayMath: [["$$", "$$"]],
  },
}

export function ManufacturingProblemGame() {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({})
  const [showSolution, setShowSolution] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [showExplanation, setShowExplanation] = useState(false)

  const steps = [
    {
      title: "Understanding the Problem",
      description: "The manufacturing problem aims to maximize revenue by producing products while staying within resource constraints.",
    },
    {
      title: "Setting Up Variables",
      description: "For each product, we need to determine how many units to produce (x₁, x₂, etc.).",
    },
    {
      title: "Resource Constraints",
      description: "Each resource (labor, materials, energy, time) has a limited availability that must not be exceeded.",
    },
    {
      title: "Objective Function",
      description: "We want to maximize the total revenue from all products while respecting resource constraints.",
    },
  ]

  useEffect(() => {
    // Initialize quantities to 0
    const initialQuantities: { [key: string]: number } = {}
    products.forEach((product) => {
      initialQuantities[product.id] = 0
    })
    setQuantities(initialQuantities)
  }, [])

  const calculateResources = () => {
    const totalResources = {
      labor: 0,
      materials: 0,
      energy: 0,
      time: 0,
    }

    products.forEach((product) => {
      const quantity = quantities[product.id] || 0
      totalResources.labor += product.resources.labor * quantity
      totalResources.materials += product.resources.materials * quantity
      totalResources.energy += product.resources.energy * quantity
      totalResources.time += product.resources.time * quantity
    })

    return totalResources
  }

  const calculateRevenue = () => {
    return products.reduce((total, product) => {
      return total + product.price * (quantities[product.id] || 0)
    }, 0)
  }

  const checkFeasibility = () => {
    const totalResources = calculateResources()
    return (
      totalResources.labor <= availableResources.labor &&
      totalResources.materials <= availableResources.materials &&
      totalResources.energy <= availableResources.energy &&
      totalResources.time <= availableResources.time
    )
  }

  const handleQuantityChange = (productId: string, value: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: value,
    }))
  }

  const resetProblem = () => {
    const initialQuantities: { [key: string]: number } = {}
    products.forEach((product) => {
      initialQuantities[product.id] = 0
    })
    setQuantities(initialQuantities)
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

  const totalResources = calculateResources()
  const totalRevenue = calculateRevenue()
  const isFeasible = checkFeasibility()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Interactive Manufacturing Problem</CardTitle>
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
            <h4 className="font-medium">Product Selection</h4>
            {products.map((product) => (
              <div key={product.id} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{product.name}</span>
                  <span className="text-sm text-muted-foreground">${product.price}/unit</span>
                </div>
                <Slider
                  value={[quantities[product.id] || 0]}
                  onValueChange={([value]) => handleQuantityChange(product.id, value)}
                  max={10}
                  step={0.5}
                />
                <div className="text-sm text-muted-foreground">
                  Quantity: {quantities[product.id] || 0} units
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Resource Usage</h4>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(availableResources).map(([resource, available]) => (
                <div key={resource} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="capitalize">{resource}</span>
                    <span>
                      {totalResources[resource as keyof Resources]}/{available}
                    </span>
                  </div>
                  <Progress
                    value={(totalResources[resource as keyof Resources] / available) * 100}
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Total Revenue: ${totalRevenue.toFixed(2)}</h4>
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
                    {`maximize $100x_1 + 150x_2 + 200x_3$`}
                  </MathJax>
                  <MathJax>
                    {`subject to:`}
                  </MathJax>
                  <MathJax>
                    {`$2x_1 + 3x_2 + 4x_3 \\leq 40$ (labor)`}
                  </MathJax>
                  <MathJax>
                    {`$4x_1 + 2x_2 + 3x_3 \\leq 60$ (materials)`}
                  </MathJax>
                  <MathJax>
                    {`$3x_1 + 4x_2 + 2x_3 \\leq 50$ (energy)`}
                  </MathJax>
                  <MathJax>
                    {`$x_1 + 2x_2 + 3x_3 \\leq 30$ (time)`}
                  </MathJax>
                  <MathJax>
                    {`$x_1, x_2, x_3 \\geq 0$`}
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