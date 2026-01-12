import type { Metadata } from "next";
import { BBH_Bartle, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const bbh_bartle = BBH_Bartle({
  variable: "--font-heading",
  weight: "400"
});

const space_grotesk = Space_Grotesk({
  variable: "--font-mono",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Gitcoin - Fund What Matters",
    template: "%s | Gitcoin",
  },
  description:
    "The trusted directory and reference library for Ethereum public goods funding. Discover funding mechanisms, platforms, and learn what works.",
  keywords: [
    "Ethereum",
    "public goods",
    "funding",
    "grants",
    "quadratic funding",
    "DAO",
    "Web3",
  ],
  authors: [{ name: "Gitcoin" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://explore.gitcoin.co",
    siteName: "Gitcoin",
    title: "Gitcoin - Fund What Matters",
    description:
      "The trusted directory and reference library for Ethereum public goods funding.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gitcoin - Fund What Matters",
    description:
      "The trusted directory and reference library for Ethereum public goods funding.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${bbh_bartle.variable} ${space_grotesk.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
