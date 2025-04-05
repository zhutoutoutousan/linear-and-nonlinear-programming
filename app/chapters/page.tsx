"use client"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, ChevronRight, BookMarked, BarChart2, BrainCircuit, GitBranch, Target, Layers, ArrowRight, CheckCircle, Clock, Lock, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ShaderBackground } from "../components/shader-background"
import { motion } from "framer-motion"

// Chapter data
const chapters = [
  {
    id: 1,
    title: "Introduction to Optimization",
    description: "Basic concepts and terminology in optimization theory",
    icon: <BookOpen className="h-6 w-6" />,
    progress: 100,
    status: "completed",
    color: "from-blue-500/20 to-blue-500/5",
    borderColor: "border-blue-500/30",
    textColor: "text-blue-400",
    category: "Linear Programming",
    lastAccessed: "2 days ago",
    subchapters: [
      { id: "1.1", title: "OPTIMIZATION", page: 19 },
      { id: "1.2", title: "TYPES OF PROBLEMS", page: 20 },
      { id: "1.3", title: "SIZE OF PROBLEMS", page: 23 },
      { id: "1.4", title: "ITERATIVE ALGORITHMS AND CONVERGENCE", page: 24 }
    ]
  },
  {
    id: 2,
    title: "Basic Properties of Linear Programs",
    description: "Formulation and solution methods for linear programming problems",
    icon: <BarChart2 className="h-6 w-6" />,
    progress: 85,
    status: "in-progress",
    color: "from-green-500/20 to-green-500/5",
    borderColor: "border-green-500/30",
    textColor: "text-green-400",
    category: "Linear Programming",
    lastAccessed: "Yesterday",
    subchapters: [
      { id: "2.1", title: "INTRODUCTION", page: 29 },
      { id: "2.2", title: "EXAMPLES OF LINEAR PROGRAMMING PROBLEMS", page: 32 },
      { id: "2.3", title: "BASIC SOLUTIONS", page: 37 },
      { id: "2.4", title: "THE FUNDAMENTAL THEOREM OF LINEAR PROGRAMMING", page: 38 },
      { id: "2.5", title: "RELATIONS TO CONVEXITY", page: 40 },
      { id: "2.6", title: "EXERCISES", page: 44 }
    ]
  },
  {
    id: 3,
    title: "The Simplex Method",
    description: "The fundamental algorithm for solving linear programming problems",
    icon: <Layers className="h-6 w-6" />,
    progress: 65,
    status: "in-progress",
    color: "from-purple-500/20 to-purple-500/5",
    borderColor: "border-purple-500/30",
    textColor: "text-purple-400",
    category: "Linear Programming",
    lastAccessed: "3 days ago",
    subchapters: [
      { id: "3.1", title: "PIVOTS", page: 49 },
      { id: "3.2", title: "ADJACENT EXTREME POINTS", page: 54 },
      { id: "3.3", title: "DETERMINING A MINIMUM FEASIBLE SOLUTION", page: 58 },
      { id: "3.4", title: "COMPUTATIONAL PROCEDURE–SIMPLEX METHOD", page: 61 },
      { id: "3.5", title: "FINDING A BASIC FEASIBLE SOLUTION", page: 65 },
      { id: "3.6", title: "MATRIX FORM OF THE SIMPLEX METHOD", page: 70 },
      { id: "3.7", title: "SIMPLEX METHOD FOR TRANSPORTATION PROBLEMS", page: 72 },
      { id: "3.8", title: "DECOMPOSITION", page: 84 },
      { id: "3.9", title: "SUMMARY", page: 87 },
      { id: "3.10", title: "EXERCISES", page: 88 }
    ]
  },
  {
    id: 4,
    title: "Duality and Complementarity",
    description: "Understanding the relationship between primal and dual problems",
    icon: <GitBranch className="h-6 w-6" />,
    progress: 0,
    status: "locked",
    color: "from-gray-500/20 to-gray-500/5",
    borderColor: "border-gray-500/30",
    textColor: "text-gray-400",
    category: "Linear Programming",
    lastAccessed: null,
    subchapters: [
      { id: "4.1", title: "DUAL LINEAR PROGRAMS", page: 99 },
      { id: "4.2", title: "THE DUALITY THEOREM", page: 102 },
      { id: "4.3", title: "RELATIONS TO THE SIMPLEX PROCEDURE", page: 104 },
      { id: "4.4", title: "SENSITIVITY AND COMPLEMENTARY SLACKNESS", page: 108 },
      { id: "4.5", title: "MAX FLOW–MIN CUT THEOREM", page: 110 },
      { id: "4.6", title: "THE DUAL SIMPLEX METHOD", page: 115 },
      { id: "4.7", title: "THE PRIMAL-DUAL ALGORITHM", page: 118 },
      { id: "4.8", title: "SUMMARY", page: 122 },
      { id: "4.9", title: "EXERCISES", page: 123 }
    ]
  },
  {
    id: 5,
    title: "Interior-Point Methods",
    description: "Modern approaches to solving optimization problems",
    icon: <BrainCircuit className="h-6 w-6" />,
    progress: 0,
    status: "locked",
    color: "from-gray-500/20 to-gray-500/5",
    borderColor: "border-gray-500/30",
    textColor: "text-gray-400",
    category: "Linear Programming",
    lastAccessed: null,
    subchapters: [
      { id: "5.1", title: "ELEMENTS OF COMPLEXITY THEORY", page: 132 },
      { id: "5.2", title: "THE SIMPLEX METHOD IS NOT POLYNOMIAL-TIME", page: 134 },
      { id: "5.3", title: "THE ELLIPSOID METHOD", page: 135 },
      { id: "5.4", title: "THE ANALYTIC CENTER", page: 139 },
      { id: "5.5", title: "THE CENTRAL PATH", page: 141 },
      { id: "5.6", title: "SOLUTION STRATEGIES", page: 146 },
      { id: "5.7", title: "TERMINATION AND INITIALIZATION", page: 153 },
      { id: "5.8", title: "SUMMARY", page: 158 },
      { id: "5.9", title: "EXERCISES", page: 159 }
    ]
  },
  {
    id: 6,
    title: "Conic Linear Programming",
    description: "Fundamentals and applications of nonlinear optimization",
    icon: <BrainCircuit className="h-6 w-6" />,
    progress: 45,
    status: "in-progress",
    color: "from-amber-500/20 to-amber-500/5",
    borderColor: "border-amber-500/30",
    textColor: "text-amber-400",
    category: "Nonlinear Programming",
    lastAccessed: "1 week ago",
    subchapters: [
      { id: "6.1", title: "CONVEX CONES", page: 163 },
      { id: "6.2", title: "CONIC LINEAR PROGRAMMING PROBLEM", page: 164 },
      { id: "6.3", title: "FARKAS' LEMMA FOR CONIC LINEAR PROGRAMMING", page: 168 },
      { id: "6.4", title: "CONIC LINEAR PROGRAMMING DUALITY", page: 171 },
      { id: "6.5", title: "COMPLEMENTARITY AND SOLUTION RANK OF SDP", page: 179 },
      { id: "6.6", title: "INTERIOR-POINT ALGORITHMS FOR CONIC LINEAR PROGRAMMING", page: 183 },
      { id: "6.7", title: "SUMMARY", page: 186 },
      { id: "6.8", title: "EXERCISES", page: 187 }
    ]
  },
  {
    id: 7,
    title: "Basic Properties of Solutions and Algorithms",
    description: "Methods and techniques for solving constrained optimization problems",
    icon: <Target className="h-6 w-6" />,
    progress: 30,
    status: "in-progress",
    color: "from-red-500/20 to-red-500/5",
    borderColor: "border-red-500/30",
    textColor: "text-red-400",
    category: "Nonlinear Programming",
    lastAccessed: "2 weeks ago",
    subchapters: [
      { id: "7.1", title: "FIRST-ORDER NECESSARY CONDITIONS", page: 194 },
      { id: "7.2", title: "EXAMPLES OF UNCONSTRAINED PROBLEMS", page: 196 },
      { id: "7.3", title: "SECOND-ORDER CONDITIONS", page: 199 },
      { id: "7.4", title: "CONVEX AND CONCAVE FUNCTIONS", page: 202 },
      { id: "7.5", title: "MINIMIZATION AND MAXIMIZATION OF CONVEX FUNCTIONS", page: 206 },
      { id: "7.6", title: "ZERO-ORDER CONDITIONS", page: 208 },
      { id: "7.7", title: "GLOBAL CONVERGENCE OF DESCENT ALGORITHMS", page: 210 },
      { id: "7.8", title: "SPEED OF CONVERGENCE", page: 218 },
      { id: "7.9", title: "SUMMARY", page: 223 },
      { id: "7.10", title: "EXERCISES", page: 223 }
    ]
  },
  {
    id: 8,
    title: "Basic Descent Methods",
    description: "Techniques for solving optimization problems without constraints",
    icon: <BarChart2 className="h-6 w-6" />,
    progress: 0,
    status: "locked",
    color: "from-gray-500/20 to-gray-500/5",
    borderColor: "border-gray-500/30",
    textColor: "text-gray-400",
    category: "Nonlinear Programming",
    lastAccessed: null,
    subchapters: [
      { id: "8.1", title: "LINE SEARCH ALGORITHMS", page: 228 },
      { id: "8.2", title: "THE METHOD OF STEEPEST DESCENT", page: 242 },
      { id: "8.3", title: "APPLICATIONS OF THE CONVERGENCE THEORY", page: 253 },
      { id: "8.4", title: "ACCELERATED STEEPEST DESCENT", page: 257 },
      { id: "8.5", title: "NEWTON'S METHOD", page: 259 },
      { id: "8.6", title: "COORDINATE DESCENT METHODS", page: 266 },
      { id: "8.7", title: "SUMMARY", page: 270 },
      { id: "8.8", title: "EXERCISES", page: 271 }
    ]
  },
  {
    id: 9,
    title: "Conjugate Direction Methods",
    description: "Modern approaches to solving optimization problems",
    icon: <GitBranch className="h-6 w-6" />,
    progress: 0,
    status: "locked",
    color: "from-gray-500/20 to-gray-500/5",
    borderColor: "border-gray-500/30",
    textColor: "text-gray-400",
    category: "Nonlinear Programming",
    lastAccessed: null,
    subchapters: [
      { id: "9.1", title: "CONJUGATE DIRECTIONS", page: 277 },
      { id: "9.2", title: "DESCENT PROPERTIES OF THE CONJUGATE DIRECTION METHOD", page: 280 },
      { id: "9.3", title: "THE CONJUGATE GRADIENT METHOD", page: 282 },
      { id: "9.4", title: "THE C–G METHOD AS AN OPTIMAL PROCESS", page: 284 },
      { id: "9.5", title: "THE PARTIAL CONJUGATE GRADIENT METHOD", page: 287 },
      { id: "9.6", title: "EXTENSION TO NONQUADRATIC PROBLEMS", page: 290 },
      { id: "9.7", title: "PARALLEL TANGENTS", page: 293 },
      { id: "9.8", title: "EXERCISES", page: 295 }
    ]
  },
  {
    id: 10,
    title: "Quasi-Newton Methods",
    description: "Techniques for finding global optima in complex problems",
    icon: <BrainCircuit className="h-6 w-6" />,
    progress: 0,
    status: "locked",
    color: "from-gray-500/20 to-gray-500/5",
    borderColor: "border-gray-500/30",
    textColor: "text-gray-400",
    category: "Nonlinear Programming",
    lastAccessed: null,
    subchapters: [
      { id: "10.1", title: "MODIFIED NEWTON METHOD", page: 299 },
      { id: "10.2", title: "CONSTRUCTION OF THE INVERSE", page: 302 },
      { id: "10.3", title: "DAVIDON-FLETCHER-POWELL METHOD", page: 304 },
      { id: "10.4", title: "THE BROYDEN FAMILY", page: 307 },
      { id: "10.5", title: "CONVERGENCE PROPERTIES", page: 310 },
      { id: "10.6", title: "SCALING", page: 313 },
      { id: "10.7", title: "MEMORYLESS QUASI-NEWTON METHODS", page: 318 },
      { id: "10.8", title: "COMBINATION OF STEEPEST DESCENT AND NEWTON'S METHOD", page: 320 },
      { id: "10.9", title: "SUMMARY", page: 325 },
      { id: "10.10", title: "EXERCISES", page: 326 }
    ]
  },
  {
    id: 11,
    title: "Constrained Minimization Conditions",
    description: "Understanding conditions for constrained optimization",
    icon: <Target className="h-6 w-6" />,
    progress: 0,
    status: "locked",
    color: "from-gray-500/20 to-gray-500/5",
    borderColor: "border-gray-500/30",
    textColor: "text-gray-400",
    category: "Nonlinear Programming",
    lastAccessed: null,
    subchapters: [
      { id: "11.1", title: "CONSTRAINTS", page: 333 },
      { id: "11.2", title: "TANGENT PLANE", page: 335 },
      { id: "11.3", title: "FIRST-ORDER NECESSARY CONDITIONS (EQUALITY CONSTRAINTS)", page: 338 },
      { id: "11.4", title: "EXAMPLES", page: 339 },
      { id: "11.5", title: "SECOND-ORDER CONDITIONS", page: 345 },
      { id: "11.6", title: "EIGENVALUES IN TANGENT SUBSPACE", page: 347 },
      { id: "11.7", title: "SENSITIVITY", page: 350 },
      { id: "11.8", title: "INEQUALITY CONSTRAINTS", page: 351 },
      { id: "11.9", title: "ZERO-ORDER CONDITIONS AND LAGRANGIAN RELAXATION", page: 356 },
      { id: "11.10", title: "SUMMARY", page: 363 },
      { id: "11.11", title: "EXERCISES", page: 363 }
    ]
  },
  {
    id: 12,
    title: "Primal Methods",
    description: "Methods for solving constrained optimization problems",
    icon: <BarChart2 className="h-6 w-6" />,
    progress: 0,
    status: "locked",
    color: "from-gray-500/20 to-gray-500/5",
    borderColor: "border-gray-500/30",
    textColor: "text-gray-400",
    category: "Nonlinear Programming",
    lastAccessed: null,
    subchapters: [
      { id: "12.1", title: "ADVANTAGE OF PRIMAL METHODS", page: 369 },
      { id: "12.2", title: "FEASIBLE DIRECTION METHODS", page: 370 },
      { id: "12.3", title: "ACTIVE SET METHODS", page: 372 },
      { id: "12.4", title: "THE GRADIENT PROJECTION METHOD", page: 376 },
      { id: "12.5", title: "CONVERGENCE RATE OF THE GRADIENT PROJECTION METHOD", page: 382 },
      { id: "12.6", title: "THE REDUCED GRADIENT METHOD", page: 390 },
      { id: "12.7", title: "CONVERGENCE RATE OF THE REDUCED GRADIENT METHOD", page: 395 },
      { id: "12.8", title: "VARIATIONS", page: 402 },
      { id: "12.9", title: "SUMMARY", page: 404 },
      { id: "12.10", title: "EXERCISES", page: 405 }
    ]
  },
  {
    id: 13,
    title: "Penalty and Barrier Methods",
    description: "Methods for handling constraints in optimization",
    icon: <Layers className="h-6 w-6" />,
    progress: 0,
    status: "locked",
    color: "from-gray-500/20 to-gray-500/5",
    borderColor: "border-gray-500/30",
    textColor: "text-gray-400",
    category: "Nonlinear Programming",
    lastAccessed: null,
    subchapters: [
      { id: "13.1", title: "PENALTY METHODS", page: 410 },
      { id: "13.2", title: "BARRIER METHODS", page: 413 },
      { id: "13.3", title: "PROPERTIES OF PENALTY AND BARRIER FUNCTIONS", page: 415 },
      { id: "13.4", title: "NEWTON'S METHOD AND PENALTY FUNCTIONS", page: 424 },
      { id: "13.5", title: "CONJUGATE GRADIENTS AND PENALTY METHODS", page: 425 },
      { id: "13.6", title: "NORMALIZATION OF PENALTY FUNCTIONS", page: 427 },
      { id: "13.7", title: "PENALTY FUNCTIONS AND GRADIENT PROJECTION", page: 429 },
      { id: "13.8", title: "EXACT PENALTY FUNCTIONS", page: 433 },
      { id: "13.9", title: "SUMMARY", page: 436 },
      { id: "13.10", title: "EXERCISES", page: 437 }
    ]
  },
  {
    id: 14,
    title: "Duality and Dual Methods",
    description: "Understanding duality in optimization",
    icon: <GitBranch className="h-6 w-6" />,
    progress: 0,
    status: "locked",
    color: "from-gray-500/20 to-gray-500/5",
    borderColor: "border-gray-500/30",
    textColor: "text-gray-400",
    category: "Nonlinear Programming",
    lastAccessed: null,
    subchapters: [
      { id: "14.1", title: "GLOBAL DUALITY", page: 442 },
      { id: "14.2", title: "LOCAL DUALITY", page: 447 },
      { id: "14.3", title: "CANONICAL CONVERGENCE RATE OF DUAL STEEPEST ASCENT", page: 452 },
      { id: "14.4", title: "SEPARABLE PROBLEMS AND THEIR DUALS", page: 453 },
      { id: "14.5", title: "AUGMENTED LAGRANGIAN", page: 457 },
      { id: "14.6", title: "THE METHOD OF MULTIPLIERS", page: 461 },
      { id: "14.7", title: "THE ALTERNATING DIRECTION METHOD OF MULTIPLIERS", page: 466 },
      { id: "14.8", title: "CUTTING PLANE METHODS", page: 470 },
      { id: "14.9", title: "EXERCISES", page: 475 }
    ]
  },
  {
    id: 15,
    title: "Primal-Dual Methods",
    description: "Combining primal and dual approaches in optimization",
    icon: <BrainCircuit className="h-6 w-6" />,
    progress: 0,
    status: "locked",
    color: "from-gray-500/20 to-gray-500/5",
    borderColor: "border-gray-500/30",
    textColor: "text-gray-400",
    category: "Nonlinear Programming",
    lastAccessed: null,
    subchapters: [
      { id: "15.1", title: "THE STANDARD PROBLEM", page: 479 },
      { id: "15.2", title: "A SIMPLE MERIT FUNCTION", page: 482 },
      { id: "15.3", title: "BASIC PRIMAL-DUAL METHODS", page: 483 },
      { id: "15.4", title: "MODIFIED NEWTON METHODS", page: 489 },
      { id: "15.5", title: "DESCENT PROPERTIES", page: 491 },
      { id: "15.6", title: "RATE OF CONVERGENCE", page: 495 },
      { id: "15.7", title: "PRIMAL-DUAL INTERIOR POINT METHODS", page: 497 },
      { id: "15.8", title: "SUMMARY", page: 500 },
      { id: "15.9", title: "EXERCISES", page: 501 }
    ]
  }
]

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
}

