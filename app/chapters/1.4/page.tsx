"use client"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Brain, Target, Lightbulb, Timer, Cpu, Database, Calculator, GitBranch, BarChart2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { IterativeAlgorithmGame } from "./components/iterative-algorithm-game"
import { ConvergenceVisualization } from "./components/convergence-visualization"

export default function Chapter1_4() {
  return (
    <div className="px-32 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <Link href="/chapters/1.3">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Previous Chapter
          </Button>
        </Link>
        <Link href="/chapters/1.5">
          <Button variant="ghost" className="gap-2">
            Next Chapter
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold font-serif mb-4">1.4 Iterative Algorithms and Convergence</h1>
          <p className="text-muted-foreground">
            Understanding the nature of iterative algorithms and their convergence properties in optimization problems.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Key Concepts</CardTitle>
              <CardDescription>Understanding iterative algorithms and their properties</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  Iterative Nature
                </h3>
                <p className="text-sm text-muted-foreground">
                  Algorithms generate sequences of improving solutions, starting from an initial point and converging towards the optimal solution.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Convergence Types
                </h3>
                <p className="text-sm text-muted-foreground">
                  Finite convergence for simplex method, asymptotic convergence for nonlinear programming and interior-point methods.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  <Timer className="h-5 w-5 text-primary" />
                  Convergence Analysis
                </h3>
                <p className="text-sm text-muted-foreground">
                  Global convergence analysis, local convergence analysis, and complexity analysis of algorithms.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Algorithm Theory</CardTitle>
              <CardDescription>Understanding the theoretical foundations of iterative algorithms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-primary" />
                  Algorithm Creation
                </h3>
                <p className="text-sm text-muted-foreground">
                  Based on problem structure and computational efficiency considerations.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  Convergence Properties
                </h3>
                <p className="text-sm text-muted-foreground">
                  Theoretical analysis provides confidence in algorithm performance and convergence rates.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  Complexity Analysis
                </h3>
                <p className="text-sm text-muted-foreground">
                  Distinguishing between polynomial-time and non-polynomial-time algorithms.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold font-serif">Interactive Learning</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <IterativeAlgorithmGame />
            <ConvergenceVisualization />
          </div>
        </div>
      </div>

      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>© 2024 Linear and Nonlinear Programming. All rights reserved.</p>
      </footer>
    </div>
  )
} 