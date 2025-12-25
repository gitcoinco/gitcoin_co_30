import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: {
    default: 'Gitcoin - Ethereum\'s Funding App Store',
    template: '%s | Gitcoin',
  },
  description: 'The trusted directory and reference library for Ethereum public goods funding. Discover funding mechanisms, platforms, and learn what works.',
  keywords: ['Ethereum', 'public goods', 'funding', 'grants', 'quadratic funding', 'DAO', 'Web3'],
  authors: [{ name: 'Gitcoin' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://gitcoin.co',
    siteName: 'Gitcoin',
    title: 'Gitcoin - Ethereum\'s Funding App Store',
    description: 'The trusted directory and reference library for Ethereum public goods funding.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gitcoin - Ethereum\'s Funding App Store',
    description: 'The trusted directory and reference library for Ethereum public goods funding.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
