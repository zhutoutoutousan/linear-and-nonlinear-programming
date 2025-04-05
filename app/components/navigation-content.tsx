"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  Award,
  BarChart2,
  BookMarked,
  Layers,
  BrainCircuit,
  GitBranch,
  Target,
  Share2,
  Boxes,
  Menu,
  Settings,
  HelpCircle,
  Info,
  ChevronRight,
  ChevronLeft,
  Home,
  Book,
  Target as TargetIcon,
  Trophy,
} from "lucide-react"

interface NavigationContentProps {
  type: "left" | "right"
}

export function NavigationContent({ type }: NavigationContentProps) {
  const pathname = usePathname()

  const mainLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/chapters", label: "Chapters", icon: Book },
    { href: "/exercises", label: "Exercises", icon: TargetIcon },
    { href: "/achievements", label: "Achievements", icon: Trophy },
  ]

  const secondaryLinks = [
    { href: "/syllabus", label: "Syllabus", icon: Layers },
    { href: "/methods", label: "Methods", icon: BrainCircuit },
    { href: "/algorithms", label: "Algorithms", icon: GitBranch },
    { href: "/progress", label: "Progress", icon: BarChart2 },
  ]

  const utilityLinks = [
    { href: "/settings", label: "Settings", icon: Settings },
    { href: "/help", label: "Help", icon: HelpCircle },
    { href: "/about", label: "About", icon: Info },
  ]

  const links = type === "left" ? mainLinks : secondaryLinks

  return (
    <div className="flex flex-col gap-4">
      {type === "right" && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground px-2">
            Quick Navigation
          </h3>
          <nav className="space-y-1">
            {mainLinks.map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    pathname === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-background/50 hover:text-primary"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                  <ChevronLeft className="h-4 w-4 ml-auto" />
                </Link>
              )
            })}
          </nav>
        </div>
      )}

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground px-2">
          {type === "left" ? "Main Navigation" : "Additional Resources"}
        </h3>
        <nav className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  pathname === link.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-background/50 hover:text-primary"
                )}
              >
                <Icon className="h-4 w-4" />
                {link.label}
                {type === "left" ? (
                  <ChevronRight className="h-4 w-4 ml-auto" />
                ) : (
                  <ChevronLeft className="h-4 w-4 ml-auto" />
                )}
              </Link>
            )
          })}
        </nav>
      </div>

      {type === "right" && (
        <div className="space-y-2 mt-4">
          <h3 className="text-sm font-medium text-muted-foreground px-2">
            Utilities
          </h3>
          <nav className="space-y-1">
            {utilityLinks.map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    pathname === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-background/50 hover:text-primary"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                  <ChevronLeft className="h-4 w-4 ml-auto" />
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </div>
  )
} 