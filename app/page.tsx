"use client"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, Award, BarChart2, BookMarked, Layers, BrainCircuit, GitBranch, Target, Share2, Boxes, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { MathComponent } from "@/components/math-component"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShaderBackground } from "./components/shader-background"
import { Drawer } from "./components/drawer"
import { NavigationContent } from "./components/navigation-content"
import { SitemapOrgChart } from "./components/sitemap-org-chart"

export default function Home() {
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false)
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col relative overflow-hidden">
      <ShaderBackground />
      
      <Drawer
        isOpen={leftDrawerOpen}
        onClose={() => setLeftDrawerOpen(false)}
        position="left"
      >
        <NavigationContent type="left" />
      </Drawer>

      <Drawer
        isOpen={rightDrawerOpen}
        onClose={() => setRightDrawerOpen(false)}
        position="right"
      >
        <NavigationContent type="right" />
      </Drawer>

      <header className="sticky top-0 z-10 glass-nav">
        <div className="flex h-16 items-center justify-center max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 font-semibold">
            <BookMarked className="h-5 w-5 text-primary animate-pulse" />
            <span className="font-serif">Linear & Nonlinear Programming</span>
          </div>
        </div>
      </header>

      <main className="flex-1 relative z-10">
        <section className="w-full py-12 md:py-24 lg:py-32">
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
                  <Link href="/chapters">
                    <Button className="glass-button hover:scale-105 transition-transform">Start Learning</Button>
                  </Link>
                  <Link href="/syllabus">
                    <Button variant="outline" className="glass-button hover:scale-105 transition-transform">View Syllabus</Button>
                  </Link>
                </div>
              </div>
              
              <div className="glass-card relative w-[300px] h-[400px] overflow-hidden group">
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpen className="h-24 w-24 text-muted-foreground/50 group-hover:scale-110 transition-transform" />
                </div>
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-background/80 to-transparent h-1/3"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-bold font-serif">Linear & Nonlinear Programming</h3>
                  <p className="text-sm text-muted-foreground">Interactive Edition</p>
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
              <TabsList className="glass grid w-full grid-cols-3">
                <TabsTrigger value="overview" className="hover:scale-105 transition-transform data-[state=active]:bg-primary/20">Book Overview</TabsTrigger>
                <TabsTrigger value="structure" className="hover:scale-105 transition-transform data-[state=active]:bg-primary/20">Book Structure</TabsTrigger>
                <TabsTrigger value="methods" className="hover:scale-105 transition-transform data-[state=active]:bg-primary/20">Key Methods</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="glass-card col-span-1 md:col-span-2 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 bg-primary/10 p-2 rounded-bl-lg group-hover:bg-primary/20 transition-colors">
                      <Award className="h-5 w-5 text-primary animate-bounce" />
                    </div>
                    <CardHeader>
                      <CardTitle className="font-serif">Optimization Mastery</CardTitle>
                      <CardDescription>Your learning path to expertise</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 group/item hover:bg-background/50 p-2 rounded-lg transition-colors">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                            <Target className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium font-serif">Prerequisites</p>
                            <p className="text-sm text-muted-foreground">Familiarity with introductory elements of linear algebra</p>
                            <Progress value={30} className="h-1.5 mt-1.5" />
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 group/item hover:bg-background/50 p-2 rounded-lg transition-colors">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                            <BrainCircuit className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium font-serif">Advanced Concepts</p>
                            <p className="text-sm text-muted-foreground">Eigenvector analysis and sets of real numbers</p>
                            <Progress value={60} className="h-1.5 mt-1.5" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass-card flex flex-col justify-between group">
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

              <TabsContent value="structure">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="glass-card group">
                    <CardHeader>
                      <CardTitle className="font-serif">Linear Programming</CardTitle>
                      <CardDescription>Chapters 1-5</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 group/item hover:bg-background/50 p-2 rounded-lg transition-colors">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium font-serif">Chapter 1: Introduction</p>
                            <p className="text-sm text-muted-foreground">Basic concepts and terminology</p>
                            <Progress value={100} className="h-1.5 mt-1.5" />
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 group/item hover:bg-background/50 p-2 rounded-lg transition-colors">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium font-serif">Chapter 2: Linear Programming Models</p>
                            <p className="text-sm text-muted-foreground">Formulation and solution methods</p>
                            <Progress value={85} className="h-1.5 mt-1.5" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass-card group">
                    <CardHeader>
                      <CardTitle className="font-serif">Nonlinear Programming</CardTitle>
                      <CardDescription>Chapters 6-10</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 group/item hover:bg-background/50 p-2 rounded-lg transition-colors">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium font-serif">Chapter 6: Nonlinear Optimization</p>
                            <p className="text-sm text-muted-foreground">Fundamentals and applications</p>
                            <Progress value={45} className="h-1.5 mt-1.5" />
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 group/item hover:bg-background/50 p-2 rounded-lg transition-colors">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium font-serif">Chapter 7: Constrained Optimization</p>
                            <p className="text-sm text-muted-foreground">Methods and techniques</p>
                            <Progress value={30} className="h-1.5 mt-1.5" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="methods">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="glass-card group">
                    <CardHeader>
                      <CardTitle className="font-serif">Simplex Method</CardTitle>
                      <CardDescription>Linear Programming</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 group/item hover:bg-background/50 p-2 rounded-lg transition-colors">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                            <BarChart2 className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium font-serif">Standard Form</p>
                            <p className="text-sm text-muted-foreground">Converting problems to standard form</p>
                            <Progress value={90} className="h-1.5 mt-1.5" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass-card group">
                    <CardHeader>
                      <CardTitle className="font-serif">Gradient Methods</CardTitle>
                      <CardDescription>Nonlinear Programming</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 group/item hover:bg-background/50 p-2 rounded-lg transition-colors">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                            <BrainCircuit className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium font-serif">Steepest Descent</p>
                            <p className="text-sm text-muted-foreground">Optimization algorithms</p>
                            <Progress value={75} className="h-1.5 mt-1.5" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass-card group">
                    <CardHeader>
                      <CardTitle className="font-serif">Interior Point</CardTitle>
                      <CardDescription>Advanced Methods</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 group/item hover:bg-background/50 p-2 rounded-lg transition-colors">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                            <GitBranch className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium font-serif">Barrier Methods</p>
                            <p className="text-sm text-muted-foreground">Modern optimization techniques</p>
                            <Progress value={60} className="h-1.5 mt-1.5" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Sitemap Org Chart Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background/30 backdrop-blur-sm">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-serif bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                  Site Navigation
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore the complete structure of our interactive learning platform
                </p>
              </div>
            </div>
            
            <SitemapOrgChart />
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
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
              <Card className="glass-card group">
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
                  <Button className="glass-button w-full hover:scale-105 transition-transform">Continue</Button>
                </CardFooter>
              </Card>
              
              <Card className="glass-card group">
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
                  <Button className="glass-button w-full hover:scale-105 transition-transform">
                    Start Chapter
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

