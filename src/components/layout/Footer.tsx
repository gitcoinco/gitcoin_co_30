"use client";

import Link from "next/link";
import {
  Twitter,
  Github,
  Youtube,
  MessageSquare,
  type LucideIcon,
} from "lucide-react";
import ChladniBackground from "@/components/ChladniBackground";

type FooterLink = {
  title: string;
  href: string;
  external?: boolean;
};

type SocialLink = {
  title: string;
  href: string;
  icon: LucideIcon;
};

const socialLinks: SocialLink[] = [
  { title: "X", href: "https://x.com/gitcoin", icon: Twitter },
  { title: "GitHub", href: "https://github.com/gitcoinco", icon: Github },
  { title: "YouTube", href: "https://www.youtube.com/gitcoin", icon: Youtube },
  { title: "Discourse", href: "https://gov.gitcoin.co", icon: MessageSquare },
];

const exploreLinks: FooterLink[] = [
  { title: "Campaigns", href: "/campaigns" },
  { title: "Research", href: "/research" },
  { title: "Apps", href: "/apps" },
  { title: "Mechanisms", href: "/mechanisms" },
  { title: "Case Studies", href: "/case-studies" },
];

const resourceLinks: FooterLink[] = [
  { title: "Impact", href: "https://impact.gitcoin.co", external: true },
  {
    title: "Grants Program",
    href: "https://grants.gitcoin.co",
    external: true,
  },
  {
    title: "Greenpill Podcast",
    href: "https://greenpill.network",
    external: true,
  },
  { title: "Forum", href: "https://gov.gitcoin.co", external: true },
  {
    title: "Rainbow Paper",
    href: "https://www.dropbox.com/scl/fi/2ew20lb31kz62cd87g3dc/Owocki-Scheling-Point_Nov102025-b.pdf?rlkey=pw1jgsemym4tu34hol8egnt0y&e=2&st=636ugx92&dl=0",
    external: true,
  },
];

const communityLinks: FooterLink[] = [
  { title: "Contribute", href: "/submit" },
  { title: "Guidelines", href: "/contribute" },
  { title: "Telegram", href: "https://t.me/+TIzf8MYT7DY0YWVh", external: true },
  { title: "Get Updates", href: "/updates" },
];

const bottomLinks: FooterLink[] = [
  { title: "Privacy", href: "/privacy" },
  { title: "Terms", href: "/terms" },
  { title: "Contact", href: "/partner" },
];

function FooterLinkItem({ link }: { link: FooterLink }) {
  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer">
        {link.title}
      </a>
    );
  }
  return <Link href={link.href}>{link.title}</Link>;
}

function FooterLinkGroup({
  title,
  links,
}: {
  title: string;
  links: FooterLink[];
}) {
  return (
    <div>
      <h4 className="text-base font-semibold">{title}</h4>
      <div className="mt-4 flex flex-col gap-2 text-sm text-gray-200">
        {links.map((link) => (
          <FooterLinkItem key={link.title} link={link} />
        ))}
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      <ChladniBackground variant="2" opacity={0.35} />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gray-900 to-transparent z-[1]" />
      <div className="relative z-10 mx-auto w-full max-w-[1216px] px-4 py-14 sm:px-6 lg:px-0">
        <div className="grid gap-10 lg:grid-cols-[2.2fr_1fr_1fr_1fr]">
          <div>
            <img src="/gitcoin-logo.svg" alt="Gitcoin" className="h-6 w-auto" />
            <p className="mt-4 max-w-[348px] text-sm text-gray-200">
              The premier place where Ethereum funds solutions to its most
              important problems. We curate the funding landscape so you
              don&apos;t have to.
            </p>
            <div className="mt-5 flex items-center gap-4">
              {socialLinks.map(({ title, href, icon: Icon }) => (
                <a
                  key={title}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={title}
                >
                  <Icon className="h-4 w-4 text-gray-200 hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          <FooterLinkGroup title="Explore" links={exploreLinks} />
          <FooterLinkGroup title="Resources" links={resourceLinks} />
          <FooterLinkGroup title="Community" links={communityLinks} />
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-gray-500 pt-4 text-sm text-gray-300 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 Gitcoin. Fund what matters.</p>
          <div className="flex items-center gap-6">
            {bottomLinks.map((link) => (
              <Link key={link.title} href={link.href}>
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
