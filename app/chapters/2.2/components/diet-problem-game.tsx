import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { MathJaxContext, MathJax } from "better-react-mathjax"
import { Info, CheckCircle2, XCircle, ArrowRight, ArrowLeft, RotateCcw } from "lucide-react"

interface Food {
  id: string
  name: string
  price: number
  nutrients: {
    protein: number
    carbs: number
    fat: number
    vitamins: number
  }
}

interface Requirements {
  protein: number
  carbs: number
  fat: number
  vitamins: number
}

const foods: Food[] = [
  {
    id: "rice",
    name: "Rice",
    price: 2,
    nutrients: {
      protein: 2,
      carbs: 45,
      fat: 0.5,
      vitamins: 1,
    },
  },
  {
    id: "beans",
    name: "Beans",
    price: 3,
    nutrients: {
      protein: 8,
      carbs: 20,
      fat: 1,
      vitamins: 3,
    },
  },
  {
    id: "chicken",
    name: "Chicken",
    price: 5,
    nutrients: {
      protein: 25,
      carbs: 0,
      fat: 3,
      vitamins: 2,
    },
  },
  {
    id: "vegetables",
    name: "Vegetables",
    price: 2,
    nutrients: {
      protein: 1,
      carbs: 5,
      fat: 0,
      vitamins: 8,
    },
  },
]

const requirements: Requirements = {
  protein: 50,
  carbs: 200,
  fat: 20,
  vitamins: 30,
}

const config = {
  loader: { load: ["[tex]/html"] },
  tex: {
    packages: { "[+]": ["html"] },
    inlineMath: [["$", "$"]],
    displayMath: [["$$", "$$"]],
  },
}

export function DietProblemGame() {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({})
  const [showSolution, setShowSolution] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [showExplanation, setShowExplanation] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const steps = [
    {
      title: "Understanding the Problem",
      description: "The diet problem aims to find the most economical combination of foods that meets minimum nutritional requirements.",
    },
    {
      title: "Setting Up Variables",
      description: "For each food item, we need to determine how many units to include in the diet (x₁, x₂, etc.).",
    },
    {
      title: "Formulating Constraints",
      description: "Each nutrient must meet its minimum requirement through the combination of foods.",
    },
    {
      title: "Objective Function",
      description: "We want to minimize the total cost of the diet while meeting all nutritional requirements.",
    },
  ]

  useEffect(() => {
    // Initialize quantities to 0
    const initialQuantities: { [key: string]: number } = {}
    foods.forEach((food) => {
      initialQuantities[food.id] = 0
    })
    setQuantities(initialQuantities)
  }, [])

  const calculateNutrients = () => {
    const totalNutrients = {
      protein: 0,
      carbs: 0,
      fat: 0,
      vitamins: 0,
    }

    foods.forEach((food) => {
      const quantity = quantities[food.id] || 0
      totalNutrients.protein += food.nutrients.protein * quantity
      totalNutrients.carbs += food.nutrients.carbs * quantity
      totalNutrients.fat += food.nutrients.fat * quantity
      totalNutrients.vitamins += food.nutrients.vitamins * quantity
    })

    return totalNutrients
  }

  const calculateCost = () => {
    return foods.reduce((total, food) => {
      return total + food.price * (quantities[food.id] || 0)
    }, 0)
  }

  const checkFeasibility = () => {
    const totalNutrients = calculateNutrients()
    return (
      totalNutrients.protein >= requirements.protein &&
      totalNutrients.carbs >= requirements.carbs &&
      totalNutrients.fat >= requirements.fat &&
      totalNutrients.vitamins >= requirements.vitamins
    )
  }

  const handleQuantityChange = (foodId: string, value: number) => {
    setQuantities((prev) => ({
      ...prev,
      [foodId]: value,
    }))
  }

  const resetProblem = () => {
    const initialQuantities: { [key: string]: number } = {}
    foods.forEach((food) => {
      initialQuantities[food.id] = 0
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

  const totalNutrients = calculateNutrients()
  const totalCost = calculateCost()
  const isFeasible = checkFeasibility()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Interactive Diet Problem</CardTitle>
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
            <h4 className="font-medium">Food Selection</h4>
            {foods.map((food) => (
              <div key={food.id} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{food.name}</span>
                  <span className="text-sm text-muted-foreground">${food.price}/unit</span>
                </div>
                <Slider
                  value={[quantities[food.id] || 0]}
                  onValueChange={([value]) => handleQuantityChange(food.id, value)}
                  max={10}
                  step={0.5}
                />
                <div className="text-sm text-muted-foreground">
                  Quantity: {quantities[food.id] || 0} units
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Nutritional Requirements</h4>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(requirements).map(([nutrient, required]) => (
                <div key={nutrient} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="capitalize">{nutrient}</span>
                    <span>
                      {totalNutrients[nutrient as keyof Requirements]}/{required}
                    </span>
                  </div>
                  <Progress
                    value={(totalNutrients[nutrient as keyof Requirements] / required) * 100}
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
                    {`minimize $2x_1 + 3x_2 + 5x_3 + 2x_4$`}
                  </MathJax>
                  <MathJax>
                    {`subject to:`}
                  </MathJax>
                  <MathJax>
                    {`$2x_1 + 8x_2 + 25x_3 + x_4 \\geq 50$ (protein)`}
                  </MathJax>
                  <MathJax>
                    {`$45x_1 + 20x_2 + 5x_4 \\geq 200$ (carbs)`}
                  </MathJax>
                  <MathJax>
                    {`$0.5x_1 + x_2 + 3x_3 \\geq 20$ (fat)`}
                  </MathJax>
                  <MathJax>
                    {`$x_1 + 3x_2 + 2x_3 + 8x_4 \\geq 30$ (vitamins)`}
                  </MathJax>
                  <MathJax>
                    {`$x_1, x_2, x_3, x_4 \\geq 0$`}
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