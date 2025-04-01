import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MathJaxContext, MathJax } from "better-react-mathjax"

const config = {
  loader: { load: ["[tex]/html"] },
  tex: {
    packages: { "[+]": ["html"] },
    inlineMath: [["$", "$"]],
    displayMath: [["$$", "$$"]],
  },
}

interface Example {
  id: string
  title: string
  description: string
  original: string
  steps: {
    description: string
    transformation: string
  }[]
  standardForm: string
}

const examples: Example[] = [
  {
    id: "max-to-min",
    title: "Maximization to Minimization",
    description: "Convert a maximization problem to minimization by negating the objective function.",
    original: "maximize $2x_1 + 3x_2$",
    steps: [
      {
        description: "Negate the objective function to convert maximization to minimization",
        transformation: "minimize $-2x_1 - 3x_2$",
      },
    ],
    standardForm: "minimize $-2x_1 - 3x_2$",
  },
  {
    id: "inequality-to-equality",
    title: "Inequality to Equality",
    description: "Convert an inequality constraint to equality by introducing a slack variable.",
    original: "$x_1 + 2x_2 \\leq 4$",
    steps: [
      {
        description: "Introduce a slack variable $s_1 \\geq 0$",
        transformation: "$x_1 + 2x_2 + s_1 = 4$",
      },
    ],
    standardForm: "$x_1 + 2x_2 + s_1 = 4$, $s_1 \\geq 0$",
  },
  {
    id: "free-variable",
    title: "Free Variable to Nonnegative",
    description: "Convert a free variable to nonnegative variables using the difference of two nonnegative variables.",
    original: "$x_1$ is free",
    steps: [
      {
        description: "Replace $x_1$ with $x_1^+ - x_1^-$ where $x_1^+, x_1^- \\geq 0$",
        transformation: "$x_1 = x_1^+ - x_1^-$, $x_1^+, x_1^- \\geq 0$",
      },
    ],
    standardForm: "$x_1^+ - x_1^-$, $x_1^+, x_1^- \\geq 0$",
  },
]

export function StandardFormConverter() {
  const [currentExample, setCurrentExample] = useState<Example>(examples[0])
  const [currentStep, setCurrentStep] = useState(0)
  const [showExplanation, setShowExplanation] = useState(false)

  const handleNext = () => {
    if (currentStep < currentExample.steps.length) {
      setCurrentStep(currentStep + 1)
      setShowExplanation(false)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setShowExplanation(false)
    }
  }

  const handleReset = () => {
    setCurrentStep(0)
    setShowExplanation(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif">Standard Form Converter</CardTitle>
        <CardDescription>Learn how to convert linear programs to standard form</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-medium">Example</h3>
          <div className="flex gap-2">
            {examples.map((example) => (
              <Button
                key={example.id}
                variant={currentExample.id === example.id ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setCurrentExample(example)
                  setCurrentStep(0)
                  setShowExplanation(false)
                }}
              >
                {example.title}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">Original Form</h3>
            <div className="p-4 bg-muted rounded-md">
              <MathJaxContext config={config}>
                <MathJax>{currentExample.original}</MathJax>
              </MathJaxContext>
            </div>
          </div>

          {currentStep > 0 && (
            <div className="space-y-2">
              <h3 className="font-medium">Transformation Steps</h3>
              <div className="space-y-2">
                {currentExample.steps.slice(0, currentStep).map((step, index) => (
                  <div key={index} className="p-4 bg-muted rounded-md">
                    <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                    <MathJaxContext config={config}>
                      <MathJax>{step.transformation}</MathJax>
                    </MathJaxContext>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === currentExample.steps.length && (
            <div className="space-y-2">
              <h3 className="font-medium">Standard Form</h3>
              <div className="p-4 bg-primary/10 rounded-md">
                <MathJaxContext config={config}>
                  <MathJax>{currentExample.standardForm}</MathJax>
                </MathJaxContext>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
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
              disabled={currentStep === currentExample.steps.length}
            >
              Next
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              disabled={currentStep === 0}
            >
              Reset
            </Button>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowExplanation(!showExplanation)}
          >
            {showExplanation ? "Hide Explanation" : "Show Explanation"}
          </Button>
        </div>

        {showExplanation && (
          <div className="p-4 bg-muted rounded-md">
            <p className="text-sm text-muted-foreground">{currentExample.description}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 