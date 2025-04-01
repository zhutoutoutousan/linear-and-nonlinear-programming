import Link from "next/link"
import { ArrowLeft, ArrowRight, Brain, Target, Lightbulb, Timer, Cpu, Database, Calculator, GitBranch, BarChart2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { MathJaxContext, MathJax } from "better-react-mathjax"

const config = {
  loader: { load: ["[tex]/html"] },
  tex: {
    packages: { "[+]": ["html"] },
    inlineMath: [["$", "$"]],
    displayMath: [["$$", "$$"]],
  },
}

export default function Chapter2() {
  return (
    <div className="px-32 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <Link href="/chapters/1.4">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Previous Chapter
          </Button>
        </Link>
        <Link href="/chapters/2.1">
          <Button variant="ghost" className="gap-2">
            Next Chapter
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold font-serif mb-4">Chapter 2: Basic Properties of Linear Programs</h1>
          <p className="text-muted-foreground">
            Understanding the fundamental concepts and properties of linear programming problems.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Key Concepts</CardTitle>
              <CardDescription>Understanding linear programming fundamentals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  Linear Programs
                </h3>
                <p className="text-sm text-muted-foreground">
                  Optimization problems with linear objective functions and linear constraints.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Standard Form
                </h3>
                <p className="text-sm text-muted-foreground">
                  The canonical representation of linear programs with equality constraints and nonnegative variables.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  <Timer className="h-5 w-5 text-primary" />
                  Problem Transformation
                </h3>
                <p className="text-sm text-muted-foreground">
                  Techniques to convert various linear programming forms into standard form.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Learning Objectives</CardTitle>
              <CardDescription>What you'll learn in this chapter</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-primary" />
                  Problem Formulation
                </h3>
                <p className="text-sm text-muted-foreground">
                  Learn to express optimization problems in linear programming form.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  Standard Form
                </h3>
                <p className="text-sm text-muted-foreground">
                  Understand and convert problems to standard form using various techniques.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  Problem Transformation
                </h3>
                <p className="text-sm text-muted-foreground">
                  Master techniques for handling inequalities, free variables, and special cases.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold font-serif">Chapter Overview</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">2.1 Introduction</CardTitle>
                <CardDescription>Basic concepts and standard form</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Learn about the fundamental concepts of linear programming, including the standard form and various problem transformations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>© 2024 Linear and Nonlinear Programming. All rights reserved.</p>
      </footer>
    </div>
  )
} 