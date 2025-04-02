"use client"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Brain, Target, Lightbulb, Timer, Cpu, Database, Calculator, GitBranch, BarChart2, Factory, Truck, Network, Utensils, Warehouse } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { MathJaxContext, MathJax } from "better-react-mathjax"
import { DietProblemGame } from "./components/diet-problem-game"
import { ManufacturingProblemGame } from "./components/manufacturing-problem-game"
import { TransportationProblemGame } from "./components/transportation-problem-game"
import { MaximalFlowProblemGame } from "./components/maximal-flow-problem-game"
import { WarehousingProblemGame } from "./components/warehousing-problem-game"
import { DietProblemInfographic, ManufacturingProblemInfographic, TransportationProblemInfographic, MaximalFlowInfographic, WarehousingInfographic } from "./components/infographics"

const config = {
  loader: { load: ["[tex]/html"] },
  tex: {
    packages: { "[+]": ["html"] },
    inlineMath: [["$", "$"]],
    displayMath: [["$$", "$$"]],
  },
}

export default function Chapter2_2() {
  return (
    <div className="px-32 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <Link href="/chapters/2.1">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Previous Chapter
          </Button>
        </Link>
        <Link href="/chapters/2.3">
          <Button variant="ghost" className="gap-2">
            Next Chapter
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold font-serif mb-4">2.2 Examples of Linear Programming Problems</h1>
          <p className="text-muted-foreground">
            Understanding real-world applications of linear programming through classic examples.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Diet Problem */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Utensils className="h-5 w-5" />
                Diet Problem
              </CardTitle>
              <CardDescription>
                Find the minimum cost diet that satisfies nutritional requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DietProblemInfographic />
            </CardContent>
          </Card>

          {/* Manufacturing Problem */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Factory className="h-5 w-5" />
                Manufacturing Problem
              </CardTitle>
              <CardDescription>
                Maximize profit by allocating resources to different products
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ManufacturingProblemInfographic />
            </CardContent>
          </Card>

          {/* Transportation Problem */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Transportation Problem
              </CardTitle>
              <CardDescription>
                Minimize shipping costs between sources and destinations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TransportationProblemInfographic />
            </CardContent>
          </Card>

          {/* Maximal Flow Problem */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="h-5 w-5" />
                Maximal Flow Problem
              </CardTitle>
              <CardDescription>
                Find the maximum flow from source to sink in a capacitated network
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MaximalFlowInfographic />
            </CardContent>
          </Card>

          {/* Warehousing Problem */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Warehouse className="h-5 w-5" />
                Warehousing Problem
              </CardTitle>
              <CardDescription>
                Optimize warehouse operations by buying and selling stock to maximize profit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <WarehousingInfographic />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold font-serif">Interactive Learning</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DietProblemGame />
            <ManufacturingProblemGame />
            <TransportationProblemGame />
            <MaximalFlowProblemGame />
            <WarehousingProblemGame />
          </div>
        </div>
      </div>

      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>© 2024 Linear and Nonlinear Programming. All rights reserved.</p>
      </footer>
    </div>
  )
} 