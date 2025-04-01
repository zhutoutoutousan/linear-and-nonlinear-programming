import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BrainCircuit, Target, Lightbulb, Timer, Trophy, ArrowRight } from "lucide-react"
import KatexSpan from "@/components/katex-span"

interface Puzzle {
  id: number
  title: string
  description: string
  type: "linear" | "unconstrained" | "constrained"
  options: {
    id: string
    text: string
    isCorrect: boolean
    explanation: string
  }[]
  formula?: string
}

const puzzles: Puzzle[] = [
  {
    id: 1,
    title: "Budget Allocation Challenge",
    description: "You're managing a marketing budget of $10,000. You need to allocate it between social media ads (costing $100 per campaign) and influencer partnerships (costing $500 per partnership). Each social media campaign reaches 1,000 people, while each influencer partnership reaches 5,000 people. How should you allocate the budget to maximize total reach?",
    type: "linear",
    formula: "$$ maximize \quad 1000x_1 + 5000x_2 $$",
    options: [
      {
        id: "a",
        text: "Use linear programming to find optimal allocation",
        isCorrect: true,
        explanation: "This is a linear programming problem because we have linear objective function (reach) and linear constraints (budget)."
      },
      {
        id: "b",
        text: "Use unconstrained optimization",
        isCorrect: false,
        explanation: "This problem has budget constraints, so unconstrained optimization is not appropriate."
      },
      {
        id: "c",
        text: "Use nonlinear programming",
        isCorrect: false,
        explanation: "The relationships between variables are linear, so nonlinear programming is not needed."
      }
    ]
  },
  {
    id: 2,
    title: "Portfolio Optimization",
    description: "You're an investment manager trying to find the optimal portfolio allocation. The returns of different assets follow a nonlinear relationship. What type of optimization problem is this?",
    type: "unconstrained",
    formula: "$$ minimize \quad f(x) = -E[R_p] + \lambda Var(R_p) $$",
    options: [
      {
        id: "a",
        text: "Linear programming",
        isCorrect: false,
        explanation: "Portfolio optimization involves nonlinear relationships between returns and risk."
      },
      {
        id: "b",
        text: "Unconstrained optimization",
        isCorrect: true,
        explanation: "This is an unconstrained problem where we optimize the risk-adjusted return without explicit constraints."
      },
      {
        id: "c",
        text: "Constrained optimization",
        isCorrect: false,
        explanation: "While there are implicit constraints (weights sum to 1), the main optimization is unconstrained."
      }
    ]
  },
  {
    id: 3,
    title: "Production Planning",
    description: "A factory needs to produce two products (A and B) with limited resources. Each unit of A requires 2 hours of labor and 3 units of material, while each unit of B requires 3 hours of labor and 2 units of material. The factory has 100 hours of labor and 120 units of material available. What type of optimization problem is this?",
    type: "constrained",
    formula: "$$ maximize \quad 50x_1 + 60x_2 $$",
    options: [
      {
        id: "a",
        text: "Linear programming",
        isCorrect: false,
        explanation: "While this could be solved with linear programming, it's more general as a constrained problem."
      },
      {
        id: "b",
        text: "Unconstrained optimization",
        isCorrect: false,
        explanation: "This problem has explicit resource constraints."
      },
      {
        id: "c",
        text: "Constrained optimization",
        isCorrect: true,
        explanation: "This is a constrained optimization problem with multiple resource constraints."
      }
    ]
  }
]

export function OptimizationPuzzleGame() {
  const [currentPuzzle, setCurrentPuzzle] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [gameCompleted, setGameCompleted] = useState(false)

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId)
    const option = puzzles[currentPuzzle].options.find(opt => opt.id === optionId)
    if (option?.isCorrect) {
      setScore(prev => prev + 1)
    }
    setShowExplanation(true)
  }

  const handleNext = () => {
    if (currentPuzzle < puzzles.length - 1) {
      setCurrentPuzzle(prev => prev + 1)
      setSelectedOption(null)
      setShowExplanation(false)
    } else {
      setGameCompleted(true)
    }
  }

  const resetGame = () => {
    setCurrentPuzzle(0)
    setSelectedOption(null)
    setShowExplanation(false)
    setScore(0)
    setGameCompleted(false)
  }

  return (
    <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors group">
      <CardHeader>
        <CardTitle className="font-serif">Real-Life Optimization Puzzles</CardTitle>
        <CardDescription>Test your understanding through practical scenarios</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {!gameCompleted ? (
            <>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Timer className="h-5 w-5 text-primary" />
                  <span className="font-medium">Puzzle {currentPuzzle + 1} of {puzzles.length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  <span className="font-medium">Score: {score}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">{puzzles[currentPuzzle].title}</h3>
                  <p className="text-sm text-muted-foreground">{puzzles[currentPuzzle].description}</p>
                  {puzzles[currentPuzzle].formula && (
                    <div className="mt-2">
                      <KatexSpan text={puzzles[currentPuzzle].formula} />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  {puzzles[currentPuzzle].options.map((option) => (
                    <Button
                      key={option.id}
                      variant={selectedOption === option.id ? "default" : "outline"}
                      className={`w-full justify-start ${
                        showExplanation
                          ? option.isCorrect
                            ? "bg-green-500 hover:bg-green-600"
                            : selectedOption === option.id
                            ? "bg-red-500 hover:bg-red-600"
                            : ""
                          : ""
                      }`}
                      onClick={() => !showExplanation && handleOptionSelect(option.id)}
                      disabled={showExplanation}
                    >
                      {option.text}
                    </Button>
                  ))}
                </div>

                {showExplanation && (
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      {puzzles[currentPuzzle].options.find(opt => opt.id === selectedOption)?.explanation}
                    </p>
                  </div>
                )}

                <Button
                  className="w-full"
                  onClick={handleNext}
                  disabled={!showExplanation}
                >
                  {currentPuzzle < puzzles.length - 1 ? "Next Puzzle" : "Finish"}
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
                You've completed all puzzles with a score of {score} out of {puzzles.length}!
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