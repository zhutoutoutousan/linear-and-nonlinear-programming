"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Brain, Target, Lightbulb, Timer, Cpu, Database, Calculator } from "lucide-react"
import { ProblemSizeGame } from "./components/problem-size-game"
import { SuperBrainGame } from "./components/super-brain-game"
import KatexSpan from "@/components/katex-span"

export default function Chapter1_3() {
  return (
    <div className="px-32 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <Link href="/chapters/1.2">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Previous Chapter
          </Button>
        </Link>
        <Link href="/chapters/1.4">
          <Button variant="ghost" className="gap-2">
            Next Chapter
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold font-serif mb-4">1.3 Size of Problems</h1>
          <p className="text-muted-foreground">
            Understanding the classification of optimization problems based on their size and computational requirements.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Problem Size Classification</CardTitle>
              <CardDescription>Understanding different scales of optimization problems</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  Small-Scale Problems
                </h3>
                <p className="text-sm text-muted-foreground">
                  Problems with 5 or fewer variables that can be solved using hand calculations or small computers.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-primary" />
                  Intermediate-Scale Problems
                </h3>
                <p className="text-sm text-muted-foreground">
                  Problems with 5 to 1000 variables that require numerical methods and standard optimization software.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  Large-Scale Problems
                </h3>
                <p className="text-sm text-muted-foreground">
                  Problems with more than 1000 variables that need specialized algorithms and high-performance computing.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Key Concepts</CardTitle>
              <CardDescription>Important aspects of problem size and computational theory</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  <Timer className="h-5 w-5 text-primary" />
                  Computational Complexity
                </h3>
                <p className="text-sm text-muted-foreground">
                  Understanding how problem size affects computation time and resource requirements.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Solution Methods
                </h3>
                <p className="text-sm text-muted-foreground">
                  Different approaches for solving problems of various sizes and complexities.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  Problem Formulation
                </h3>
                <p className="text-sm text-muted-foreground">
                  How to structure and formulate problems based on their size and requirements.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold font-serif">Interactive Learning</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <ProblemSizeGame />
            <SuperBrainGame />
          </div>
        </div>
      </div>

      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>© 2024 Linear and Nonlinear Programming. All rights reserved.</p>
      </footer>
    </div>
  )
} 