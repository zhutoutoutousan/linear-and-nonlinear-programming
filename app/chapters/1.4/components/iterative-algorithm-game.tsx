import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Brain, Timer, Target } from "lucide-react"
import { MathJaxContext, MathJax } from "better-react-mathjax"

interface AlgorithmStep {
  iteration: number
  point: number[]
  objective: number
  gradient: number[]
  stepSize: number
  explanation: string
}

const config = {
  loader: { load: ["[tex]/html"] },
  tex: {
    packages: { "[+]": ["html"] },
    inlineMath: [["$", "$"]],
    displayMath: [["$$", "$$"]],
  },
}

export function IterativeAlgorithmGame() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [algorithmSteps, setAlgorithmSteps] = useState<AlgorithmStep[]>([])

  // Example: Minimize f(x) = x^2 + y^2
  const objectiveFunction = (x: number, y: number) => x * x + y * y
  const gradient = (x: number, y: number) => [2 * x, 2 * y]

  useEffect(() => {
    // Generate algorithm steps
    const steps: AlgorithmStep[] = []
    let x = 2
    let y = 2
    const stepSize = 0.1

    for (let i = 0; i < 10; i++) {
      const grad = gradient(x, y)
      x -= stepSize * grad[0]
      y -= stepSize * grad[1]
      
      steps.push({
        iteration: i + 1,
        point: [x, y],
        objective: objectiveFunction(x, y),
        gradient: grad,
        stepSize,
        explanation: `Step ${i + 1}: Moving in the direction of steepest descent. The gradient at (${x.toFixed(2)}, ${y.toFixed(2)}) is [${grad[0].toFixed(2)}, ${grad[1].toFixed(2)}].`
      })
    }

    setAlgorithmSteps(steps)
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning && currentStep < algorithmSteps.length) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= algorithmSteps.length - 1) {
            setIsRunning(false)
            return prev
          }
          return prev + 1
        })
      }, 2000)
    }
    return () => clearInterval(interval)
  }, [isRunning, currentStep, algorithmSteps.length])

  const handleNext = () => {
    if (currentStep < algorithmSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleReset = () => {
    setCurrentStep(0)
    setIsRunning(false)
    setShowExplanation(false)
  }

  const currentStepData = algorithmSteps[currentStep]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          Iterative Algorithm Simulation
        </CardTitle>
        <CardDescription>
          Watch how an iterative algorithm converges to the minimum of a function
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">Iteration {currentStepData?.iteration || 0}</p>
              <Progress value={(currentStep / (algorithmSteps.length - 1)) * 100} className="w-[200px]" />
            </div>
            <div className="text-sm text-muted-foreground">
              <Timer className="h-4 w-4 inline mr-1" />
              Objective: {currentStepData?.objective.toFixed(4) || "0.0000"}
            </div>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm font-medium mb-2">Current Point:</p>
            <p className="text-sm">
              x = {currentStepData?.point[0].toFixed(4) || "0.0000"}, y = {currentStepData?.point[1].toFixed(4) || "0.0000"}
            </p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm font-medium mb-2">Gradient:</p>
            <p className="text-sm">
              ∇f = [{currentStepData?.gradient[0].toFixed(4) || "0.0000"}, {currentStepData?.gradient[1].toFixed(4) || "0.0000"}]
            </p>
          </div>

          {showExplanation && (
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm">{currentStepData?.explanation}</p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              disabled={currentStep === algorithmSteps.length - 1}
            >
              Next
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsRunning(!isRunning)}
            >
              {isRunning ? "Pause" : "Play"}
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowExplanation(!showExplanation)}
            >
              {showExplanation ? "Hide Explanation" : "Show Explanation"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 