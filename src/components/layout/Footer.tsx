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
    <footer className="bg-charcoal border-t border-dark-gray">
      <div className="container-page py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Directory */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-light-white">Directory</h3>
            <ul className="space-y-3">
              {navigation.directory.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-muted-gray hover:text-light-white transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-light-white">Resources</h3>
            <ul className="space-y-3">
              {navigation.resources.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-muted-gray hover:text-light-white transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosystem */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-light-white">Ecosystem</h3>
            <ul className="space-y-3">
              {navigation.ecosystem.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-gray hover:text-light-white transition-colors duration-300"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-light-white">Stay Updated</h3>
            <p className="text-muted-gray text-sm mb-4">
              Get the latest on Ethereum funding mechanisms and ecosystem updates.
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg bg-dark-gray border border-muted-gray/30 text-light-white placeholder:text-muted-gray focus:outline-none focus:ring-2 focus:ring-light-white focus:border-transparent transition-all duration-200"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-light-white text-void-black font-medium rounded-lg hover:bg-muted-gray transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider with stars */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-dark-gray"></div>
          <span className="text-muted-gray text-sm">☆ &nbsp; ☆ &nbsp; ☆</span>
          <div className="flex-1 h-px bg-dark-gray"></div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center">
            <img
              src="/gitcoin-logo.png"
              alt="Gitcoin"
              className="h-6 w-auto invert brightness-0 invert"
            />
          </div>

          <p className="text-muted-gray text-sm italic font-serif">
            Fund What Matters
          </p>

          <div className="flex items-center gap-4">
            {navigation.social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-gray hover:text-light-white transition-colors duration-300"
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
