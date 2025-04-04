"use client"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Brain, Target, Lightbulb, Timer, Cpu, Database, Calculator, GitBranch, BarChart2, Mic, Volume2, Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { IterativeAlgorithmGame } from "./components/iterative-algorithm-game"
import { ConvergenceVisualization } from "./components/convergence-visualization"
import { FeynmanTechniqueChat } from "./components/feynman-technique-chat"
import { MathProblemChat } from "./components/math-problem-chat"

export default function Chapter1_4() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Chapter 1.4: Iterative Algorithms and Convergence</h1>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/chapters/1.3">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Chapter
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/chapters/2">
              Next Chapter
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="space-y-16">
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

        <div className="space-y-6">
          <h2 className="text-2xl font-bold font-serif">Enhanced Learning Features</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mic className="h-5 w-5 text-primary" />
                  Voice Input
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Speak your explanations for a more natural teaching experience. The AI can understand your voice input in both English and Chinese.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Volume2 className="h-5 w-5 text-primary" />
                  Text-to-Speech
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Listen to AI responses to reinforce learning through auditory means. This is especially helpful for understanding complex mathematical concepts.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Languages className="h-5 w-5 text-primary" />
                  Multilingual Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Switch between English and Chinese for better accessibility. The AI can communicate and understand responses in both languages.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-6 min-h-[1500px]">
          <h2 className="text-2xl font-bold font-serif">Interactive Learning Tools</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-md">
                <h3 className="font-medium flex items-center gap-2 mb-2">
                  <Lightbulb className="h-4 w-4 text-primary" />
                  Feynman Technique Chat
                </h3>
                <p className="text-sm text-muted-foreground">
                  Use the Feynman Technique to reinforce your understanding by teaching these concepts to an AI.
                  This interactive chat will help you identify gaps in your knowledge and strengthen your grasp of linear programming fundamentals.
                </p>
              </div>
              <FeynmanTechniqueChat />
            </div>
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-md">
                <h3 className="font-medium flex items-center gap-2 mb-2">
                  <Calculator className="h-4 w-4 text-primary" />
                  Math Problem Challenge
                </h3>
                <p className="text-sm text-muted-foreground">
                  Test your understanding with challenging math problems about iterative algorithms and convergence.
                  Practice solving problems and get immediate feedback on your solutions.
                </p>
              </div>
              <MathProblemChat />
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-16 text-center text-sm text-muted-foreground">
        <p>© 2024 Linear and Nonlinear Programming. All rights reserved.</p>
      </footer>
    </div>
  )
} 