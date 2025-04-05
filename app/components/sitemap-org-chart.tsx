"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BookOpen,
  Award,
  BarChart2,
  BookMarked,
  Layers,
  BrainCircuit,
  GitBranch,
  Target,
  Settings,
  HelpCircle,
  Info,
  Home,
  Book,
  Target as TargetIcon,
  Trophy,
  ChevronRight,
  ChevronDown,
} from "lucide-react"

export function SitemapOrgChart() {
  const pathname = usePathname()

  const mainSections = [
    {
      title: "Home",
      icon: Home,
      href: "/",
      description: "Welcome to the interactive learning experience",
    },
    {
      title: "Chapters",
      icon: Book,
      href: "/chapters",
      description: "Explore the book chapters",
      subsections: [
        { title: "Linear Programming", href: "/chapters/linear-programming" },
        { title: "Nonlinear Programming", href: "/chapters/nonlinear-programming" },
        { title: "Optimization Techniques", href: "/chapters/optimization-techniques" },
      ],
    },
    {
      title: "Exercises",
      icon: TargetIcon,
      href: "/exercises",
      description: "Practice problems and solutions",
      subsections: [
        { title: "Problem Sets", href: "/exercises/problem-sets" },
        { title: "Interactive Challenges", href: "/exercises/challenges" },
        { title: "Solutions", href: "/exercises/solutions" },
      ],
    },
    {
      title: "Achievements",
      icon: Trophy,
      href: "/achievements",
      description: "Track your learning progress",
    },
  ]

  const resourceSections = [
    {
      title: "Syllabus",
      icon: Layers,
      href: "/syllabus",
      description: "Course outline and objectives",
    },
    {
      title: "Methods",
      icon: BrainCircuit,
      href: "/methods",
      description: "Optimization algorithms and techniques",
    },
    {
      title: "Algorithms",
      icon: GitBranch,
      href: "/algorithms",
      description: "Implementation details and examples",
    },
    {
      title: "Progress",
      icon: BarChart2,
      href: "/progress",
      description: "Your learning analytics",
    },
  ]

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Main Navigation */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold font-serif bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Main Navigation
          </h2>
          <div className="grid gap-4">
            {mainSections.map((section) => {
              const Icon = section.icon
              const isActive = pathname === section.href
              return (
                <div key={section.href} className="glass-card p-4 rounded-lg group">
                  <Link 
                    href={section.href}
                    className={cn(
                      "flex items-start gap-3",
                      isActive ? "text-primary" : "text-foreground hover:text-primary"
                    )}
                  >
                    <div className="mt-1 p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{section.title}</h3>
                        <ChevronRight className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{section.description}</p>
                      
                      {section.subsections && (
                        <div className="mt-3 space-y-2">
                          {section.subsections.map((subsection) => (
                            <Link
                              key={subsection.href}
                              href={subsection.href}
                              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors pl-2 border-l-2 border-primary/20 hover:border-primary/50"
                            >
                              <ChevronDown className="h-3 w-3 rotate-[-90deg]" />
                              {subsection.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>

        {/* Resources */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold font-serif bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Resources
          </h2>
          <div className="grid gap-4">
            {resourceSections.map((section) => {
              const Icon = section.icon
              const isActive = pathname === section.href
              return (
                <div key={section.href} className="glass-card p-4 rounded-lg group">
                  <Link 
                    href={section.href}
                    className={cn(
                      "flex items-start gap-3",
                      isActive ? "text-primary" : "text-foreground hover:text-primary"
                    )}
                  >
                    <div className="mt-1 p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{section.title}</h3>
                        <ChevronRight className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{section.description}</p>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
} 