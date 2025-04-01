import Link from "next/link"
import { BookOpen, Award, BarChart2, BookMarked, Layers, BrainCircuit, GitBranch, Target, Share2, Boxes } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { MathComponent } from "@/components/math-component"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-center max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 font-semibold">
            <BookMarked className="h-5 w-5 text-primary animate-pulse" />
            <span className="font-serif">Linear & Nonlinear Programming</span>
          </div>
          <nav className="hidden md:flex gap-6 ml-auto">
            <Link href="/" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
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
            <Link
              href="/achievements"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Achievements
            </Link>
          </nav>
          <Button size="sm" className="ml-6 hover:scale-105 transition-transform">Sign In</Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted to-background">
          <div className="px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center max-w-5xl mx-auto">
              <div className="space-y-4 text-center lg:text-left">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-serif bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 animate-gradient">
                  Master Linear & Nonlinear Programming
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto lg:mx-0">
                  An interactive learning experience combining classical optimization techniques with modern algorithmic approaches.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center lg:justify-start">
                  <Button className="hover:scale-105 transition-transform">Start Learning</Button>
                  <Button variant="outline" className="hover:scale-105 transition-transform">View Syllabus</Button>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative w-[300px] h-[400px] bg-background rounded-lg shadow-lg overflow-hidden border-2 border-primary/20 hover:border-primary/40 transition-colors group">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="h-24 w-24 text-muted-foreground/50 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="absolute bottom-0 w-full bg-gradient-to-t from-background to-transparent h-1/3"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-lg font-bold font-serif">Linear & Nonlinear Programming</h3>
                    <p className="text-sm text-muted-foreground">Interactive Edition</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-serif bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                  Optimization Journey
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore the interconnected concepts of practical optimization techniques
                </p>
              </div>
            </div>

            <Tabs defaultValue="overview" className="w-full max-w-5xl mx-auto">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview" className="hover:scale-105 transition-transform">Book Overview</TabsTrigger>
                <TabsTrigger value="structure" className="hover:scale-105 transition-transform">Book Structure</TabsTrigger>
                <TabsTrigger value="methods" className="hover:scale-105 transition-transform">Key Methods</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="col-span-1 md:col-span-2 border-2 border-primary/20 relative overflow-hidden hover:border-primary/40 transition-colors group">
                    <div className="absolute top-0 right-0 bg-primary/10 p-2 rounded-bl-lg group-hover:bg-primary/20 transition-colors">
                      <Award className="h-5 w-5 text-primary animate-bounce" />
                    </div>
                    <CardHeader>
                      <CardTitle className="font-serif">Optimization Mastery</CardTitle>
                      <CardDescription>Your learning path to expertise</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 group/item hover:bg-muted/50 p-2 rounded-lg transition-colors">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                            <Target className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium font-serif">Prerequisites</p>
                            <p className="text-sm text-muted-foreground">Familiarity with introductory elements of linear algebra</p>
                            <Progress value={30} className="h-1.5 mt-1.5" />
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 group/item hover:bg-muted/50 p-2 rounded-lg transition-colors">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                            <BrainCircuit className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium font-serif">Advanced Concepts</p>
                            <p className="text-sm text-muted-foreground">Eigenvector analysis and sets of real numbers</p>
                            <Progress value={60} className="h-1.5 mt-1.5" />
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 group/item hover:bg-muted/50 p-2 rounded-lg transition-colors">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                            <Share2 className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium font-serif">Interdisciplinary Applications</p>
                            <p className="text-sm text-muted-foreground">System analysis, operations research, and management science</p>
                            <Progress value={85} className="h-1.5 mt-1.5" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-primary/20 flex flex-col justify-between hover:border-primary/40 transition-colors group">
                    <CardHeader>
                      <CardTitle className="font-serif">Book Purpose</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="flex flex-col h-full justify-between">
                        <p className="text-sm">Covering central concepts of practical optimization techniques for:</p>
                        <ul className="text-sm mt-2 space-y-2 list-disc list-inside">
                          <li className="hover:text-primary transition-colors cursor-pointer">Self-study by professionals</li>
                          <li className="hover:text-primary transition-colors cursor-pointer">Undergraduate classroom work</li>
                          <li className="hover:text-primary transition-colors cursor-pointer">Graduate level education</li>
                        </ul>
                        <div className="mt-4">
                          <div className="flex items-center justify-between text-sm">
                            <span>Accessibility</span>
                            <span className="font-medium">90%</span>
                          </div>
                          <Progress value={90} className="h-1.5 mt-1" />
                          <p className="text-xs text-muted-foreground mt-2">Designed for students with technical background in engineering, mathematics, or science</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="structure" className="mt-6">
                <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors group">
                  <CardHeader>
                    <CardTitle className="font-serif">Three-Part Structure</CardTitle>
                    <CardDescription>The book is organized into three independent parts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-muted rounded-lg p-4 relative border border-border hover:border-primary/40 transition-colors group/item">
                        <div className="absolute top-0 right-0 -mt-3 -mr-3 h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm group-hover/item:scale-110 transition-transform">I</div>
                        <h3 className="font-bold text-lg mb-2 mt-2 font-serif">Linear Programming</h3>
                        <p className="text-sm text-muted-foreground mb-3">Self-contained introduction to a key component of optimization theory</p>
                        <ul className="text-sm space-y-1.5">
                          <li className="flex items-start gap-2 group/list hover:text-primary transition-colors">
                            <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 group-hover/list:scale-110 transition-transform">
                              <Layers className="h-3 w-3 text-primary" />
                            </div>
                            <span>Underlying theory</span>
                          </li>
                          <li className="flex items-start gap-2 group/list hover:text-primary transition-colors">
                            <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 group-hover/list:scale-110 transition-transform">
                              <Boxes className="h-3 w-3 text-primary" />
                            </div>
                            <span>Effective numerical algorithms</span>
                          </li>
                          <li className="flex items-start gap-2 group/list hover:text-primary transition-colors">
                            <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 group-hover/list:scale-110 transition-transform">
                              <Target className="h-3 w-3 text-primary" />
                            </div>
                            <span>Special applications</span>
                          </li>
                        </ul>
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-xs">
                            <span>Completion</span>
                            <span>45%</span>
                          </div>
                          <Progress value={45} className="h-1 mt-1" />
                        </div>
                      </div>

                      <div className="bg-muted rounded-lg p-4 relative border border-border hover:border-primary/40 transition-colors group/item">
                        <div className="absolute top-0 right-0 -mt-3 -mr-3 h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm group-hover/item:scale-110 transition-transform">II</div>
                        <h3 className="font-bold text-lg mb-2 mt-2 font-serif">Unconstrained Optimization</h3>
                        <p className="text-sm text-muted-foreground mb-3">Independent from Part I, covering theory and algorithms</p>
                        <ul className="text-sm space-y-1.5">
                          <li className="flex items-start gap-2 group/list hover:text-primary transition-colors">
                            <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 group-hover/list:scale-110 transition-transform">
                              <GitBranch className="h-3 w-3 text-primary" />
                            </div>
                            <span>Optimality conditions</span>
                          </li>
                          <li className="flex items-start gap-2 group/list hover:text-primary transition-colors">
                            <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 group-hover/list:scale-110 transition-transform">
                              <BarChart2 className="h-3 w-3 text-primary" />
                            </div>
                            <span>Basic algorithms</span>
                          </li>
                          <li className="flex items-start gap-2 group/list hover:text-primary transition-colors">
                            <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 group-hover/list:scale-110 transition-transform">
                              <BrainCircuit className="h-3 w-3 text-primary" />
                            </div>
                            <span>Algorithm properties</span>
                          </li>
                        </ul>
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-xs">
                            <span>Completion</span>
                            <span>20%</span>
                          </div>
                          <Progress value={20} className="h-1 mt-1" />
                        </div>
                      </div>

                      <div className="bg-muted rounded-lg p-4 relative border border-border hover:border-primary/40 transition-colors group/item">
                        <div className="absolute top-0 right-0 -mt-3 -mr-3 h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm group-hover/item:scale-110 transition-transform">III</div>
                        <h3 className="font-bold text-lg mb-2 mt-2 font-serif">Constrained Optimization</h3>
                        <p className="text-sm text-muted-foreground mb-3">Extends concepts from Part II to constrained problems</p>
                        <ul className="text-sm space-y-1.5">
                          <li className="flex items-start gap-2 group/list hover:text-primary transition-colors">
                            <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 group-hover/list:scale-110 transition-transform">
                              <Share2 className="h-3 w-3 text-primary" />
                            </div>
                            <span>Extended concepts</span>
                          </li>
                          <li className="flex items-start gap-2 group/list hover:text-primary transition-colors">
                            <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 group-hover/list:scale-110 transition-transform">
                              <Target className="h-3 w-3 text-primary" />
                            </div>
                            <span>Complex constraints</span>
                          </li>
                          <li className="flex items-start gap-2 group/list hover:text-primary transition-colors">
                            <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 group-hover/list:scale-110 transition-transform">
                              <Boxes className="h-3 w-3 text-primary" />
                            </div>
                            <span>Practical applications</span>
                          </li>
                        </ul>
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-xs">
                            <span>Completion</span>
                            <span>0%</span>
                          </div>
                          <Progress value={0} className="h-1 mt-1" />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center mt-8 gap-2">
                      <div className="h-3 w-3 rounded-full bg-primary"></div>
                      <div className="flex-1 h-0.5 bg-primary/30 max-w-xs"></div>
                      <p className="text-sm font-medium font-serif">Each part forms approximately one-quarter course material</p>
                      <div className="flex-1 h-0.5 bg-primary/30 max-w-xs"></div>
                      <div className="h-3 w-3 rounded-full bg-primary"></div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="methods" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors group">
                    <CardHeader>
                      <CardTitle className="font-serif">Advanced Optimization Methods</CardTitle>
                      <CardDescription>State-of-the-art techniques featured in the 4th edition</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="group/item relative bg-muted/50 rounded-lg p-4 border border-border hover:bg-muted transition-colors">
                          <h3 className="font-bold text-lg mb-1 font-serif">Conic Linear Programming</h3>
                          <p className="text-sm text-muted-foreground mb-3">Powerful generalization of Linear Programming in Chapter 6</p>
                          <div className="flex items-center gap-2 text-sm">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                              <BrainCircuit className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">Complexity Level</p>
                              <Progress value={90} className="h-1.5 mt-1 w-32" />
                            </div>
                          </div>
                          <div className="absolute top-2 right-2 opacity-0 group-hover/item:opacity-100 transition-opacity">
                            <p className="text-xs bg-background px-2 py-1 rounded border border-border">Advanced Topic</p>
                          </div>
                        </div>

                        <div className="group/item relative bg-muted/50 rounded-lg p-4 border border-border hover:bg-muted transition-colors">
                          <h3 className="font-bold text-lg mb-1 font-serif">Accelerated Steepest Descent</h3>
                          <p className="text-sm text-muted-foreground mb-3">Method with superior convergence properties (Chapter 8)</p>
                          <div className="flex items-center gap-2 text-sm">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                              <BarChart2 className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">Popularity</p>
                              <Progress value={75} className="h-1.5 mt-1 w-32" />
                            </div>
                          </div>
                          <div className="absolute top-2 right-2 opacity-0 group-hover/item:opacity-100 transition-opacity">
                            <p className="text-xs bg-background px-2 py-1 rounded border border-border">Popular Technique</p>
                          </div>
                        </div>

                        <div className="group/item relative bg-muted/50 rounded-lg p-4 border border-border hover:bg-muted transition-colors">
                          <h3 className="font-bold text-lg mb-1 font-serif">Big Data Optimization</h3>
                          <p className="text-sm text-muted-foreground mb-3">Randomized coordinate descent for large-scale problems</p>
                          <div className="flex items-center gap-2 text-sm">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                              <Boxes className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">Effectiveness</p>
                              <Progress value={85} className="h-1.5 mt-1 w-32" />
                            </div>
                          </div>
                          <div className="absolute top-2 right-2 opacity-0 group-hover/item:opacity-100 transition-opacity">
                            <p className="text-xs bg-background px-2 py-1 rounded border border-border">Modern Solution</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors group">
                    <CardHeader>
                      <CardTitle className="font-serif">Key Insights & Relationships</CardTitle>
                      <CardDescription>Understanding the connection between theory and algorithms</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="bg-muted/50 rounded-lg p-4 border border-border hover:border-primary/40 transition-colors group/item">
                          <h3 className="font-bold text-lg mb-3 font-serif">Analytical ⟷ Algorithmic Connection</h3>
                          <div className="relative">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/20 rounded-full group-hover/item:bg-primary/40 transition-colors"></div>
                            <div className="pl-4 space-y-3">
                              <div>
                                <h4 className="font-medium">Problem Properties</h4>
                                <p className="text-sm text-muted-foreground">Analytical character & necessary conditions</p>
                              </div>
                              <div className="flex justify-center">
                                <div className="h-10 w-10 rounded-full border-2 border-primary/50 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                                  <Share2 className="h-5 w-5 text-primary" />
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium">Solution Algorithms</h4>
                                <p className="text-sm text-muted-foreground">Computational behavior & performance</p>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm mt-4 italic border-t border-border pt-3">
                            "One major insight is the connection between the purely analytical character of an optimization problem and the behavior of algorithms used to solve it."
                          </p>
                        </div>

                        <div className="bg-muted/50 rounded-lg p-4 border border-border hover:border-primary/40 transition-colors group/item">
                          <h3 className="font-bold text-lg mb-2 font-serif">Alternating Direction Method</h3>
                          <div className="flex items-center justify-center gap-6 my-4">
                            <div className="text-center group/box">
                              <div className="h-14 w-14 mx-auto rounded-lg bg-primary/10 flex items-center justify-center mb-2 group-hover/box:scale-110 transition-transform">
                                <span className="font-bold text-lg">2</span>
                              </div>
                              <p className="text-xs font-medium">Two-Part<br/>Splitting</p>
                              <div className="mt-1">
                                <div className="h-1.5 w-16 bg-green-500/20 rounded-full overflow-hidden">
                                  <div className="h-full w-full bg-green-500 rounded-full"></div>
                                </div>
                                <p className="text-xs mt-0.5 text-green-600">Convergent</p>
                              </div>
                            </div>
                            <div className="text-center group/box">
                              <div className="h-14 w-14 mx-auto rounded-lg bg-primary/10 flex items-center justify-center mb-2 group-hover/box:scale-110 transition-transform">
                                <span className="font-bold text-lg">3+</span>
                              </div>
                              <p className="text-xs font-medium">Multi-Part<br/>Splitting</p>
                              <div className="mt-1">
                                <div className="h-1.5 w-16 bg-red-500/20 rounded-full overflow-hidden">
                                  <div className="h-full w-[30%] bg-red-500 rounded-full"></div>
                                </div>
                                <p className="text-xs mt-0.5 text-red-600">Not Convergent</p>
                              </div>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">Chapter 14: Augmented Lagrangian approach with alternating variable updates</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-serif bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                  Continue Learning
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Pick up where you left off or explore new chapters
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-12 mt-8">
              <Card className="hover:border-primary/40 transition-colors group">
                <CardHeader>
                  <CardTitle className="font-serif">Chapter 3: Linear Programming Fundamentals</CardTitle>
                  <CardDescription>Last accessed 2 days ago</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full hover:scale-105 transition-transform">Continue</Button>
                </CardFooter>
              </Card>
              <Card className="hover:border-primary/40 transition-colors group">
                <CardHeader>
                  <CardTitle className="font-serif">Chapter 4: Simplex Method</CardTitle>
                  <CardDescription>Not started yet</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">0%</span>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full hover:scale-105 transition-transform" variant="outline">
                    Start Chapter
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
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

