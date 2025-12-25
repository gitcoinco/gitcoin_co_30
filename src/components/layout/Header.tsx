'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Search, ChevronDown } from 'lucide-react'

const navigation = [
  { name: 'Apps', href: '/apps' },
  { name: 'Mechanisms', href: '/mechanisms' },
  { name: 'Case Studies', href: '/case-studies' },
  { name: 'Research', href: '/research' },
  { name: 'Campaigns', href: '/campaigns' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-lichenpunk-warmGray sticky top-0 z-50">
      <nav className="container-page" aria-label="Global">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gitcoin-green flex items-center justify-center">
                <span className="text-text-primary font-bold text-lg">G</span>
              </div>
              <span className="text-xl font-semibold text-text-primary">Gitcoin</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-text-secondary hover:text-text-primary transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex md:items-center md:gap-4">
            <Link href="/search" className="p-2 text-text-secondary hover:text-text-primary transition-colors">
              <Search className="w-5 h-5" />
            </Link>
            <Link href="/submit" className="btn-primary text-sm">
              Submit Content
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="p-2 text-text-secondary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-lichenpunk-warmGray">
            <div className="flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-text-secondary hover:text-text-primary transition-colors font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <hr className="border-lichenpunk-warmGray" />
              <Link
                href="/search"
                className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Search className="w-5 h-5" />
                Search
              </Link>
              <Link
                href="/submit"
                className="btn-primary text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Submit Content
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
