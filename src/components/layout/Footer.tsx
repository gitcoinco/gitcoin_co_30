import Link from 'next/link'
import { Twitter, Github, MessageCircle } from 'lucide-react'

const navigation = {
  directory: [
    { name: 'Apps', href: '/apps' },
    { name: 'Mechanisms', href: '/mechanisms' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Research', href: '/research' },
    { name: 'Campaigns', href: '/campaigns' },
  ],
  resources: [
    { name: 'Submit Content', href: '/submit' },
    { name: 'Contribution Guide', href: '/contribute' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
  ecosystem: [
    { name: 'Grants Stack', href: 'https://grants.gitcoin.co' },
    { name: 'Passport', href: 'https://passport.gitcoin.co' },
    { name: 'Allo Protocol', href: 'https://allo.gitcoin.co' },
    { name: 'Greenpill Podcast', href: 'https://greenpill.network' },
  ],
  social: [
    { name: 'Twitter', href: 'https://twitter.com/gitcoin', icon: Twitter },
    { name: 'GitHub', href: 'https://github.com/gitcoinco', icon: Github },
    { name: 'Discord', href: 'https://discord.gg/gitcoin', icon: MessageCircle },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-lichenpunk-lichen text-white">
      <div className="container-page py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Directory */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Directory</h3>
            <ul className="space-y-3">
              {navigation.directory.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              {navigation.resources.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosystem */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Ecosystem</h3>
            <ul className="space-y-3">
              {navigation.ecosystem.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Stay Updated</h3>
            <p className="text-white/80 text-sm mb-4">
              Get the latest on Ethereum funding mechanisms and ecosystem updates.
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-gitcoin-green"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gitcoin-green text-text-primary font-medium rounded-lg hover:bg-gitcoin-softCyan transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gitcoin-green flex items-center justify-center">
              <span className="text-text-primary font-bold text-lg">G</span>
            </div>
            <span className="text-lg font-semibold">Gitcoin</span>
          </div>

          <p className="text-white/60 text-sm">
            Ethereum&apos;s Funding App Store. Building public goods since 2017.
          </p>

          <div className="flex items-center gap-4">
            {navigation.social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
