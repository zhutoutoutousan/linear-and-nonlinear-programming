import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BrainCircuit, Trophy, Timer } from "lucide-react"
import KatexSpan from "@/components/katex-span"

interface Card {
  id: number
  content: string
  type: "concept" | "formula" | "example"
  isFlipped: boolean
  isMatched: boolean
}

const gameCards: Card[] = [
  { id: 1, content: "Linear Programming", type: "concept", isFlipped: false, isMatched: false },
  { id: 2, content: "$$ maximize \\quad w_1x_1 + w_2x_2 $$", type: "formula", isFlipped: false, isMatched: false },
  { id: 3, content: "Unconstrained Problems", type: "concept", isFlipped: false, isMatched: false },
  { id: 4, content: "$$ minimize \\quad f(x) $$", type: "formula", isFlipped: false, isMatched: false },
  { id: 5, content: "Budget Allocation", type: "example", isFlipped: false, isMatched: false },
  { id: 6, content: "$$ subject \\; to: \\quad x_1 + x_2 \\leq B $$", type: "formula", isFlipped: false, isMatched: false },
  { id: 7, content: "Constrained Problems", type: "concept", isFlipped: false, isMatched: false },
  { id: 8, content: "Resource Optimization", type: "example", isFlipped: false, isMatched: false },
]

export function OptimizationMemoryGame() {
  const [cards, setCards] = useState<Card[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matches, setMatches] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)

  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    } else if (timeLeft === 0) {
      setGameCompleted(true)
    }
  }, [gameStarted, timeLeft])

  useEffect(() => {
    // Shuffle cards
    const shuffledCards = [...gameCards].sort(() => Math.random() - 0.5)
    setCards(shuffledCards)
  }, [])

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || cards.find(card => card.id === id)?.isMatched) return

    const newCards = cards.map(card =>
      card.id === id ? { ...card, isFlipped: true } : card
    )
    setCards(newCards)

    const newFlippedCards = [...flippedCards, id]
    setFlippedCards(newFlippedCards)

    if (newFlippedCards.length === 2) {
      checkMatch(newFlippedCards)
    }
  }

  const checkMatch = (flippedIds: number[]) => {
    const [first, second] = flippedIds
    const firstCard = cards.find(card => card.id === first)
    const secondCard = cards.find(card => card.id === second)

    if (firstCard?.type === secondCard?.type) {
      // Match found
      const newCards = cards.map(card =>
        card.id === first || card.id === second
          ? { ...card, isMatched: true }
          : card
      )
      setCards(newCards)
      setMatches(prev => prev + 1)
      setFlippedCards([])

      if (matches + 1 === cards.length / 2) {
        setGameCompleted(true)
      }
    } else {
      // No match
      setTimeout(() => {
        const newCards = cards.map(card =>
          card.id === first || card.id === second
            ? { ...card, isFlipped: false }
            : card
        )
        setCards(newCards)
        setFlippedCards([])
      }, 1000)
    }
  }

  const startGame = () => {
    setGameStarted(true)
    setTimeLeft(60)
    setMatches(0)
    setGameCompleted(false)
    const shuffledCards = [...gameCards].sort(() => Math.random() - 0.5)
    setCards(shuffledCards.map(card => ({ ...card, isFlipped: false, isMatched: false })))
  }

  return (
    <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors group">
      <CardHeader>
        <CardTitle className="font-serif">Optimization Memory Challenge</CardTitle>
        <CardDescription>Match related optimization concepts, formulas, and examples</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {!gameStarted ? (
            <div className="text-center space-y-4">
              <div className="h-16 w-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <BrainCircuit className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg font-serif">Ready to Test Your Memory?</h3>
              <p className="text-sm text-muted-foreground">
                Match related optimization concepts, formulas, and examples within the time limit.
              </p>
              <Button onClick={startGame} className="hover:scale-105 transition-transform">
                Start Game
              </Button>
            </div>
          ) : !gameCompleted ? (
            <>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Timer className="h-5 w-5 text-primary" />
                  <span className="font-medium">{timeLeft}s</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  <span className="font-medium">{matches} matches</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {cards.map((card) => (
                  <div
                    key={card.id}
                    className={`aspect-square cursor-pointer transition-all duration-300 ${
                      card.isFlipped || card.isMatched ? "rotate-y-180" : ""
                    }`}
                    onClick={() => handleCardClick(card.id)}
                  >
                    <div className={`w-full h-full rounded-lg p-4 flex items-center justify-center text-center
                      ${card.isFlipped || card.isMatched
                        ? "bg-primary/10 text-primary"
                        : "bg-muted hover:bg-muted/80"
                      }`}
                    >
                      {card.isFlipped || card.isMatched ? (
                        card.type === "formula" ? (
                          <KatexSpan text={card.content} />
                        ) : (
                          <span className="text-sm font-medium">{card.content}</span>
                        )
                      ) : (
                        <span className="text-sm text-muted-foreground">?</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center space-y-4">
              <div className="h-16 w-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg font-serif">Congratulations!</h3>
              <p className="text-sm text-muted-foreground">
                You've completed the memory challenge with {matches} matches!
              </p>
              <Button onClick={startGame} className="hover:scale-105 transition-transform">
                Play Again
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 