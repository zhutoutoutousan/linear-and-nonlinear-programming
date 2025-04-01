import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Target, BrainCircuit, BarChart2, Trophy, Search, CheckCircle } from "lucide-react"

interface GameState {
  currentLevel: number
  score: number
  completed: boolean
  showFeedback: boolean
  feedback: string
  showAnalysis: boolean
  selectedOption: number | null
}

const gameLevels = [
  {
    id: 1,
    title: "Business Optimization",
    description: "Maximize profit while considering production constraints",
    constraints: ["Production capacity", "Market demand", "Resource availability"],
    objective: "Maximize profit",
    options: [
      { 
        text: "Increase production without considering costs", 
        score: 0,
        analysis: "This approach ignores important constraints and could lead to overproduction and waste.",
        solution: "Not optimal - fails to consider key business constraints"
      },
      { 
        text: "Balance production with market demand", 
        score: 2,
        analysis: "This approach considers market demand but could be improved by optimizing resource allocation.",
        solution: "Good approach - considers market demand but could be optimized further"
      },
      { 
        text: "Optimize resource allocation", 
        score: 3,
        analysis: "This approach considers all constraints and aims for optimal resource utilization.",
        solution: "Optimal solution - maximizes profit while respecting all constraints"
      },
    ],
  },
  {
    id: 2,
    title: "Resource Allocation",
    description: "Optimize resource distribution across projects",
    constraints: ["Project deadlines", "Resource limits", "Priority levels"],
    objective: "Maximize project completion",
    options: [
      { 
        text: "Distribute resources equally", 
        score: 1,
        analysis: "Equal distribution doesn't consider project priorities and deadlines.",
        solution: "Suboptimal - fails to consider project priorities"
      },
      { 
        text: "Focus on high-priority projects", 
        score: 2,
        analysis: "Prioritizing high-priority projects is good but might neglect resource efficiency.",
        solution: "Good approach - considers priorities but could be more efficient"
      },
      { 
        text: "Optimize based on deadlines and priorities", 
        score: 3,
        analysis: "This approach balances priorities with resource efficiency and deadlines.",
        solution: "Optimal solution - maximizes project completion while respecting constraints"
      },
    ],
  },
  {
    id: 3,
    title: "Investment Portfolio",
    description: "Maximize expected return while managing risk",
    constraints: ["Risk tolerance", "Investment limits", "Market conditions"],
    objective: "Maximize expected return",
    options: [
      { 
        text: "Invest in high-risk assets only", 
        score: 0,
        analysis: "High-risk-only strategy ignores risk management principles.",
        solution: "Not optimal - fails to manage risk"
      },
      { 
        text: "Diversify across asset classes", 
        score: 2,
        analysis: "Diversification is good but could be optimized based on risk tolerance.",
        solution: "Good approach - considers diversification but could be optimized"
      },
      { 
        text: "Optimize risk-adjusted returns", 
        score: 3,
        analysis: "This approach considers both returns and risk management.",
        solution: "Optimal solution - maximizes risk-adjusted returns"
      },
    ],
  },
]

export function OptimizationGame() {
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: 0,
    score: 0,
    completed: false,
    showFeedback: false,
    feedback: "",
    showAnalysis: false,
    selectedOption: null,
  })

  const handleOptionSelect = (index: number) => {
    setGameState({
      ...gameState,
      selectedOption: index,
      showAnalysis: true,
    })
  }

  const handleSolve = () => {
    if (gameState.selectedOption === null) return

    const selectedOption = gameLevels[gameState.currentLevel].options[gameState.selectedOption]
    const newScore = gameState.score + selectedOption.score
    const newLevel = gameState.currentLevel + 1
    const isCompleted = newLevel >= gameLevels.length

    setGameState({
      ...gameState,
      score: newScore,
      currentLevel: newLevel,
      completed: isCompleted,
      showFeedback: true,
      feedback: selectedOption.solution,
      showAnalysis: false,
      selectedOption: null,
    })
  }

  const resetGame = () => {
    setGameState({
      currentLevel: 0,
      score: 0,
      completed: false,
      showFeedback: false,
      feedback: "",
      showAnalysis: false,
      selectedOption: null,
    })
  }

  const currentLevel = gameLevels[gameState.currentLevel]

  return (
    <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors group">
      <CardHeader>
        <CardTitle className="font-serif">Optimization Challenge</CardTitle>
        <CardDescription>Test your understanding through interactive scenarios</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {!gameState.completed ? (
            <>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg font-serif">{currentLevel.title}</h3>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-primary" />
                    <span className="font-medium">Score: {gameState.score}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{currentLevel.description}</p>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Constraints:</h4>
                  <ul className="text-sm space-y-1">
                    {currentLevel.constraints.map((constraint, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center">
                          <Target className="h-3 w-3 text-primary" />
                        </div>
                        {constraint}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Objective:</h4>
                  <p className="text-sm flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <BarChart2 className="h-3 w-3 text-primary" />
                    </div>
                    {currentLevel.objective}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Options:</h4>
                  <div className="space-y-2">
                    {currentLevel.options.map((option, index) => (
                      <Button
                        key={index}
                        variant={gameState.selectedOption === index ? "default" : "outline"}
                        className="w-full justify-start text-left hover:bg-primary/5 transition-colors"
                        onClick={() => handleOptionSelect(index)}
                      >
                        {option.text}
                      </Button>
                    ))}
                  </div>
                </div>

                {gameState.showAnalysis && gameState.selectedOption !== null && (
                  <div className="mt-4 space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex items-start gap-2">
                        <Search className="h-4 w-4 text-primary mt-0.5" />
                        <p className="text-sm font-medium">
                          {currentLevel.options[gameState.selectedOption].analysis}
                        </p>
                      </div>
                    </div>
                    <Button 
                      className="w-full hover:scale-105 transition-transform"
                      onClick={handleSolve}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Solve
                    </Button>
                  </div>
                )}

                {gameState.showFeedback && (
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <p className="text-sm font-medium">{gameState.feedback}</p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-medium">
                    Level {gameState.currentLevel + 1} of {gameLevels.length}
                  </span>
                </div>
                <Progress
                  value={(gameState.currentLevel / gameLevels.length) * 100}
                  className="h-2"
                />
              </div>
            </>
          ) : (
            <div className="text-center space-y-4">
              <div className="h-16 w-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg font-serif">Congratulations!</h3>
              <p className="text-sm text-muted-foreground">
                You've completed the optimization challenge with a score of {gameState.score} out of{" "}
                {gameLevels.length * 3}
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