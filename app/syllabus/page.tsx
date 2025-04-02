"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { 
  Book, 
  BookOpen, 
  CheckCircle2, 
  Circle, 
  Clock, 
  FileText, 
  Lock, 
  Unlock, 
  ArrowLeft, 
  ArrowRight,
  Trophy,
  Star,
  Award,
  Medal,
  Crown
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Chapter {
  id: string
  title: string
  description: string
  progress: number
  isCompleted: boolean
  isUnlocked: boolean
  subsections: Subsection[]
  exercises: number
  estimatedTime: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  achievements: Achievement[]
}

interface Subsection {
  id: string
  title: string
  progress: number
  isCompleted: boolean
  isUnlocked: boolean
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  isUnlocked: boolean
}

const chapters: Chapter[] = [
  {
    id: "1",
    title: "INTRODUCTION",
    description: "Fundamental concepts and types of optimization problems",
    progress: 75,
    isCompleted: false,
    isUnlocked: true,
    subsections: [
      { id: "1.1", title: "OPTIMIZATION", progress: 100, isCompleted: true, isUnlocked: true },
      { id: "1.2", title: "TYPES OF PROBLEMS", progress: 100, isCompleted: true, isUnlocked: true },
      { id: "1.3", title: "SIZE OF PROBLEMS", progress: 50, isCompleted: false, isUnlocked: true },
      { id: "1.4", title: "ITERATIVE ALGORITHMS AND CONVERGENCE", progress: 50, isCompleted: false, isUnlocked: true },
    ],
    exercises: 10,
    estimatedTime: "2 hours",
    difficulty: "Beginner",
    achievements: [
      { id: "a1", title: "Optimization Explorer", description: "Complete all introduction chapters", icon: "star", isUnlocked: false },
      { id: "a2", title: "Problem Solver", description: "Complete 5 exercises", icon: "trophy", isUnlocked: false },
    ]
  },
  {
    id: "2",
    title: "BASIC PROPERTIES OF LINEAR PROGRAMS",
    description: "Understanding the fundamental properties and examples of linear programming",
    progress: 60,
    isCompleted: false,
    isUnlocked: true,
    subsections: [
      { id: "2.1", title: "INTRODUCTION", progress: 100, isCompleted: true, isUnlocked: true },
      { id: "2.2", title: "EXAMPLES OF LINEAR PROGRAMMING PROBLEMS", progress: 100, isCompleted: true, isUnlocked: true },
      { id: "2.3", title: "BASIC SOLUTIONS", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "2.4", title: "THE FUNDAMENTAL THEOREM OF LINEAR PROGRAMMING", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "2.5", title: "RELATIONS TO CONVEXITY", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "2.6", title: "EXERCISES", progress: 0, isCompleted: false, isUnlocked: false },
    ],
    exercises: 15,
    estimatedTime: "3 hours",
    difficulty: "Intermediate",
    achievements: [
      { id: "a3", title: "Linear Programming Master", description: "Complete all linear programming chapters", icon: "award", isUnlocked: false },
      { id: "a4", title: "Problem Solver", description: "Complete 10 exercises", icon: "trophy", isUnlocked: false },
    ]
  },
  {
    id: "3",
    title: "THE SIMPLEX METHOD",
    description: "Learning the fundamental algorithm for solving linear programming problems",
    progress: 0,
    isCompleted: false,
    isUnlocked: false,
    subsections: [
      { id: "3.1", title: "PIVOTS", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "3.2", title: "ADJACENT EXTREME POINTS", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "3.3", title: "DETERMINING A MINIMUM FEASIBLE SOLUTION", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "3.4", title: "COMPUTATIONAL PROCEDURE–SIMPLEX METHOD", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "3.5", title: "FINDING A BASIC FEASIBLE SOLUTION", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "3.6", title: "MATRIX FORM OF THE SIMPLEX METHOD", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "3.7", title: "SIMPLEX METHOD FOR TRANSPORTATION PROBLEMS", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "3.8", title: "DECOMPOSITION", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "3.9", title: "SUMMARY", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "3.10", title: "EXERCISES", progress: 0, isCompleted: false, isUnlocked: false },
    ],
    exercises: 20,
    estimatedTime: "5 hours",
    difficulty: "Advanced",
    achievements: [
      { id: "a5", title: "Simplex Solver", description: "Complete the simplex method chapter", icon: "medal", isUnlocked: false },
      { id: "a6", title: "Algorithm Expert", description: "Complete 15 exercises", icon: "crown", isUnlocked: false },
    ]
  },
  {
    id: "4",
    title: "DUALITY AND COMPLEMENTARITY",
    description: "Understanding the dual nature of linear programming problems",
    progress: 0,
    isCompleted: false,
    isUnlocked: false,
    subsections: [
      { id: "4.1", title: "DUAL LINEAR PROGRAMS", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "4.2", title: "THE DUALITY THEOREM", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "4.3", title: "RELATIONS TO THE SIMPLEX PROCEDURE", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "4.4", title: "SENSITIVITY AND COMPLEMENTARY SLACKNESS", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "4.5", title: "MAX FLOW–MIN CUT THEOREM", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "4.6", title: "THE DUAL SIMPLEX METHOD", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "4.7", title: "THE PRIMAL-DUAL ALGORITHM", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "4.8", title: "SUMMARY", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "4.9", title: "EXERCISES", progress: 0, isCompleted: false, isUnlocked: false },
    ],
    exercises: 18,
    estimatedTime: "4 hours",
    difficulty: "Advanced",
    achievements: [
      { id: "a7", title: "Duality Expert", description: "Complete the duality chapter", icon: "medal", isUnlocked: false },
      { id: "a8", title: "Theory Master", description: "Complete 20 exercises", icon: "crown", isUnlocked: false },
    ]
  },
  {
    id: "5",
    title: "INTERIOR-POINT METHODS",
    description: "Exploring modern approaches to solving linear programming problems",
    progress: 0,
    isCompleted: false,
    isUnlocked: false,
    subsections: [
      { id: "5.1", title: "ELEMENTS OF COMPLEXITY THEORY", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "5.2", title: "THE SIMPLEX METHOD IS NOT POLYNOMIAL-TIME", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "5.3", title: "THE ELLIPSOID METHOD", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "5.4", title: "THE ANALYTIC CENTER", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "5.5", title: "THE CENTRAL PATH", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "5.6", title: "SOLUTION STRATEGIES", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "5.7", title: "TERMINATION AND INITIALIZATION", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "5.8", title: "SUMMARY", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "5.9", title: "EXERCISES", progress: 0, isCompleted: false, isUnlocked: false },
    ],
    exercises: 15,
    estimatedTime: "4 hours",
    difficulty: "Advanced",
    achievements: [
      { id: "a9", title: "Interior Point Explorer", description: "Complete the interior-point methods chapter", icon: "medal", isUnlocked: false },
      { id: "a10", title: "Modern Methods Master", description: "Complete 25 exercises", icon: "crown", isUnlocked: false },
    ]
  },
  {
    id: "6",
    title: "CONIC LINEAR PROGRAMMING",
    description: "Advanced topics in conic optimization",
    progress: 0,
    isCompleted: false,
    isUnlocked: false,
    subsections: [
      { id: "6.1", title: "CONVEX CONES", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "6.2", title: "CONIC LINEAR PROGRAMMING PROBLEM", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "6.3", title: "FARKAS' LEMMA FOR CONIC LINEAR PROGRAMMING", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "6.4", title: "CONIC LINEAR PROGRAMMING DUALITY", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "6.5", title: "COMPLEMENTARITY AND SOLUTION RANK OF SDP", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "6.6", title: "INTERIOR-POINT ALGORITHMS FOR CONIC LINEAR PROGRAMMING", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "6.7", title: "SUMMARY", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "6.8", title: "EXERCISES", progress: 0, isCompleted: false, isUnlocked: false },
    ],
    exercises: 12,
    estimatedTime: "3 hours",
    difficulty: "Advanced",
    achievements: [
      { id: "a11", title: "Conic Programming Expert", description: "Complete the conic linear programming chapter", icon: "medal", isUnlocked: false },
      { id: "a12", title: "Advanced Theory Master", description: "Complete 30 exercises", icon: "crown", isUnlocked: false },
    ]
  },
  {
    id: "7",
    title: "BASIC PROPERTIES OF SOLUTIONS AND ALGORITHMS",
    description: "Understanding the fundamental properties of unconstrained optimization",
    progress: 0,
    isCompleted: false,
    isUnlocked: false,
    subsections: [
      { id: "7.1", title: "FIRST-ORDER NECESSARY CONDITIONS", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "7.2", title: "EXAMPLES OF UNCONSTRAINED PROBLEMS", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "7.3", title: "SECOND-ORDER CONDITIONS", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "7.4", title: "CONVEX AND CONCAVE FUNCTIONS", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "7.5", title: "MINIMIZATION AND MAXIMIZATION OF CONVEX FUNCTIONS", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "7.6", title: "ZERO-ORDER CONDITIONS", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "7.7", title: "GLOBAL CONVERGENCE OF DESCENT ALGORITHMS", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "7.8", title: "SPEED OF CONVERGENCE", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "7.9", title: "SUMMARY", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "7.10", title: "EXERCISES", progress: 0, isCompleted: false, isUnlocked: false },
    ],
    exercises: 15,
    estimatedTime: "3 hours",
    difficulty: "Intermediate",
    achievements: [
      { id: "a13", title: "Unconstrained Explorer", description: "Complete the unconstrained optimization chapter", icon: "medal", isUnlocked: false },
      { id: "a14", title: "Theory Apprentice", description: "Complete 35 exercises", icon: "crown", isUnlocked: false },
    ]
  },
  {
    id: "8",
    title: "BASIC DESCENT METHODS",
    description: "Learning fundamental algorithms for unconstrained optimization",
    progress: 0,
    isCompleted: false,
    isUnlocked: false,
    subsections: [
      { id: "8.1", title: "LINE SEARCH ALGORITHMS", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "8.2", title: "THE METHOD OF STEEPEST DESCENT", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "8.3", title: "APPLICATIONS OF THE CONVERGENCE THEORY", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "8.4", title: "ACCELERATED STEEPEST DESCENT", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "8.5", title: "NEWTON'S METHOD", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "8.6", title: "COORDINATE DESCENT METHODS", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "8.7", title: "SUMMARY", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "8.8", title: "EXERCISES", progress: 0, isCompleted: false, isUnlocked: false },
    ],
    exercises: 18,
    estimatedTime: "4 hours",
    difficulty: "Intermediate",
    achievements: [
      { id: "a15", title: "Descent Methods Expert", description: "Complete the descent methods chapter", icon: "medal", isUnlocked: false },
      { id: "a16", title: "Algorithm Master", description: "Complete 40 exercises", icon: "crown", isUnlocked: false },
    ]
  },
  {
    id: "9",
    title: "CONJUGATE DIRECTION METHODS",
    description: "Advanced techniques for unconstrained optimization",
    progress: 0,
    isCompleted: false,
    isUnlocked: false,
    subsections: [
      { id: "9.1", title: "CONJUGATE DIRECTIONS", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "9.2", title: "DESCENT PROPERTIES OF THE CONJUGATE DIRECTION METHOD", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "9.3", title: "THE CONJUGATE GRADIENT METHOD", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "9.4", title: "THE C–G METHOD AS AN OPTIMAL PROCESS", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "9.5", title: "THE PARTIAL CONJUGATE GRADIENT METHOD", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "9.6", title: "EXTENSION TO NONQUADRATIC PROBLEMS", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "9.7", title: "PARALLEL TANGENTS", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "9.8", title: "EXERCISES", progress: 0, isCompleted: false, isUnlocked: false },
    ],
    exercises: 15,
    estimatedTime: "3 hours",
    difficulty: "Advanced",
    achievements: [
      { id: "a17", title: "Conjugate Direction Master", description: "Complete the conjugate direction methods chapter", icon: "medal", isUnlocked: false },
      { id: "a18", title: "Advanced Algorithm Expert", description: "Complete 45 exercises", icon: "crown", isUnlocked: false },
    ]
  },
  {
    id: "10",
    title: "QUASI-NEWTON METHODS",
    description: "Efficient algorithms for unconstrained optimization",
    progress: 0,
    isCompleted: false,
    isUnlocked: false,
    subsections: [
      { id: "10.1", title: "MODIFIED NEWTON METHOD", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "10.2", title: "CONSTRUCTION OF THE INVERSE", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "10.3", title: "DAVIDON-FLETCHER-POWELL METHOD", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "10.4", title: "THE BROYDEN FAMILY", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "10.5", title: "CONVERGENCE PROPERTIES", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "10.6", title: "SCALING", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "10.7", title: "MEMORYLESS QUASI-NEWTON METHODS", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "10.8", title: "COMBINATION OF STEEPEST DESCENT AND NEWTON'S METHOD", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "10.9", title: "SUMMARY", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "10.10", title: "EXERCISES", progress: 0, isCompleted: false, isUnlocked: false },
    ],
    exercises: 20,
    estimatedTime: "4 hours",
    difficulty: "Advanced",
    achievements: [
      { id: "a19", title: "Quasi-Newton Expert", description: "Complete the quasi-Newton methods chapter", icon: "medal", isUnlocked: false },
      { id: "a20", title: "Optimization Master", description: "Complete 50 exercises", icon: "crown", isUnlocked: false },
    ]
  },
  {
    id: "11",
    title: "CONSTRAINED MINIMIZATION CONDITIONS",
    description: "Understanding the necessary conditions for constrained optimization",
    progress: 0,
    isCompleted: false,
    isUnlocked: false,
    subsections: [
      { id: "11.1", title: "CONSTRAINTS", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "11.2", title: "TANGENT PLANE", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "11.3", title: "FIRST-ORDER NECESSARY CONDITIONS (EQUALITY CONSTRAINTS)", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "11.4", title: "EXAMPLES", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "11.5", title: "SECOND-ORDER CONDITIONS", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "11.6", title: "EIGENVALUES IN TANGENT SUBSPACE", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "11.7", title: "SENSITIVITY", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "11.8", title: "INEQUALITY CONSTRAINTS", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "11.9", title: "ZERO-ORDER CONDITIONS AND LAGRANGIAN RELAXATION", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "11.10", title: "SUMMARY", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "11.11", title: "EXERCISES", progress: 0, isCompleted: false, isUnlocked: false },
    ],
    exercises: 18,
    estimatedTime: "4 hours",
    difficulty: "Advanced",
    achievements: [
      { id: "a21", title: "Constrained Theory Expert", description: "Complete the constrained minimization conditions chapter", icon: "medal", isUnlocked: false },
      { id: "a22", title: "Theory Master", description: "Complete 55 exercises", icon: "crown", isUnlocked: false },
    ]
  },
  {
    id: "12",
    title: "PRIMAL METHODS",
    description: "Algorithms for solving constrained optimization problems",
    progress: 0,
    isCompleted: false,
    isUnlocked: false,
    subsections: [
      { id: "12.1", title: "ADVANTAGE OF PRIMAL METHODS", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "12.2", title: "FEASIBLE DIRECTION METHODS", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "12.3", title: "ACTIVE SET METHODS", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "12.4", title: "THE GRADIENT PROJECTION METHOD", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "12.5", title: "CONVERGENCE RATE OF THE GRADIENT PROJECTION METHOD", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "12.6", title: "THE REDUCED GRADIENT METHOD", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "12.7", title: "CONVERGENCE RATE OF THE REDUCED GRADIENT METHOD", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "12.8", title: "VARIATIONS", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "12.9", title: "SUMMARY", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "12.10", title: "EXERCISES", progress: 0, isCompleted: false, isUnlocked: false },
    ],
    exercises: 15,
    estimatedTime: "3 hours",
    difficulty: "Advanced",
    achievements: [
      { id: "a23", title: "Primal Methods Expert", description: "Complete the primal methods chapter", icon: "medal", isUnlocked: false },
      { id: "a24", title: "Algorithm Master", description: "Complete 60 exercises", icon: "crown", isUnlocked: false },
    ]
  },
  {
    id: "13",
    title: "PENALTY AND BARRIER METHODS",
    description: "Transforming constrained problems into unconstrained ones",
    progress: 0,
    isCompleted: false,
    isUnlocked: false,
    subsections: [
      { id: "13.1", title: "PENALTY METHODS", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "13.2", title: "BARRIER METHODS", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "13.3", title: "PROPERTIES OF PENALTY AND BARRIER FUNCTIONS", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "13.4", title: "NEWTON'S METHOD AND PENALTY FUNCTIONS", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "13.5", title: "CONJUGATE GRADIENTS AND PENALTY METHODS", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "13.6", title: "NORMALIZATION OF PENALTY FUNCTIONS", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "13.7", title: "PENALTY FUNCTIONS AND GRADIENT PROJECTION", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "13.8", title: "EXACT PENALTY FUNCTIONS", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "13.9", title: "SUMMARY", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "13.10", title: "EXERCISES", progress: 0, isCompleted: false, isUnlocked: false },
    ],
    exercises: 12,
    estimatedTime: "3 hours",
    difficulty: "Advanced",
    achievements: [
      { id: "a25", title: "Penalty Methods Expert", description: "Complete the penalty and barrier methods chapter", icon: "medal", isUnlocked: false },
      { id: "a26", title: "Transformation Master", description: "Complete 65 exercises", icon: "crown", isUnlocked: false },
    ]
  },
  {
    id: "14",
    title: "DUALITY AND DUAL METHODS",
    description: "Understanding the dual nature of constrained optimization",
    progress: 0,
    isCompleted: false,
    isUnlocked: false,
    subsections: [
      { id: "14.1", title: "GLOBAL DUALITY", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "14.2", title: "LOCAL DUALITY", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "14.3", title: "CANONICAL CONVERGENCE RATE OF DUAL STEEPEST ASCENT", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "14.4", title: "SEPARABLE PROBLEMS AND THEIR DUALS", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "14.5", title: "AUGMENTED LAGRANGIAN", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "14.6", title: "THE METHOD OF MULTIPLIERS", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "14.7", title: "THE ALTERNATING DIRECTION METHOD OF MULTIPLIERS", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "14.8", title: "CUTTING PLANE METHODS", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "14.9", title: "EXERCISES", progress: 0, isCompleted: false, isUnlocked: false },
    ],
    exercises: 15,
    estimatedTime: "3 hours",
    difficulty: "Advanced",
    achievements: [
      { id: "a27", title: "Dual Methods Expert", description: "Complete the duality and dual methods chapter", icon: "medal", isUnlocked: false },
      { id: "a28", title: "Duality Master", description: "Complete 70 exercises", icon: "crown", isUnlocked: false },
    ]
  },
  {
    id: "15",
    title: "PRIMAL-DUAL METHODS",
    description: "Combining primal and dual approaches for constrained optimization",
    progress: 0,
    isCompleted: false,
    isUnlocked: false,
    subsections: [
      { id: "15.1", title: "THE STANDARD PROBLEM", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "15.2", title: "A SIMPLE MERIT FUNCTION", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "15.3", title: "BASIC PRIMAL-DUAL METHODS", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "15.4", title: "MODIFIED NEWTON METHODS", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "15.5", title: "DESCENT PROPERTIES", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "15.6", title: "RATE OF CONVERGENCE", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "15.7", title: "PRIMAL-DUAL INTERIOR POINT METHODS", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "15.8", title: "SUMMARY", progress: 0, isCompleted: false, isUnlocked: false },
      { id: "15.9", title: "EXERCISES", progress: 0, isCompleted: false, isUnlocked: false },
    ],
    exercises: 12,
    estimatedTime: "3 hours",
    difficulty: "Advanced",
    achievements: [
      { id: "a29", title: "Primal-Dual Expert", description: "Complete the primal-dual methods chapter", icon: "medal", isUnlocked: false },
      { id: "a30", title: "Optimization Grandmaster", description: "Complete all exercises", icon: "crown", isUnlocked: false },
    ]
  },
]

