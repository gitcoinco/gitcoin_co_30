import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'

interface FeaturedSectionProps {
  title: string
  description: string
  href: string
  linkText: string
  children: ReactNode
  bgClassName?: string
  gridClassName?: string
}

export default function FeaturedSection({
  title,
  description,
  href,
  linkText,
  children,
  bgClassName = 'bg-void-black',
  gridClassName = 'grid md:grid-cols-2 lg:grid-cols-3 gap-6',
}: FeaturedSectionProps) {
  return (
    <section className={`section ${bgClassName}`}>
      <div className="container-page">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-light-white mb-2">
              {title}
            </h2>
            <p className="text-muted-gray">
              {description}
            </p>
          </div>
          <Link
            href={href}
            className="hidden md:flex items-center gap-2 text-light-white hover:text-muted-gray transition-colors font-medium"
          >
            {linkText}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className={gridClassName}>
          {children}
        </div>
        <Link
          href={href}
          className="md:hidden flex items-center justify-center gap-2 mt-6 text-light-white hover:text-muted-gray transition-colors font-medium"
        >
          {linkText}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  )
}