export default function ChaptersPage() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [expandedChapters, setExpandedChapters] = useState<number[]>([])
  
  // Filter chapters based on active filter
  const filteredChapters = activeFilter === "all" 
    ? chapters 
    : chapters.filter(chapter => chapter.category === activeFilter)
  
  // Get unique categories
  const categories = ["all", ...new Set(chapters.map(chapter => chapter.category))]
  
  // Toggle chapter expansion
  const toggleChapter = (chapterId: number) => {
    setExpandedChapters(prev => 
      prev.includes(chapterId) 
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    )
  }
  
  return (
    <div className="flex min-h-screen flex-col relative overflow-hidden">
      <ShaderBackground />
      
      <header className="sticky top-0 z-10 glass-nav">
        <div className="flex h-16 items-center justify-between max-w-7xl mx-auto px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold hover:opacity-80 transition-opacity">
            <BookMarked className="h-5 w-5 text-primary animate-pulse" />
            <span className="font-serif">Linear & Nonlinear Programming</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 relative z-10">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-serif bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                  Course Chapters
                </h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore our comprehensive curriculum covering linear and nonlinear programming
                </p>
              </div>
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeFilter === category ? "default" : "outline"}
                  className={`glass-button ${
                    activeFilter === category 
                      ? "bg-primary/20 border-primary/30" 
                      : "hover:bg-background/50"
                  }`}
                  onClick={() => setActiveFilter(category)}
                >
                  {category === "all" ? "All Chapters" : category}
                </Button>
              ))}
            </div>
            
            {/* Table of Contents */}
            <div className="max-w-5xl mx-auto mb-16">
              <h2 className="text-2xl font-bold tracking-tighter font-serif text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                Table of Contents
              </h2>
              <div className="glass-card p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/80 to-primary/20"></div>
                <div className="space-y-4">
                  {filteredChapters.map((chapter) => (
                    <div key={chapter.id} className="space-y-2">
                      <div 
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-background/30 cursor-pointer transition-colors"
                        onClick={() => toggleChapter(chapter.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center ${chapter.textColor}`}>
                            {chapter.icon}
                          </div>
                          <div>
                            <h3 className="font-medium">Chapter {chapter.id}: {chapter.title}</h3>
                            <p className="text-sm text-muted-foreground">{chapter.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {chapter.status === "completed" && (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          )}
                          {chapter.status === "in-progress" && (
                            <Clock className="h-5 w-5 text-amber-500" />
                          )}
                          {chapter.status === "locked" && (
                            <Lock className="h-5 w-5 text-gray-500" />
                          )}
                          {expandedChapters.includes(chapter.id) ? (
                            <ChevronUp className="h-5 w-5 text-primary" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-primary" />
                          )}
                        </div>
                      </div>
                      
                      {/* Subchapters */}
                      {expandedChapters.includes(chapter.id) && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="pl-12 space-y-1"
                        >
                          {chapter.subchapters.map((subchapter) => (
                            <Link 
                              key={subchapter.id} 
                              href={`/chapters/${subchapter.id}`}
                              className="flex items-center justify-between p-2 rounded-md hover:bg-background/20 transition-colors"
                            >
                              <span className="font-medium">{subchapter.id} {subchapter.title}</span>
                              <span className="text-sm text-muted-foreground">Page {subchapter.page}</span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Learning Path Visualization */}
            <div className="mt-16 max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold tracking-tighter font-serif text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                Your Learning Path
              </h2>
              <div className="glass-card p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/80 to-primary/20"></div>
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        </div>
                        <div>
                          <p className="font-medium">Completed</p>
                          <p className="text-sm text-muted-foreground">1 chapter</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                          <Clock className="h-5 w-5 text-amber-500" />
                        </div>
                        <div>
                          <p className="font-medium">In Progress</p>
                          <p className="text-sm text-muted-foreground">4 chapters</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gray-500/20 flex items-center justify-center">
                          <Lock className="h-5 w-5 text-gray-500" />
                        </div>
                        <div>
                          <p className="font-medium">Locked</p>
                          <p className="text-sm text-muted-foreground">5 chapters</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Overall Progress</span>
                        <span className="font-medium">35%</span>
                      </div>
                      <Progress value={35} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-2">
                        Complete all chapters to unlock the final assessment
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

    </div>
  )
}

