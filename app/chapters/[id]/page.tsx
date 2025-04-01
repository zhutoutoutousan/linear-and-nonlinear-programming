"use client"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, ChevronLeft, ChevronRight, CheckCircle, Circle, Award, Lightbulb, ArrowRight, ArrowLeft, BrainCircuit, Target, BookMarked, Share2, BarChart2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { MathComponent } from "@/components/math-component"
import { OptimizationGame } from "./components/optimization-game"

export default function ChapterPage({ params }: { params: { id: string } }) {
  const chapterId = Number.parseInt(params.id)
  const [activeSection, setActiveSection] = useState(1)

  // This would be fetched from an API in a real application
  const chapter = {
    id: chapterId,
    title: "Linear Programming Fundamentals",
    description: "Formulation, graphical solutions, and applications",
    progress: 65,
    sections: [
      {
        id: 1,
        title: "Introduction to Linear Programming",
        completed: true,
      },
      {
        id: 2,
        title: "Mathematical Formulation",
        completed: true,
      },
      {
        id: 3,
        title: "Graphical Solution Method",
        completed: true,
      },
      {
        id: 4,
        title: "Standard Form and Canonical Form",
        completed: false,
        active: true,
      },
      {
        id: 5,
        title: "Basic Feasible Solutions",
        completed: false,
      },
      {
        id: 6,
        title: "Applications and Case Studies",
        completed: false,
      },
    ],
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/chapters/list">
              <Button variant="ghost" size="icon" className="hover:scale-105 transition-transform">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold font-serif">Chapter {chapterId}: {chapter.title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hover:scale-105 transition-transform">
              <BookMarked className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:scale-105 transition-transform">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors group">
              <CardHeader>
                <CardTitle className="font-serif">Key Concepts</CardTitle>
                <CardDescription>Understanding the fundamentals of optimization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Target className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium font-serif">What is Optimization?</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Optimization is the process of finding the best solution to a problem within given constraints.
                          It involves maximizing or minimizing an objective function while satisfying various conditions.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <BrainCircuit className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium font-serif">Key Components</h3>
                        <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                          <li>• Objective function to maximize or minimize</li>
                          <li>• Decision variables</li>
                          <li>• Constraints and limitations</li>
                          <li>• Feasible region</li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Lightbulb className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium font-serif">Applications</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Optimization techniques are widely used in business, engineering, and scientific fields
                          to solve complex problems and make data-driven decisions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <OptimizationGame />
          </div>

          <div className="space-y-8">
            <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors group">
              <CardHeader>
                <CardTitle className="font-serif">Learning Progress</CardTitle>
                <CardDescription>Track your understanding of the chapter</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span>Overall Understanding</span>
                        <span className="font-medium">75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span>Concept Understanding</span>
                        <span className="font-medium">80%</span>
                      </div>
                      <Progress value={80} className="h-2" />
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span>Practical Application</span>
                        <span className="font-medium">70%</span>
                      </div>
                      <Progress value={70} className="h-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors group">
              <CardHeader>
                <CardTitle className="font-serif">Key Takeaways</CardTitle>
                <CardDescription>Essential points to remember</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <BarChart2 className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Optimization involves finding the best solution within given constraints
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <BarChart2 className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Key components include objective function, decision variables, and constraints
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <BarChart2 className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Optimization has wide-ranging applications in various fields
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="border-t mt-8">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            © 2024 Linear and Nonlinear Programming. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

