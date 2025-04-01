"use client"

import { useEffect, useRef } from "react"

interface MathComponentProps {
  expression: string
}

export function MathComponent({ expression }: MathComponentProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // In a real implementation, this would use a library like KaTeX or MathJax
    // to render the mathematical expressions

    // For this demo, we're just displaying the LaTeX expression
    if (containerRef.current) {
      containerRef.current.textContent = expression
    }

    // In a real implementation with MathJax, it would look something like:
    // if (window.MathJax && containerRef.current) {
    //   window.MathJax.typesetPromise([containerRef.current])
    // }
  }, [expression])

  return <div ref={containerRef} className="math-expression py-1 font-serif text-center" />
}

