'use client'

import { useEffect, useState } from 'react'

export default function HeroBackground() {
  const [scrollY, setScrollY] = useState(0)

  // Generate stars with varied properties
  const [stars] = useState(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 70,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.3,
      speed: Math.random() * 0.3 + 0.1,
    }))
  )

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Stars with parallax */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-light-white"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            transform: `translateY(${scrollY * star.speed}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        />
      ))}

      {/* Crescent Moon with parallax */}
      <svg
        className="absolute w-12"
        style={{
          top: '10%',
          left: '10%',
          opacity: 0.9,
          transform: `translateY(${scrollY * 0.15}px)`,
          transition: 'transform 0.1s ease-out',
        }}
        viewBox="0 0 50 50"
      >
        <defs>
          <mask id="moonMask">
            <circle cx="25" cy="25" r="20" fill="white" />
            <circle cx="35" cy="22" r="17" fill="black" />
          </mask>
        </defs>
        <circle cx="25" cy="25" r="20" fill="white" mask="url(#moonMask)" />
      </svg>

      {/* Rolling Hills with Hatching Pattern */}
      <svg
        className="absolute bottom-0 left-0 w-full h-[45%]"
        viewBox="0 0 1440 400"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <pattern id="hatch1" patternUnits="userSpaceOnUse" width="4" height="4" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="4" stroke="white" strokeWidth="0.8" />
          </pattern>
          <pattern id="hatch2" patternUnits="userSpaceOnUse" width="5" height="5" patternTransform="rotate(35)">
            <line x1="0" y1="0" x2="0" y2="5" stroke="white" strokeWidth="0.6" />
          </pattern>
          <pattern id="hatch3" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(55)">
            <line x1="0" y1="0" x2="0" y2="6" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <path
          d="M-50 400 L-50 280 Q200 220 500 260 Q800 300 1100 240 Q1300 200 1490 230 L1490 400 Z"
          fill="url(#hatch3)"
          opacity="0.2"
        />
        <path
          d="M-50 400 L-50 310 Q150 260 400 290 Q650 320 900 270 Q1150 220 1490 270 L1490 400 Z"
          fill="url(#hatch2)"
          opacity="0.35"
        />
        <path
          d="M-50 400 L-50 340 Q200 300 450 330 Q700 360 950 310 Q1200 260 1490 300 L1490 400 Z"
          fill="url(#hatch1)"
          opacity="0.5"
        />
      </svg>
    </div>
  )
}
