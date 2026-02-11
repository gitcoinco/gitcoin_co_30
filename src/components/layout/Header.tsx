"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Button, SearchBar } from "../ui";

type DropdownItem = {
  label: string;
  href: string;
  external?: boolean;
};

const aboutItems: DropdownItem[] = [
  { label: "History", href: "/about" },
  { label: "Impact", href: "/impact" },
  {
    label: "Grants Program",
    href: "https://www.gitcoin.co/grants",
    external: true,
  },
];

const campaignItems: DropdownItem[] = [
  { label: "GG25", href: "/campaigns/gg25" },
  { label: "All", href: "/campaigns" },
];

const navLinks = [
  { label: "Research", href: "/research" },
  { label: "Apps", href: "/apps" },
  { label: "Mechanisms", href: "/mechanisms" },
  { label: "Case Studies", href: "/case-studies" },
];

const navLinkClass =
  "text-sm text-gray-200 font-heading font-semibold flex-shrink-0 transition-colors hover:text-gray-25";

const dropdownContentClass =
  "z-50 bg-gray-900 rounded-xl mt-3 min-w-[180px] py-1 space-y-0 origin-top-left animate-[dropdown-in_150ms_ease-out] data-[state=closed]:animate-[dropdown-out_100ms_ease-in]";

const dropdownItemClass =
  "block px-4 py-2 text-sm text-gray-200 outline-none hover:text-gray-25 transition-colors cursor-pointer border-b border-dashed border-gray-600 last:border-b-0 [border-image:repeating-linear-gradient(to_right,theme(colors.gray.600)_0,theme(colors.gray.600)_8px,transparent_8px,transparent_16px)_1]";

function NavDropdown({
  label,
  items,
}: {
  label: string;
  items: DropdownItem[];
}) {
  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className={`group flex cursor-pointer items-center gap-1 outline-none ${navLinkClass}`}
        >
          {label}
          <ChevronDown className="size-3 transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={dropdownContentClass}
          sideOffset={8}
          align="start"
        >
          {items.map((item) => (
            <DropdownMenu.Item
              key={item.label}
              asChild
              className={dropdownItemClass}
            >
              {item.external ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  {item.label}
                </a>
              ) : (
                <Link href={item.href}>{item.label}</Link>
              )}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

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
    <div
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-8 py-4 transition-colors duration-300 ${scrolled ? "bg-gray-900/90 backdrop-blur-md" : "bg-transparent"}`}
    >
      <header className="flex items-center justify-between">
        <Link href="/" aria-label="Gitcoin home">
          <img
            src="/gitcoin-logo.svg"
            alt="Gitcoin"
            className="h-[21px] w-auto"
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
          <NavDropdown label="About" items={aboutItems} />
          <NavDropdown label="Campaigns" items={campaignItems} />
          {navLinks.map(({ label, href }) => (
            <Link key={href} href={href} className={navLinkClass}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-8 lg:flex">
          <SearchBar placeholder="Search..." size="sm" className="w-48" />
          <Button variant="secondary" href="/submit" size="sm">
            Partner with us
          </Button>
        </div>
      </header>

      {mobileMenuOpen && (
        <nav
          id="home-mobile-menu"
          className="mb-5 space-y-4 rounded-xl border border-gray-700 bg-gray-900/95 p-4 lg:hidden"
        >
          {[
            { heading: "About", items: aboutItems },
            { heading: "Campaigns", items: campaignItems },
          ].map(({ heading, items }) => (
            <div key={heading} className="space-y-2">
              <p className="text-sm font-semibold text-gray-400">{heading}</p>
              {items.map((item) =>
                item.external ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block pl-3 text-gray-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block pl-3 text-gray-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </div>
          ))}
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`block ${navLinkClass}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Button
            variant="secondary"
            href="/submit"
            size="sm"
            onClick={() => setMobileMenuOpen(false)}
          >
            Partner with us
          </Button>
        </nav>
      )}
    </div>
  );
}
