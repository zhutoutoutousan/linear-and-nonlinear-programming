import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Target, Timer, GitBranch } from "lucide-react"
import { MathJaxContext, MathJax } from "better-react-mathjax"

interface ConvergenceData {
  iteration: number
  error: number
  type: "linear" | "quadratic" | "exponential"
}

const config = {
  loader: { load: ["[tex]/html"] },
  tex: {
    packages: { "[+]": ["html"] },
    inlineMath: [["$", "$"]],
    displayMath: [["$$", "$$"]],
  },
}

export function ConvergenceVisualization() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [convergenceData, setConvergenceData] = useState<ConvergenceData[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Generate convergence data for different types
    const data: ConvergenceData[] = []
    const numSteps = 20

    for (let i = 0; i < numSteps; i++) {
      const iteration = i + 1
      data.push({
        iteration,
        error: Math.pow(0.5, iteration), // Linear convergence
        type: "linear",
      })
      data.push({
        iteration,
        error: Math.pow(0.5, Math.pow(2, iteration)), // Quadratic convergence
        type: "quadratic",
      })
      data.push({
        iteration,
        error: Math.pow(0.5, Math.pow(2, Math.pow(2, iteration))), // Exponential convergence
        type: "exponential",
      })
    }

    setConvergenceData(data)
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning && currentStep < convergenceData.length) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= convergenceData.length - 1) {
            setIsRunning(false)
            return prev
          }
          return prev + 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning, currentStep, convergenceData.length])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw axes
    ctx.beginPath()
    ctx.strokeStyle = "#666"
    ctx.moveTo(50, 50)
    ctx.lineTo(50, 350)
    ctx.lineTo(450, 350)
    ctx.stroke()

    // Draw convergence curves
    const colors = {
      linear: "#3b82f6",
      quadratic: "#10b981",
      exponential: "#f59e0b",
    }

    Object.entries(colors).forEach(([type, color]) => {
      const data = convergenceData.filter((d) => d.type === type)
      ctx.beginPath()
      ctx.strokeStyle = color
      ctx.lineWidth = 2

      data.forEach((point, i) => {
        const x = 50 + (i * 400) / (data.length - 1)
        const y = 350 - (point.error * 300) / 1
        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })

      ctx.stroke()
    })
  }, [currentStep, convergenceData])

  const handleNext = () => {
    if (currentStep < convergenceData.length - 1) {
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

  const currentData = convergenceData[currentStep]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Convergence Visualization
        </CardTitle>
        <CardDescription>
          Compare different types of convergence in optimization algorithms
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">Iteration {currentData?.iteration || 0}</p>
              <Progress value={(currentStep / (convergenceData.length - 1)) * 100} className="w-[200px]" />
            </div>
            <div className="text-sm text-muted-foreground">
              <Timer className="h-4 w-4 inline mr-1" />
              Error: {currentData?.error.toExponential(4) || "0.0000"}
            </div>
          </div>

          <div className="relative w-full h-[400px] bg-muted rounded-lg overflow-hidden">
            <canvas
              ref={canvasRef}
              width={500}
              height={400}
              className="absolute inset-0 w-full h-full"
            />
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span>Linear</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span>Quadratic</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span>Exponential</span>
            </div>
          </div>

          {showExplanation && (
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm">
                {currentData?.type === "linear" && "Linear convergence: Error decreases by a constant factor in each iteration."}
                {currentData?.type === "quadratic" && "Quadratic convergence: Error decreases quadratically in each iteration."}
                {currentData?.type === "exponential" && "Exponential convergence: Error decreases exponentially in each iteration."}
              </p>
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
              disabled={currentStep === convergenceData.length - 1}
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