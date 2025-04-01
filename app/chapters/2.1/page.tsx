"use client"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Brain, Target, Lightbulb, Timer, Cpu, Database, Calculator, GitBranch, BarChart2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { MathJaxContext, MathJax } from "better-react-mathjax"
import { LinearProgramVisualizer } from "./components/linear-program-visualizer"
import { StandardFormConverter } from "./components/standard-form-converter"
import { FormulaQuiz } from "./components/formula-quiz"

const config = {
  loader: { load: ["[tex]/html"] },
  tex: {
    packages: { "[+]": ["html"] },
    inlineMath: [["$", "$"]],
    displayMath: [["$$", "$$"]],
  },
}

export default function Chapter2_1() {
  return (
    <div className="px-32 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <Link href="/chapters/2">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Previous Chapter
          </Button>
        </Link>
        <Link href="/chapters/2.2">
          <Button variant="ghost" className="gap-2">
            Next Chapter
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold font-serif mb-4">2.1 Introduction to Linear Programs</h1>
          <p className="text-muted-foreground">
            Understanding the fundamental concepts of linear programming and standard form.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Standard Form</CardTitle>
              <CardDescription>Understanding the canonical representation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  Basic Structure
                </h3>
                <p className="text-sm text-muted-foreground">
                  A linear program in standard form consists of:
                </p>
                <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                  <li>Linear objective function to minimize</li>
                  <li>Linear equality constraints</li>
                  <li>Nonnegative variables</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Mathematical Form
                </h3>
                <div className="text-sm">
                  <MathJaxContext config={config}>
                    <MathJax>
                      {`minimize $c^Tx$ subject to $Ax = b$ and $x \\geq 0$`}
                    </MathJax>
                  </MathJaxContext>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Problem Transformation</CardTitle>
              <CardDescription>Converting to standard form</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-primary" />
                  Common Transformations
                </h3>
                <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                  <li>Inequalities to equalities using slack/surplus variables</li>
                  <li>Free variables to nonnegative variables</li>
                  <li>Maximization to minimization</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  Examples
                </h3>
                <p className="text-sm text-muted-foreground">
                  See interactive examples of problem transformations in the Standard Form Converter below.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold font-serif">Interactive Learning</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <LinearProgramVisualizer />
            <StandardFormConverter />
          </div>
          <div className="mt-8">
            <FormulaQuiz />
          </div>
        </div>
      </div>

      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>© 2024 Linear and Nonlinear Programming. All rights reserved.</p>
      </footer>
    </div>
  )
} 