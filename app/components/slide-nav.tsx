"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Drawer } from "./drawer"
import { NavigationContent } from "./navigation-content"

export function SlideNav() {
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false)
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false)

  return (
    <>
      {/* Left Edge Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setLeftDrawerOpen(true)}
        className={cn(
          "fixed left-0 top-1/2 -translate-y-1/2 z-50",
          "h-12 w-6 rounded-r-lg rounded-l-none",
          "bg-background/30 backdrop-blur-sm",
          "hover:bg-primary/20 hover:w-8 transition-all duration-300",
          "border-r border-white/10",
          "shadow-[0_0_15px_rgba(var(--primary),0.3)]",
          "group",
          "animate-pulse-slow"
        )}
      >
        <ChevronRight className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
      </Button>

      {/* Right Edge Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setRightDrawerOpen(true)}
        className={cn(
          "fixed right-0 top-1/2 -translate-y-1/2 z-50",
          "h-12 w-6 rounded-l-lg rounded-r-none",
          "bg-background/30 backdrop-blur-sm",
          "hover:bg-primary/20 hover:w-8 transition-all duration-300",
          "border-l border-white/10",
          "shadow-[0_0_15px_rgba(var(--primary),0.3)]",
          "group",
          "animate-pulse-slow"
        )}
      >
        <ChevronLeft className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
      </Button>

      {/* Left Drawer */}
      <Drawer
        isOpen={leftDrawerOpen}
        onClose={() => setLeftDrawerOpen(false)}
        position="left"
      >
        <NavigationContent type="left" />
      </Drawer>

      {/* Right Drawer */}
      <Drawer
        isOpen={rightDrawerOpen}
        onClose={() => setRightDrawerOpen(false)}
        position="right"
      >
        <NavigationContent type="right" />
      </Drawer>
    </>
  )
} 