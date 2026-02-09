"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Search, ChevronDown } from "lucide-react";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 transition-colors duration-300 ${scrolled ? "bg-gray-900/90 backdrop-blur-md" : "bg-transparent"}`}>
      <header className="flex items-center justify-between">
        <Link href="/" aria-label="Gitcoin home">
          <img
            src="/gitcoin-logo.svg"
            alt="Gitcoin"
            className="h-[21px] w-[118px] w-auto"
          />
        </Link>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-gray-700 p-2 text-gray-200 lg:hidden"
          aria-expanded={mobileMenuOpen}
          aria-controls="home-mobile-menu"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          <span className="sr-only">Toggle navigation</span>
          {mobileMenuOpen ? (
            <X className="size-5" />
          ) : (
            <Menu className="size-5" />
          )}
        </button>

        <nav className="hidden items-center gap-8 lg:flex">
          <Link
            href="/about"
            className="flex items-center gap-1 text-base tracking-[0.04em] text-gray-200 font-heading"
          >
            About
            <ChevronDown className="size-3" />
          </Link>
          <Link
            href="/campaigns"
            className="flex items-center gap-1 text-base tracking-[0.04em] text-gray-200 font-heading"
          >
            Campaigns
            <ChevronDown className="size-3" />
          </Link>
          <Link
            href="/research"
            className="text-base tracking-[0.04em] text-gray-200 font-heading"
          >
            Research
          </Link>
          <Link
            href="/apps"
            className="text-base tracking-[0.04em] text-gray-200 font-heading"
          >
            Apps
          </Link>
          <Link
            href="/mechanisms"
            className="text-base tracking-[0.04em] text-gray-200 font-heading"
          >
            Mechanisms
          </Link>
          <Link
            href="/case-studies"
            className="text-base tracking-[0.04em] text-gray-200 font-heading"
          >
            Case Studies
          </Link>
          <Link
            href="/submit"
            className="rounded-[10px] border border-teal-500 px-[14px] py-2 text-base text-teal-500 font-mono"
          >
            Partner with us
          </Link>
        </nav>
      </header>

      {mobileMenuOpen && (
        <nav
          id="home-mobile-menu"
          className="mb-5 space-y-4 rounded-xl border border-gray-700 bg-gray-900/95 p-4 lg:hidden"
        >
          {[
            ["About", "/about"],
            ["Campaigns", "/campaigns"],
            ["Research", "/research"],
            ["Apps", "/apps"],
            ["Mechanisms", "/mechanisms"],
            ["Case Studies", "/case-studies"],
          ].map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="block text-gray-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/submit"
            className="block rounded-[10px] border border-teal-500 px-3 py-2 text-center text-teal-500 font-mono"
            onClick={() => setMobileMenuOpen(false)}
          >
            Partner with us
          </Link>
        </nav>
      )}
    </div>
  );
}
