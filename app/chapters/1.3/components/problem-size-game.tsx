import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BrainCircuit, Target, Lightbulb, Timer, Trophy, ArrowRight, Cpu, Database, Calculator } from "lucide-react"

interface Problem {
  id: number
  title: string
  description: string
  variables: number
  constraints: number
  type: "small" | "intermediate" | "large"
  solution: {
    method: string
    explanation: string
  }
}

const problems: Problem[] = [
  {
    id: 1,
    title: "Portfolio Optimization",
    description: "Optimize a portfolio of 3 stocks with 2 risk constraints",
    variables: 3,
    constraints: 2,
    type: "small",
    solution: {
      method: "Hand calculation or small computer",
      explanation: "This is a small-scale problem that can be solved using basic optimization techniques and Lagrange multipliers."
    }
  },
  {
    id: 2,
    title: "Supply Chain Network",
    description: "Optimize a supply chain with 50 warehouses and 100 delivery routes",
    variables: 150,
    constraints: 200,
    type: "intermediate",
    solution: {
      method: "Personal computer with general-purpose solver",
      explanation: "This intermediate-scale problem requires numerical methods and can be solved using standard optimization software."
    }
  },
  {
    id: 3,
    title: "Global Transportation",
    description: "Optimize a global transportation network with 1000 cities and 5000 routes",
    variables: 6000,
    constraints: 8000,
    type: "large",
    solution: {
      method: "Specialized solver exploiting sparsity",
      explanation: "This large-scale problem requires specialized algorithms that exploit the sparse structure of the transportation network."
    }
  }
]

export function ProblemSizeGame() {
  const [currentProblem, setCurrentProblem] = useState(0)
  const [selectedSize, setSelectedSize] = useState<"small" | "intermediate" | "large" | null>(null)
  const [showSolution, setShowSolution] = useState(false)
  const [score, setScore] = useState(0)
  const [gameCompleted, setGameCompleted] = useState(false)

  const handleSizeSelect = (size: "small" | "intermediate" | "large") => {
    setSelectedSize(size)
    if (size === problems[currentProblem].type) {
      setScore(prev => prev + 1)
    }
    setShowSolution(true)
  }

  const handleNext = () => {
    if (currentProblem < problems.length - 1) {
      setCurrentProblem(prev => prev + 1)
      setSelectedSize(null)
      setShowSolution(false)
    } else {
      setGameCompleted(true)
    }
  }

  const resetGame = () => {
    setCurrentProblem(0)
    setSelectedSize(null)
    setShowSolution(false)
    setScore(0)
    setGameCompleted(false)
  }

  return (
    <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors group">
      <CardHeader>
        <CardTitle className="font-serif">Problem Size Challenge</CardTitle>
        <CardDescription>Test your understanding of problem sizes and their computational requirements</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {!gameCompleted ? (
            <>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Timer className="h-5 w-5 text-primary" />
                  <span className="font-medium">Problem {currentProblem + 1} of {problems.length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  <span className="font-medium">Score: {score}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">{problems[currentProblem].title}</h3>
                  <p className="text-sm text-muted-foreground">{problems[currentProblem].description}</p>
                  <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calculator className="h-4 w-4" />
                      <span>{problems[currentProblem].variables} variables</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Database className="h-4 w-4" />
                      <span>{problems[currentProblem].constraints} constraints</span>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <Button
                    variant={selectedSize === "small" ? "default" : "outline"}
                    className="h-auto py-4 flex flex-col items-center gap-2"
                    onClick={() => handleSizeSelect("small")}
                    disabled={showSolution}
                  >
                    <Calculator className="h-6 w-6" />
                    <span>Small-Scale</span>
                    <span className="text-xs text-muted-foreground">5 or fewer variables</span>
                  </Button>
                  <Button
                    variant={selectedSize === "intermediate" ? "default" : "outline"}
                    className="h-auto py-4 flex flex-col items-center gap-2"
                    onClick={() => handleSizeSelect("intermediate")}
                    disabled={showSolution}
                  >
                    <Cpu className="h-6 w-6" />
                    <span>Intermediate-Scale</span>
                    <span className="text-xs text-muted-foreground">5 to 1000 variables</span>
                  </Button>
                  <Button
                    variant={selectedSize === "large" ? "default" : "outline"}
                    className="h-auto py-4 flex flex-col items-center gap-2"
                    onClick={() => handleSizeSelect("large")}
                    disabled={showSolution}
                  >
                    <Database className="h-6 w-6" />
                    <span>Large-Scale</span>
                    <span className="text-xs text-muted-foreground">1000+ variables</span>
                  </Button>
                </div>

                {showSolution && (
                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <h4 className="font-medium">Solution:</h4>
                    <p className="text-sm text-muted-foreground">
                      This is a {problems[currentProblem].type}-scale problem.
                    </p>
                    <h4 className="font-medium mt-2">Recommended Method:</h4>
                    <p className="text-sm text-muted-foreground">
                      {problems[currentProblem].solution.method}
                    </p>
                    <h4 className="font-medium mt-2">Explanation:</h4>
                    <p className="text-sm text-muted-foreground">
                      {problems[currentProblem].solution.explanation}
                    </p>
                  </div>
                )}

                <Button
                  className="w-full"
                  onClick={handleNext}
                  disabled={!showSolution}
                >
                  {currentProblem < problems.length - 1 ? "Next Problem" : "Finish"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center space-y-4">
              <div className="h-16 w-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg font-serif">Congratulations!</h3>
              <p className="text-sm text-muted-foreground">
                You've completed all problems with a score of {score} out of {problems.length}!
              </p>
              <Button onClick={resetGame} className="hover:scale-105 transition-transform">
                Play Again
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 