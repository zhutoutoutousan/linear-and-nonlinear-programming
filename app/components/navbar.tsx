import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-8">
        <Link href="/" className="font-serif text-xl font-bold">
          Linear and Nonlinear Programming
        </Link>
        <div className="ml-auto flex items-center space-x-6">
          <Link href="/chapters/list">
            <Button variant="ghost">Chapters</Button>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
} 