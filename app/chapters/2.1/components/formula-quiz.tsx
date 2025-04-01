import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MathJaxContext, MathJax } from "better-react-mathjax"
import { Progress } from "@/components/ui/progress"

const config = {
  loader: { load: ["[tex]/html"] },
  tex: {
    packages: { "[+]": ["html"] },
    inlineMath: [["$", "$"]],
    displayMath: [["$$", "$$"]],
  },
}

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is the standard form of a linear program?",
    options: [
      "maximize $c^Tx$ subject to $Ax \\leq b$ and $x \\geq 0$",
      "minimize $c^Tx$ subject to $Ax = b$ and $x \\geq 0$",
      "maximize $c^Tx$ subject to $Ax = b$ and $x \\geq 0$",
      "minimize $c^Tx$ subject to $Ax \\leq b$ and $x \\geq 0$",
    ],
    correctAnswer: 1,
    explanation: "The standard form of a linear program is minimize $c^Tx$ subject to $Ax = b$ and $x \\geq 0$. This form has equality constraints and nonnegative variables.",
  },
  {
    id: 2,
    question: "How do you convert a maximization problem to minimization?",
    options: [
      "Multiply the objective function by -1",
      "Add a constant to the objective function",
      "Divide the objective function by -1",
      "Take the reciprocal of the objective function",
    ],
    correctAnswer: 0,
    explanation: "To convert a maximization problem to minimization, multiply the objective function by -1. This preserves the optimal solution while changing the optimization direction.",
  },
  {
    id: 3,
    question: "What is the correct way to convert an inequality constraint $ax \\leq b$ to equality?",
    options: [
      "$ax + s = b$, $s \\geq 0$",
      "$ax - s = b$, $s \\geq 0$",
      "$ax = b + s$, $s \\geq 0$",
      "$ax = b - s$, $s \\geq 0$",
    ],
    correctAnswer: 0,
    explanation: "To convert $ax \\leq b$ to equality, add a nonnegative slack variable $s$: $ax + s = b$, $s \\geq 0$. The slack variable represents the unused capacity.",
  },
  {
    id: 4,
    question: "How do you handle a free variable $x$ in standard form?",
    options: [
      "$x = x^+ - x^-$, $x^+, x^- \\geq 0$",
      "$x = x^+ + x^-$, $x^+, x^- \\geq 0$",
      "$x = x^+$, $x^+ \\geq 0$",
      "$x = -x^-$, $x^- \\geq 0$",
    ],
    correctAnswer: 0,
    explanation: "A free variable $x$ is replaced by $x^+ - x^-$ where $x^+, x^- \\geq 0$. This allows $x$ to take any value while maintaining nonnegativity.",
  },
]

export function FormulaQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    }
  }

  const handleReset = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setScore(0)
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif">Formula Quiz</CardTitle>
        <CardDescription>Test your understanding of linear programming formulas</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={progress} className="w-full" />
        
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </div>
          
          <div className="p-4 bg-muted rounded-md">
            <MathJaxContext config={config}>
              <MathJax>{questions[currentQuestion].question}</MathJax>
            </MathJaxContext>
          </div>

          <div className="space-y-2">
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswer === index ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
              >
                <MathJaxContext config={config}>
                  <MathJax>{option}</MathJax>
                </MathJaxContext>
              </Button>
            ))}
          </div>

          {selectedAnswer !== null && (
            <div className="p-4 bg-muted rounded-md">
              <p className="text-sm text-muted-foreground">
                {selectedAnswer === questions[currentQuestion].correctAnswer
                  ? "Correct! "
                  : "Incorrect. "}
                {showExplanation && questions[currentQuestion].explanation}
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              disabled={currentQuestion === questions.length - 1}
            >
              Next
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              disabled={currentQuestion === 0 && selectedAnswer === null}
            >
              Reset
            </Button>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowExplanation(!showExplanation)}
            disabled={selectedAnswer === null}
          >
            {showExplanation ? "Hide Explanation" : "Show Explanation"}
          </Button>
        </div>

        {currentQuestion === questions.length - 1 && selectedAnswer !== null && (
          <div className="p-4 bg-primary/10 rounded-md">
            <p className="text-sm">
              Quiz completed! Your score: {score} out of {questions.length}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 