import Link from "next/link"
import { BookOpen, Filter, Search, SortAsc, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ExercisesPage() {
  const exercises = [
    {
      id: 1,
      title: "Formulating Linear Programming Problems",
      difficulty: "Easy",
      chapter: 1,
      tags: ["Formulation", "Modeling"],
      completed: true,
    },
    {
      id: 2,
      title: "Graphical Solutions for Two Variables",
      difficulty: "Easy",
      chapter: 3,
      tags: ["Graphical Method", "Visualization"],
      completed: true,
    },
    {
      id: 3,
      title: "Converting to Standard Form",
      difficulty: "Medium",
      chapter: 4,
      tags: ["Standard Form", "Transformation"],
      completed: false,
    },
    {
      id: 4,
      title: "Identifying Basic Feasible Solutions",
      difficulty: "Medium",
      chapter: 4,
      tags: ["BFS", "Vertices"],
      completed: false,
    },
    {
      id: 5,
      title: "Simplex Method Iterations",
      difficulty: "Hard",
      chapter: 4,
      tags: ["Simplex", "Algorithm"],
      completed: false,
    },
    {
      id: 6,
      title: "Duality and Complementary Slackness",
      difficulty: "Hard",
      chapter: 5,
      tags: ["Duality", "Economic Interpretation"],
      completed: false,
    },
    {
      id: 7,
      title: "Sensitivity Analysis for Resource Changes",
      difficulty: "Medium",
      chapter: 6,
      tags: ["Sensitivity", "Shadow Prices"],
      completed: false,
    },
    {
      id: 8,
      title: "Integer Programming Formulations",
      difficulty: "Medium",
      chapter: 7,
      tags: ["Integer Variables", "Modeling"],
      completed: false,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <BookOpen className="h-5 w-5" />
            <span>Linear & Nonlinear Programming</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Home
            </Link>
            <Link
              href="/chapters"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Chapters
            </Link>
            <Link href="/exercises" className="text-sm font-medium text-primary">
              Exercises
            </Link>
            <Link
              href="/achievements"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Achievements
            </Link>
          </nav>
          <Button size="sm">Sign In</Button>
        </div>
      </header>
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Exercises</h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Practice your skills with interactive exercises and challenges
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search exercises..." className="w-full pl-8" />
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-10">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="h-10">
                  <SortAsc className="mr-2 h-4 w-4" />
                  Sort
                </Button>
              </div>
            </div>

            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All Exercises</TabsTrigger>
                <TabsTrigger value="recommended">Recommended</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {exercises.map((exercise) => (
                    <Card key={exercise.id}>
                      <CardHeader className="pb-3">
                        <div className="flex justify-between">
                          <Badge
                            variant={
                              exercise.difficulty === "Easy"
                                ? "outline"
                                : exercise.difficulty === "Medium"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {exercise.difficulty}
                          </Badge>
                          {exercise.completed && (
                            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                              Completed
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="mt-2">{exercise.title}</CardTitle>
                        <CardDescription>Chapter {exercise.chapter}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <div className="flex flex-wrap gap-2">
                          {exercise.tags.map((tag) => (
                            <div key={tag} className="flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs">
                              <Tag className="h-3 w-3" />
                              <span>{tag}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" variant={exercise.completed ? "outline" : "default"}>
                          {exercise.completed ? "Review" : "Start Exercise"}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="recommended" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {exercises
                    .filter((ex) => ex.chapter === 4 && !ex.completed)
                    .map((exercise) => (
                      <Card key={exercise.id}>
                        <CardHeader className="pb-3">
                          <div className="flex justify-between">
                            <Badge
                              variant={
                                exercise.difficulty === "Easy"
                                  ? "outline"
                                  : exercise.difficulty === "Medium"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {exercise.difficulty}
                            </Badge>
                            <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                              Recommended
                            </Badge>
                          </div>
                          <CardTitle className="mt-2">{exercise.title}</CardTitle>
                          <CardDescription>Chapter {exercise.chapter}</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-3">
                          <div className="flex flex-wrap gap-2">
                            {exercise.tags.map((tag) => (
                              <div key={tag} className="flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs">
                                <Tag className="h-3 w-3" />
                                <span>{tag}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full">Start Exercise</Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="completed" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {exercises
                    .filter((ex) => ex.completed)
                    .map((exercise) => (
                      <Card key={exercise.id}>
                        <CardHeader className="pb-3">
                          <div className="flex justify-between">
                            <Badge
                              variant={
                                exercise.difficulty === "Easy"
                                  ? "outline"
                                  : exercise.difficulty === "Medium"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {exercise.difficulty}
                            </Badge>
                            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                              Completed
                            </Badge>
                          </div>
                          <CardTitle className="mt-2">{exercise.title}</CardTitle>
                          <CardDescription>Chapter {exercise.chapter}</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-3">
                          <div className="flex flex-wrap gap-2">
                            {exercise.tags.map((tag) => (
                              <div key={tag} className="flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs">
                                <Tag className="h-3 w-3" />
                                <span>{tag}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full" variant="outline">
                            Review
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="bookmarked" className="mt-6">
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="space-y-3">
                    <p className="text-muted-foreground">You haven't bookmarked any exercises yet.</p>
                    <Button variant="outline">Browse All Exercises</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 Linear & Nonlinear Programming Interactive. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="#" className="underline underline-offset-4 hover:text-foreground">
              Terms
            </Link>
            <Link href="#" className="underline underline-offset-4 hover:text-foreground">
              Privacy
            </Link>
            <Link href="#" className="underline underline-offset-4 hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