export default function SyllabusPage() {
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null)
  const [overallProgress, setOverallProgress] = useState(0)
  const [unlockedAchievements, setUnlockedAchievements] = useState(0)
  const [totalAchievements, setTotalAchievements] = useState(0)

  useEffect(() => {
    // Calculate overall progress
    const totalChapters = chapters.length
    const totalProgress = chapters.reduce((sum, chapter) => sum + chapter.progress, 0)
    setOverallProgress(Math.round(totalProgress / totalChapters))

    // Calculate achievements
    let total = 0
    let unlocked = 0
    chapters.forEach(chapter => {
      chapter.achievements.forEach(achievement => {
        total++
        if (achievement.isUnlocked) unlocked++
      })
    })
    setTotalAchievements(total)
    setUnlockedAchievements(unlocked)
  }, [])

  const getAchievementIcon = (icon: string) => {
    switch (icon) {
      case "star":
        return <Star className="h-5 w-5 text-yellow-500" />
      case "trophy":
        return <Trophy className="h-5 w-5 text-amber-500" />
      case "award":
        return <Award className="h-5 w-5 text-blue-500" />
      case "medal":
        return <Medal className="h-5 w-5 text-purple-500" />
      case "crown":
        return <Crown className="h-5 w-5 text-red-500" />
      default:
        return <Star className="h-5 w-5 text-yellow-500" />
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <Link href="/">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <div className="text-center">
          <h1 className="text-3xl font-bold font-serif">Course Syllabus</h1>
          <p className="text-muted-foreground">Interactive learning path for Linear and Nonlinear Programming</p>
        </div>
        <div className="w-24"></div> {/* Spacer for alignment */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="h-5 w-5 text-primary" />
              Course Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Progress</span>
                <span>{overallProgress}%</span>
              </div>
              <Progress value={overallProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Course Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Total Chapters</span>
                <span>{chapters.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Total Exercises</span>
                <span>{chapters.reduce((sum, chapter) => sum + chapter.exercises, 0)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Unlocked</span>
                <span>{unlockedAchievements}/{totalAchievements}</span>
              </div>
              <Progress value={(unlockedAchievements / totalAchievements) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="chapters" className="mb-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chapters">Chapters</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>
        <TabsContent value="chapters" className="space-y-4">
          {chapters.map((chapter) => (
            <Card 
              key={chapter.id} 
              className={`transition-all duration-300 ${selectedChapter === chapter.id ? 'ring-2 ring-primary' : ''}`}
              onClick={() => setSelectedChapter(chapter.id)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    {chapter.isUnlocked ? (
                      <BookOpen className="h-5 w-5 text-primary" />
                    ) : (
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    )}
                    Chapter {chapter.id}: {chapter.title}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant={chapter.difficulty === "Beginner" ? "outline" : chapter.difficulty === "Intermediate" ? "secondary" : "destructive"}>
                      {chapter.difficulty}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {chapter.estimatedTime}
                    </div>
                  </div>
                </div>
                <CardDescription>{chapter.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{chapter.progress}%</span>
                    </div>
                    <Progress value={chapter.progress} className="h-2" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Subsections</h4>
                      <div className="space-y-2">
                        {chapter.subsections.map((subsection) => (
                          <div key={subsection.id} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              {subsection.isCompleted ? (
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                              ) : subsection.isUnlocked ? (
                                <Circle className="h-4 w-4 text-primary" />
                              ) : (
                                <Lock className="h-4 w-4 text-muted-foreground" />
                              )}
                              <Link 
                                href={subsection.isUnlocked ? `/chapters/${subsection.id}` : "#"} 
                                className={subsection.isUnlocked ? "hover:underline" : "text-muted-foreground"}
                                onClick={(e) => e.stopPropagation()}
                              >
                                {subsection.title}
                              </Link>
                            </div>
                            <span className="text-muted-foreground">{subsection.progress}%</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Achievements</h4>
                      <div className="space-y-2">
                        {chapter.achievements.map((achievement) => (
                          <TooltipProvider key={achievement.id}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex items-center gap-2 text-sm">
                                  {achievement.isUnlocked ? (
                                    getAchievementIcon(achievement.icon)
                                  ) : (
                                    <Lock className="h-4 w-4 text-muted-foreground" />
                                  )}
                                  <span className={achievement.isUnlocked ? "" : "text-muted-foreground"}>
                                    {achievement.title}
                                  </span>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{achievement.description}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="h-4 w-4 text-primary" />
                      <span>{chapter.exercises} Exercises</span>
                    </div>
                    <Link 
                      href={chapter.isUnlocked ? `/chapters/${chapter.id}` : "#"} 
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button variant="outline" size="sm" disabled={!chapter.isUnlocked}>
                        {chapter.isUnlocked ? "Start Chapter" : "Locked"}
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="achievements" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {chapters.flatMap(chapter => chapter.achievements).map((achievement, index) => (
              <Card key={index} className={achievement.isUnlocked ? "" : "opacity-50"}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    {achievement.isUnlocked ? getAchievementIcon(achievement.icon) : <Lock className="h-5 w-5 text-muted-foreground" />}
                    {achievement.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 