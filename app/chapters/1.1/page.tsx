"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, BrainCircuit, Target, Lightbulb, BookMarked, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import KatexSpan from "@/components/katex-span"

export default function Chapter1_1Page() {
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
                Chapter 1.1: Introduction to Optimization
              </h1>
              <p className="text-muted-foreground mt-2">
                Understanding the fundamentals of optimization problems and their applications
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/chapters/list">
                <Button variant="outline" size="sm" className="hover:scale-105 transition-transform">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
              </Link>
              <Link href="/chapters/1.2">
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
                  <CardTitle className="font-serif">What is Optimization?</CardTitle>
                  <CardDescription>Understanding the core concepts of optimization</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Definition:</h3>
                    <p className="text-sm text-muted-foreground">
                      Optimization is the process of finding the best solution to a problem within given constraints.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Key Components:</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Objective function to maximize or minimize</li>
                      <li>Decision variables</li>
                      <li>Constraints (if any)</li>
                      <li>Feasible region</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors group">
                <CardHeader>
                  <CardTitle className="font-serif">Applications</CardTitle>
                  <CardDescription>Real-world applications of optimization</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Common Applications:</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Resource allocation</li>
                      <li>Production planning</li>
                      <li>Transportation logistics</li>
                      <li>Portfolio optimization</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Example:</h3>
                    <p className="text-sm text-muted-foreground">
                      A company wants to maximize profit while considering production constraints and resource limitations.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors group">
                <CardHeader>
                  <CardTitle className="font-serif">Problem Formulation</CardTitle>
                  <CardDescription>How to formulate optimization problems</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">General Form:</h3>
                    <KatexSpan text="$$ maximize/minimize \quad f(x) $$" />
                    <KatexSpan text="$$ subject \; to: \quad g_i(x) \leq 0, \quad i = 1, ..., m $$" />
                    <KatexSpan text="$$ \quad \quad \quad \quad h_j(x) = 0, \quad j = 1, ..., p $$" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Steps:</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Identify decision variables</li>
                      <li>Define objective function</li>
                      <li>List all constraints</li>
                      <li>Specify variable bounds</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
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
                      <span className="font-medium">80%</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Concept Understanding</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Practical Application</span>
                      <span className="font-medium">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
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
                      <span>Optimization involves finding the best solution within constraints</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Problem formulation is crucial for successful optimization</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <BrainCircuit className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Applications span across various industries and domains</span>
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