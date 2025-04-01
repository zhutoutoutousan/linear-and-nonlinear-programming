"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, BrainCircuit, Target, Lightbulb, BookMarked, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { OptimizationMemoryGame } from "./components/optimization-memory-game"
import { OptimizationPuzzleGame } from "./components/optimization-puzzle-game"
import { OptimizationVisualizationGame } from "./components/optimization-visualization-game"
import KatexSpan from "@/components/katex-span"

export default function Chapter1_2Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-center max-w-7xl mx-auto px-4">
          <Link href="/chapters/list" className="mr-auto">
            <Button variant="ghost" size="sm" className="hover:scale-105 transition-transform">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Chapters
            </Button>
          </Link>
          <div className="flex items-center gap-2 font-semibold">
            <BrainCircuit className="h-5 w-5 text-primary animate-pulse" />
            <span className="font-serif">Linear & Nonlinear Programming</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hover:scale-105 transition-transform">
              <BookMarked className="mr-2 h-4 w-4" />
              Bookmark
            </Button>
            <Button variant="ghost" size="sm" className="hover:scale-105 transition-transform">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-serif">
                Chapter 1.2: Types of Problems
              </h1>
              <p className="text-muted-foreground mt-2">
                Understanding different types of optimization problems and their characteristics
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/chapters/1.1">
                <Button variant="outline" size="sm" className="hover:scale-105 transition-transform">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
              </Link>
              <Link href="/chapters/1.3">
                <Button variant="outline" size="sm" className="hover:scale-105 transition-transform">
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors group">
                <CardHeader>
                  <CardTitle className="font-serif">Linear Programming</CardTitle>
                  <CardDescription>Optimization problems with linear objective functions and constraints</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">General Form:</h3>
                    <KatexSpan text="$$ maximize \quad w_1x_1 + w_2x_2 $$" />
                    <KatexSpan text="$$ subject \; to: \quad x_1 + x_2 \leq B $$" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Characteristics:</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Linear objective function</li>
                      <li>Linear constraints</li>
                      <li>Non-negative variables</li>
                      <li>Convex feasible region</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors group">
                <CardHeader>
                  <CardTitle className="font-serif">Unconstrained Problems</CardTitle>
                  <CardDescription>Optimization problems without any constraints</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">General Form:</h3>
                    <KatexSpan text="$$ minimize \quad f(x) $$" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Characteristics:</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>No constraints on variables</li>
                      <li>Focus on function properties</li>
                      <li>Use of derivatives</li>
                      <li>Global vs local optima</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors group">
                <CardHeader>
                  <CardTitle className="font-serif">Constrained Problems</CardTitle>
                  <CardDescription>Optimization problems with equality and inequality constraints</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">General Form:</h3>
                    <KatexSpan text="$$ minimize \quad f(x) $$" />
                    <KatexSpan text="$$ subject \; to: \quad g_i(x) \leq 0, \quad i = 1, ..., m $$" />
                    <KatexSpan text="$$ \quad \quad \quad \quad h_j(x) = 0, \quad j = 1, ..., p $$" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Characteristics:</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Multiple constraint types</li>
                      <li>Complex feasible region</li>
                      <li>Use of Lagrange multipliers</li>
                      <li>Kuhn-Tucker conditions</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <OptimizationMemoryGame />
              <OptimizationPuzzleGame />
              <OptimizationVisualizationGame />
            </div>

            <div className="space-y-6">
              <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors group">
                <CardHeader>
                  <CardTitle className="font-serif">Learning Progress</CardTitle>
                  <CardDescription>Track your understanding of the concepts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Overall Understanding</span>
                      <span className="font-medium">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Concept Understanding</span>
                      <span className="font-medium">80%</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Practical Application</span>
                      <span className="font-medium">70%</span>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors group">
                <CardHeader>
                  <CardTitle className="font-serif">Key Takeaways</CardTitle>
                  <CardDescription>Essential points to remember</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Target className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Linear programming problems have linear objective functions and constraints</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Unconstrained problems focus on function properties and derivatives</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <BrainCircuit className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Constrained problems use Lagrange multipliers and Kuhn-Tucker conditions</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row max-w-7xl mx-auto px-4">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 Linear & Nonlinear Programming Interactive. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="#" className="underline underline-offset-4 hover:text-primary transition-colors">
              Terms
            </Link>
            <Link href="#" className="underline underline-offset-4 hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link href="#" className="underline underline-offset-4 hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
} 