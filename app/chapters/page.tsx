import Link from "next/link"
import { BookOpen, ArrowLeft, BrainCircuit, Target, Lightbulb, BookMarked, Share2, BarChart2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ChaptersPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-center max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 font-semibold">
            <BookMarked className="h-5 w-5 text-primary animate-pulse" />
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

      <main className="flex-1">
        <div className="container max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/chapters/list" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Chapters
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tight font-serif">Chapter 1: Introduction</h1>
                <h2 className="text-2xl font-semibold tracking-tight font-serif text-primary">1.1 Optimization</h2>
              </div>

              <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors group">
                <CardHeader>
                  <CardTitle className="font-serif">Key Concepts</CardTitle>
                  <CardDescription>Understanding the fundamentals of optimization</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="group/item relative bg-muted/50 rounded-lg p-4 border border-border hover:bg-muted transition-colors">
                      <div className="absolute top-2 right-2 opacity-0 group-hover/item:opacity-100 transition-opacity">
                        <p className="text-xs bg-background px-2 py-1 rounded border border-border">Core Concept</p>
                      </div>
                      <h3 className="font-bold text-lg mb-2 font-serif">Optimization Philosophy</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        The principle of focusing on a single objective to quantify performance and measure decision quality.
                      </p>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                          <Target className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Understanding Level</p>
                          <Progress value={75} className="h-1.5 mt-1 w-32" />
                        </div>
                      </div>
                    </div>

                    <div className="group/item relative bg-muted/50 rounded-lg p-4 border border-border hover:bg-muted transition-colors">
                      <div className="absolute top-2 right-2 opacity-0 group-hover/item:opacity-100 transition-opacity">
                        <p className="text-xs bg-background px-2 py-1 rounded border border-border">Practical Application</p>
                      </div>
                      <h3 className="font-bold text-lg mb-2 font-serif">Real-World Applications</h3>
                      <ul className="text-sm space-y-2">
                        <li className="flex items-start gap-2 group/list hover:text-primary transition-colors">
                          <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 group-hover/list:scale-110 transition-transform">
                            <BarChart2 className="h-3 w-3 text-primary" />
                          </div>
                          <span>Business: Profit/Loss Optimization</span>
                        </li>
                        <li className="flex items-start gap-2 group/list hover:text-primary transition-colors">
                          <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 group-hover/list:scale-110 transition-transform">
                            <Share2 className="h-3 w-3 text-primary" />
                          </div>
                          <span>Physical Problems: Speed/Distance Optimization</span>
                        </li>
                        <li className="flex items-start gap-2 group/list hover:text-primary transition-colors">
                          <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 group-hover/list:scale-110 transition-transform">
                            <BrainCircuit className="h-3 w-3 text-primary" />
                          </div>
                          <span>Investment: Expected Return Optimization</span>
                        </li>
                      </ul>
                    </div>

                    <div className="group/item relative bg-muted/50 rounded-lg p-4 border border-border hover:bg-muted transition-colors">
                      <div className="absolute top-2 right-2 opacity-0 group-hover/item:opacity-100 transition-opacity">
                        <p className="text-xs bg-background px-2 py-1 rounded border border-border">Expert Insight</p>
                      </div>
                      <h3 className="font-bold text-lg mb-2 font-serif">Model Building Skills</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        The art of balancing mathematical complexity with tractability in problem formulation.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Model Complexity</span>
                          <span className="font-medium">60%</span>
                        </div>
                        <Progress value={60} className="h-1.5" />
                        <div className="flex items-center justify-between text-sm">
                          <span>Model Tractability</span>
                          <span className="font-medium">40%</span>
                        </div>
                        <Progress value={40} className="h-1.5" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors group">
                <CardHeader>
                  <CardTitle className="font-serif">Interactive Learning</CardTitle>
                  <CardDescription>Test your understanding of optimization concepts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-muted/50 rounded-lg p-4 border border-border">
                      <h3 className="font-bold text-lg mb-4 font-serif">Optimization Scenarios</h3>
                      <div className="space-y-4">
                        <div className="group/scenario relative bg-background rounded-lg p-4 border border-border hover:border-primary/40 transition-colors">
                          <h4 className="font-medium mb-2">Scenario 1: Business Optimization</h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            A company needs to maximize profit while considering production constraints and market demand.
                          </p>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="hover:scale-105 transition-transform">
                              Analyze
                            </Button>
                            <Button variant="outline" size="sm" className="hover:scale-105 transition-transform">
                              Solve
                            </Button>
                          </div>
                        </div>

                        <div className="group/scenario relative bg-background rounded-lg p-4 border border-border hover:border-primary/40 transition-colors">
                          <h4 className="font-medium mb-2">Scenario 2: Resource Allocation</h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            Optimize resource distribution across multiple projects with varying priorities and constraints.
                          </p>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="hover:scale-105 transition-transform">
                              Analyze
                            </Button>
                            <Button variant="outline" size="sm" className="hover:scale-105 transition-transform">
                              Solve
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors group">
                <CardHeader>
                  <CardTitle className="font-serif">Learning Progress</CardTitle>
                  <CardDescription>Track your understanding of Chapter 1.1</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>Overall Progress</span>
                        <span className="font-medium">45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>Concept Understanding</span>
                        <span className="font-medium">60%</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>Practical Application</span>
                        <span className="font-medium">30%</span>
                      </div>
                      <Progress value={30} className="h-2" />
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
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 group/item hover:text-primary transition-colors">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 group-hover/item:scale-110 transition-transform">
                        <Lightbulb className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-sm">Optimization provides a framework for complex decision-making</span>
                    </li>
                    <li className="flex items-start gap-2 group/item hover:text-primary transition-colors">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 group-hover/item:scale-110 transition-transform">
                        <BrainCircuit className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-sm">Balance between model complexity and tractability is crucial</span>
                    </li>
                    <li className="flex items-start gap-2 group/item hover:text-primary transition-colors">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 group-hover/item:scale-110 transition-transform">
                        <Target className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-sm">Focus on a single objective for effective problem-solving</span>
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

