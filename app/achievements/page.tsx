import Link from "next/link"
import { BookOpen, Award, CheckCircle, Trophy, Star, Zap, Brain, Target, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function AchievementsPage() {
  const achievements = [
    {
      id: 1,
      title: "Optimization Novice",
      description: "Complete your first 3 exercises",
      icon: Award,
      progress: 66,
      completed: false,
      category: "beginner",
    },
    {
      id: 2,
      title: "Chapter Master",
      description: "Complete all exercises in a single chapter",
      icon: Trophy,
      progress: 80,
      completed: false,
      category: "intermediate",
    },
    {
      id: 3,
      title: "Perfect Solver",
      description: "Solve 5 exercises without any mistakes",
      icon: CheckCircle,
      progress: 40,
      completed: false,
      category: "intermediate",
    },
    {
      id: 4,
      title: "Speed Optimizer",
      description: "Complete 3 exercises in under 10 minutes each",
      icon: Zap,
      progress: 33,
      completed: false,
      category: "advanced",
    },
    {
      id: 5,
      title: "Visualization Expert",
      description: "Use all interactive visualizations in Chapter 3",
      icon: Target,
      progress: 75,
      completed: false,
      category: "intermediate",
    },
    {
      id: 6,
      title: "Linear Programming Guru",
      description: "Complete all exercises in Chapters 1-4",
      icon: Brain,
      progress: 45,
      completed: false,
      category: "advanced",
    },
    {
      id: 7,
      title: "Consistent Learner",
      description: "Study for 5 consecutive days",
      icon: Star,
      progress: 100,
      completed: true,
      category: "beginner",
    },
    {
      id: 8,
      title: "Insight Finder",
      description: "Discover all key insights in Chapters 1-3",
      icon: Lightbulb,
      progress: 60,
      completed: false,
      category: "intermediate",
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
            <Link
              href="/exercises"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Exercises
            </Link>
            <Link href="/achievements" className="text-sm font-medium text-primary">
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
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Achievements</h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Track your progress and earn badges as you master linear and nonlinear programming
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-sm">
                <span className="font-medium">1/8</span>
                <span className="text-muted-foreground">completed</span>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="beginner">Beginner</TabsTrigger>
                <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {achievements.map((achievement) => (
                    <Card key={achievement.id} className={achievement.completed ? "border-green-200" : ""}>
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full ${
                              achievement.completed ? "bg-green-100" : "bg-muted"
                            }`}
                          >
                            <achievement.icon
                              className={`h-5 w-5 ${
                                achievement.completed ? "text-green-700" : "text-muted-foreground"
                              }`}
                            />
                          </div>
                          {achievement.completed ? (
                            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                              Completed
                            </Badge>
                          ) : (
                            <Badge variant="outline">In Progress</Badge>
                          )}
                        </div>
                        <CardTitle className="mt-2">{achievement.title}</CardTitle>
                        <CardDescription>{achievement.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span className="font-medium">{achievement.progress}%</span>
                          </div>
                          <Progress
                            value={achievement.progress}
                            className={`h-2 ${achievement.completed ? "bg-green-100 [&>div]:bg-green-600" : ""}`}
                          />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          className="w-full"
                          variant={achievement.completed ? "outline" : "default"}
                          disabled={achievement.progress === 0}
                        >
                          {achievement.completed
                            ? "View Details"
                            : achievement.progress === 0
                              ? "Locked"
                              : "Continue Progress"}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="beginner" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {achievements
                    .filter((a) => a.category === "beginner")
                    .map((achievement) => (
                      <Card key={achievement.id} className={achievement.completed ? "border-green-200" : ""}>
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <div
                              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                                achievement.completed ? "bg-green-100" : "bg-muted"
                              }`}
                            >
                              <achievement.icon
                                className={`h-5 w-5 ${
                                  achievement.completed ? "text-green-700" : "text-muted-foreground"
                                }`}
                              />
                            </div>
                            {achievement.completed ? (
                              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                                Completed
                              </Badge>
                            ) : (
                              <Badge variant="outline">In Progress</Badge>
                            )}
                          </div>
                          <CardTitle className="mt-2">{achievement.title}</CardTitle>
                          <CardDescription>{achievement.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-3">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span className="font-medium">{achievement.progress}%</span>
                            </div>
                            <Progress
                              value={achievement.progress}
                              className={`h-2 ${achievement.completed ? "bg-green-100 [&>div]:bg-green-600" : ""}`}
                            />
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button
                            className="w-full"
                            variant={achievement.completed ? "outline" : "default"}
                            variant={achievement.completed ? "outline" : "default"}
                            disabled={achievement.progress === 0}
                          >
                            {achievement.completed
                              ? "View Details"
                              : achievement.progress === 0
                                ? "Locked"
                                : "Continue Progress"}
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="intermediate" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {achievements
                    .filter((a) => a.category === "intermediate")
                    .map((achievement) => (
                      <Card key={achievement.id} className={achievement.completed ? "border-green-200" : ""}>
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <div
                              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                                achievement.completed ? "bg-green-100" : "bg-muted"
                              }`}
                            >
                              <achievement.icon
                                className={`h-5 w-5 ${
                                  achievement.completed ? "text-green-700" : "text-muted-foreground"
                                }`}
                              />
                            </div>
                            {achievement.completed ? (
                              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                                Completed
                              </Badge>
                            ) : (
                              <Badge variant="outline">In Progress</Badge>
                            )}
                          </div>
                          <CardTitle className="mt-2">{achievement.title}</CardTitle>
                          <CardDescription>{achievement.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-3">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span className="font-medium">{achievement.progress}%</span>
                            </div>
                            <Progress
                              value={achievement.progress}
                              className={`h-2 ${achievement.completed ? "bg-green-100 [&>div]:bg-green-600" : ""}`}
                            />
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button
                            className="w-full"
                            variant={achievement.completed ? "outline" : "default"}
                            disabled={achievement.progress === 0}
                          >
                            {achievement.completed
                              ? "View Details"
                              : achievement.progress === 0
                                ? "Locked"
                                : "Continue Progress"}
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="advanced" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {achievements
                    .filter((a) => a.category === "advanced")
                    .map((achievement) => (
                      <Card key={achievement.id} className={achievement.completed ? "border-green-200" : ""}>
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <div
                              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                                achievement.completed ? "bg-green-100" : "bg-muted"
                              }`}
                            >
                              <achievement.icon
                                className={`h-5 w-5 ${
                                  achievement.completed ? "text-green-700" : "text-muted-foreground"
                                }`}
                              />
                            </div>
                            {achievement.completed ? (
                              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                                Completed
                              </Badge>
                            ) : (
                              <Badge variant="outline">In Progress</Badge>
                            )}
                          </div>
                          <CardTitle className="mt-2">{achievement.title}</CardTitle>
                          <CardDescription>{achievement.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-3">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span className="font-medium">{achievement.progress}%</span>
                            </div>
                            <Progress
                              value={achievement.progress}
                              className={`h-2 ${achievement.completed ? "bg-green-100 [&>div]:bg-green-600" : ""}`}
                            />
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button
                            className="w-full"
                            variant={achievement.completed ? "outline" : "default"}
                            disabled={achievement.progress === 0}
                          >
                            {achievement.completed
                              ? "View Details"
                              : achievement.progress === 0
                                ? "Locked"
                                : "Continue Progress"}
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="completed" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {achievements
                    .filter((a) => a.completed)
                    .map((achievement) => (
                      <Card key={achievement.id} className="border-green-200">
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                              <achievement.icon className="h-5 w-5 text-green-700" />
                            </div>
                            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                              Completed
                            </Badge>
                          </div>
                          <CardTitle className="mt-2">{achievement.title}</CardTitle>
                          <CardDescription>{achievement.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-3">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span className="font-medium">100%</span>
                            </div>
                            <Progress value={100} className="h-2 bg-green-100 [&>div]:bg-green-600" />
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full" variant="outline">
                            View Details
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  {achievements.filter((a) => a.completed).length === 0 && (
                    <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                      <div className="space-y-3">
                        <p className="text-muted-foreground">You haven't completed any achievements yet.</p>
                        <Button variant="outline">View All Achievements</Button>
                      </div>
                    </div>
                  )}
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

