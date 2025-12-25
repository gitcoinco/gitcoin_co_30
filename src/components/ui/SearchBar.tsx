'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface SearchBarProps {
  placeholder?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function SearchBar({
  placeholder = 'Search apps, mechanisms, case studies...',
  size = 'md',
  className = '',
}: SearchBarProps) {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const sizes = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-5 text-base',
    lg: 'py-4 px-6 text-lg',
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <Search className={`absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary ${iconSizes[size]}`} />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className={`
          w-full rounded-xl border border-lichenpunk-warmGray bg-white
          text-text-primary placeholder:text-text-secondary/60
          focus:outline-none focus:ring-2 focus:ring-gitcoin-green focus:border-transparent
          ${sizes[size]}
          pl-12
        `}
      />
    </form>
  )
}
