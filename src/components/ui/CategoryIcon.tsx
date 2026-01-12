'use client'

import { useEffect, useState } from 'react'

interface CategoryIconProps {
  src: string
  alt: string
  className?: string
}

export default function CategoryIcon({ src, alt, className = '' }: CategoryIconProps) {
  const [svgContent, setSvgContent] = useState<string>('')

  useEffect(() => {
    fetch(src)
      .then((res) => res.text())
      .then((svg) => {
        // Remove width and height attributes so Tailwind classes can control dimensions
        const processedSvg = svg
          .replace(/\s+width="[^"]*"/gi, '')
          .replace(/\s+height="[^"]*"/gi, '')
        setSvgContent(processedSvg)
      })
      .catch((err) => console.error('Failed to load SVG:', err))
  }, [src])

  if (!svgContent) {
    return <div className={className} />
  }

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  )
}
