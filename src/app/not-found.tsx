import Link from 'next/link'
import { Home, Search, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-lichenpunk-offWhite flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="text-8xl font-bold text-lichenpunk-warmGray mb-4">404</div>
        <h1 className="text-2xl font-bold text-text-primary mb-4">
          Page Not Found
        </h1>
        <p className="text-text-secondary mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Try searching or head back to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button href="/" variant="primary">
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Button>
          <Button href="/search" variant="secondary">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
      </div>
    </div>
  )
}
