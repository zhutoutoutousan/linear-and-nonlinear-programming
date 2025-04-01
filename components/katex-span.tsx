'use client';

import renderMathInElement from 'katex/dist/contrib/auto-render';
import 'katex/dist/katex.min.css';
import { useEffect, useRef } from 'react';

interface KatexSpanProps {
  text: string;
  className?: string;
}

export default function KatexSpan({ text, className = '' }: KatexSpanProps) {
  const katexTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (katexTextRef.current) {
      renderMathInElement(katexTextRef.current, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
        ],
      });
    }
  }, [text]);

  return (
    <div ref={katexTextRef} className={className}>
      {text}
    </div>
  );
} 