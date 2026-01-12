"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { Button } from "../ui";

const navigation = [
  { name: "Apps", href: "/apps" },
  { name: "Mechanisms", href: "/mechanisms" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Research", href: "/research" },
  { name: "Campaigns", href: "/campaigns" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-void-black border-b border-dark-gray sticky top-0 z-50">
      <nav className="container-page" aria-label="Global">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <img
                src="/gitcoin-logo.png"
                alt="Gitcoin"
                className="h-8 w-auto invert brightness-0 invert"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-muted-gray hover:text-light-white transition-colors duration-300 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex md:items-center md:gap-4">
            <Link
              href="/search"
              className="p-2 text-muted-gray hover:text-light-white transition-colors duration-300"
            >
              <Search className="w-5 h-5" />
            </Link>
            <Button href="/submit" variant="primary">
              Submit Content
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="p-2 text-muted-gray hover:text-light-white transition-colors"
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
          <div className="md:hidden py-4 border-t border-dark-gray">
            <div className="flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-muted-gray hover:text-light-white transition-colors font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <hr className="border-dark-gray" />
              <Link
                href="/search"
                className="flex items-center gap-2 text-muted-gray hover:text-light-white transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Search className="w-5 h-5" />
                Search
              </Link>
              <Button
                href="/submit"
                variant="primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Submit Content
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
