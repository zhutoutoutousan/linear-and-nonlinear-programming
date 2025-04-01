"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Brain, Timer, Trophy, ArrowRight, Target, Lightbulb, X, Check } from "lucide-react"

interface Puzzle {
  id: number
  title: string
  description: string
  type: "pattern" | "sequence" | "optimization"
  difficulty: "easy" | "medium" | "hard"
  data: number[] | (number | null)[][]
  solution: number | (number | null)[][]
  explanation: string
  timeLimit: number
}

const puzzles: Puzzle[] = [
  {
    id: 1,
    title: "Pattern Recognition",
    description: "Find the next number in the sequence: 2, 6, 12, 20, 30, ?",
    type: "sequence",
    difficulty: "easy",
    data: [2, 6, 12, 20, 30],
    solution: 42,
    explanation: "The pattern is adding consecutive even numbers: +4, +6, +8, +10, +12",
    timeLimit: 30
  },
  {
    id: 2,
    title: "Optimization Challenge",
    description: "Given a 3x3 grid, place numbers 1-9 so that each row, column, and diagonal sums to 15",
    type: "optimization",
    difficulty: "medium",
    data: [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ],
    solution: [
      [8, 1, 6],
      [3, 5, 7],
      [4, 9, 2]
    ],
    explanation: "This is a magic square where all rows, columns, and diagonals sum to 15",
    timeLimit: 60
  },
  {
    id: 3,
    title: "Complex Pattern",
    description: "Find the missing number in the sequence: 1, 2, 4, 7, 11, 16, 22, ?",
    type: "sequence",
    difficulty: "hard",
    data: [1, 2, 4, 7, 11, 16, 22],
    solution: 29,
    explanation: "The pattern is adding consecutive integers: +1, +2, +3, +4, +5, +6, +7",
    timeLimit: 45
  }
]

export function SuperBrainGame() {
  const [currentPuzzle, setCurrentPuzzle] = useState(0)
  const [timeLeft, setTimeLeft] = useState(puzzles[0].timeLimit)
  const [userAnswer, setUserAnswer] = useState<string>("")
  const [showSolution, setShowSolution] = useState(false)
  const [score, setScore] = useState(0)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [grid, setGrid] = useState<(number | null)[][]>(puzzles[0].data as (number | null)[][])

  useEffect(() => {
    if (!showSolution && !gameCompleted) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            setShowSolution(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [showSolution, gameCompleted])

  const handleAnswerSubmit = () => {
    const currentPuzzleData = puzzles[currentPuzzle]
    const isCorrect = currentPuzzleData.type === "optimization" 
      ? JSON.stringify(grid) === JSON.stringify(currentPuzzleData.solution)
      : Number(userAnswer) === currentPuzzleData.solution

    if (isCorrect) {
      setScore(prev => prev + 1)
    }
    setShowSolution(true)
  }

  const handleNext = () => {
    if (currentPuzzle < puzzles.length - 1) {
      setCurrentPuzzle(prev => prev + 1)
      setTimeLeft(puzzles[currentPuzzle + 1].timeLimit)
      setUserAnswer("")
      setShowSolution(false)
      setGrid(puzzles[currentPuzzle + 1].data as (number | null)[][])
    } else {
      setGameCompleted(true)
    }
  }

  const resetGame = () => {
    setCurrentPuzzle(0)
    setTimeLeft(puzzles[0].timeLimit)
    setUserAnswer("")
    setShowSolution(false)
    setScore(0)
    setGameCompleted(false)
    setGrid(puzzles[0].data as (number | null)[][])
  }

  const handleGridCellClick = (row: number, col: number) => {
    if (puzzles[currentPuzzle].type === "optimization") {
      const newGrid = [...grid]
      const currentValue = newGrid[row][col]
      newGrid[row][col] = currentValue === null ? 1 : currentValue === 9 ? null : currentValue + 1
      setGrid(newGrid)
    }
  }

  return (
    <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors group">
      <CardHeader>
        <CardTitle className="font-serif">最强大脑 Challenge</CardTitle>
        <CardDescription>Test your problem-solving abilities with these challenging puzzles</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {!gameCompleted ? (
            <>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Timer className="h-5 w-5 text-primary" />
                  <span className="font-medium">Time: {timeLeft}s</span>
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
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                      {puzzles[currentPuzzle].difficulty}
                    </span>
                  </div>
                </div>

                {puzzles[currentPuzzle].type === "optimization" ? (
                  <div className="grid grid-cols-3 gap-2">
                    {grid.map((row, rowIndex) => (
                      row.map((cell, colIndex) => (
                        <button
                          key={`${rowIndex}-${colIndex}`}
                          className="aspect-square border rounded-lg flex items-center justify-center text-lg font-medium hover:bg-muted transition-colors"
                          onClick={() => handleGridCellClick(rowIndex, colIndex)}
                          disabled={showSolution}
                        >
                          {cell}
                        </button>
                      ))
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {(puzzles[currentPuzzle].data as number[]).map((num: number, index: number) => (
                        <div key={index} className="w-12 h-12 border rounded-lg flex items-center justify-center text-lg font-medium">
                          {num}
                        </div>
                      ))}
                      <div className="w-12 h-12 border rounded-lg flex items-center justify-center text-lg font-medium">
                        ?
                      </div>
                    </div>
                    <input
                      type="number"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      className="w-full p-2 border rounded-lg"
                      placeholder="Enter your answer"
                      disabled={showSolution}
                    />
                  </div>
                )}

                {!showSolution && (
                  <Button
                    className="w-full"
                    onClick={handleAnswerSubmit}
                  >
                    Submit Answer
                  </Button>
                )}

                {showSolution && (
                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <h4 className="font-medium">Solution:</h4>
                    <p className="text-sm text-muted-foreground">
                      {puzzles[currentPuzzle].type === "optimization" 
                        ? "The correct arrangement is shown above"
                        : `The answer is ${puzzles[currentPuzzle].solution}`}
                    </p>
                    <h4 className="font-medium mt-2">Explanation:</h4>
                    <p className="text-sm text-muted-foreground">
                      {puzzles[currentPuzzle].explanation}
                    </p>
                  </div>
                )}

                {showSolution && (
                  <Button
                    className="w-full"
                    onClick={handleNext}
                  >
                    {currentPuzzle < puzzles.length - 1 ? "Next Puzzle" : "Finish"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
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