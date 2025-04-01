import Link from "next/link"
import { BookOpen, Lock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export default function ChaptersListPage() {
  const chapters = [
    {
      id: 1,
      title: "Introduction to Optimization",
      description: "Basic concepts and mathematical foundations",
      progress: 100,
      completed: true,
      unlocked: true,
      sections: 5,
      exercises: 12,
      currentSection: "1.1 Optimization",
      subsections: [
        {
          id: "1.1",
          title: "Optimization",
          description: "Basic concepts and mathematical foundations",
          progress: 100,
          completed: true,
          unlocked: true,
        },
        {
          id: "1.2",
          title: "Types of Problems",
          description: "Linear Programming, Unconstrained Problems, and Constrained Problems",
          progress: 100,
          completed: true,
          unlocked: true,
        }
      ]
    },
    {
      id: 2,
      title: "Linear Algebra Review",
      description: "Matrices, vectors, and linear transformations",
      progress: 100,
      completed: true,
      unlocked: true,
      sections: 4,
      exercises: 10,
      currentSection: "2.1 Matrices",
    },
    {
      id: 3,
      title: "Linear Programming Fundamentals",
      description: "Formulation, graphical solutions, and applications",
      progress: 65,
      completed: false,
      unlocked: true,
      sections: 6,
      exercises: 15,
      currentSection: "3.2 Graphical Solutions",
    },
    {
      id: 4,
      title: "Simplex Method",
      description: "Algorithm, implementation, and analysis",
      progress: 0,
      completed: false,
      unlocked: true,
      sections: 7,
      exercises: 18,
      currentSection: "4.1 Basic Concepts",
    },
    {
      id: 5,
      title: "Duality Theory",
      description: "Dual problems, complementary slackness, and economic interpretation",
      progress: 0,
      completed: false,
      unlocked: false,
      sections: 5,
      exercises: 14,
      currentSection: "Locked",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-center max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 font-semibold">
            <BookOpen className="h-5 w-5 text-primary animate-pulse" />
            <span className="font-serif">Linear & Nonlinear Programming</span>
          </div>
          <nav className="hidden md:flex gap-6 ml-auto">
            <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="/chapters" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
              Chapters
            </Link>
            <Link href="/exercises" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Exercises
            </Link>
            <Link href="/achievements" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Achievements
            </Link>
          </nav>
          <Button size="sm" className="ml-6 hover:scale-105 transition-transform">Sign In</Button>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-serif">Chapters</h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explore the textbook content through interactive chapters and sections
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="hover:scale-105 transition-transform">
                Filter
              </Button>
              <Button variant="outline" size="sm" className="hover:scale-105 transition-transform">
                Sort
              </Button>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
            {chapters.map((chapter) => (
              <Card key={chapter.id} className={chapter.unlocked ? "hover:border-primary/40 transition-colors group" : "opacity-75"}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-serif">
                      Chapter {chapter.id}: {chapter.title}
                    </CardTitle>
                    {chapter.completed && (
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                        Completed
                      </Badge>
                    )}
                  </div>
                  <CardDescription>{chapter.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span className="font-medium">{chapter.progress}%</span>
                      </div>
                      <Progress value={chapter.progress} className="h-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex flex-col">
                        <span className="text-muted-foreground">Sections</span>
                        <span className="font-medium">{chapter.sections}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-muted-foreground">Exercises</span>
                        <span className="font-medium">{chapter.exercises}</span>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Current Section: {chapter.currentSection}
                    </div>
                    {chapter.subsections && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Subsections:</h4>
                        <div className="space-y-1">
                          {chapter.subsections.map((subsection) => (
                            <Link
                              key={subsection.id}
                              href={`/chapters/${subsection.id}`}
                              className="flex items-center justify-between text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                              <span>{subsection.title}</span>
                              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  {chapter.unlocked ? (
                    <Link href={`/chapters/${chapter.id}`} className="w-full">
                      <Button className="w-full group-hover:scale-105 transition-transform" variant={chapter.progress > 0 ? "default" : "outline"}>
                        {chapter.progress > 0 ? "Continue" : "Start Chapter"}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  ) : (
                    <Button className="w-full" variant="outline" disabled>
                      <Lock className="mr-2 h-4 w-4" />
                      Locked
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
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