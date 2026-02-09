import type { Metadata } from "next";
import localFont from "next/font/local";
import {
  BBH_Bartle,
  IBM_Plex_Mono,
  Inter,
  Source_Serif_4,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const bdoGrotesk = localFont({
  src: [
    { path: "../../public/assets/fonts/BDOGrotesk-Light.woff2", weight: "300" },
    { path: "../../public/assets/fonts/BDOGrotesk-Regular.woff2", weight: "400" },
    { path: "../../public/assets/fonts/BDOGrotesk-Medium.woff2", weight: "500" },
    { path: "../../public/assets/fonts/BDOGrotesk-DemiBold.woff2", weight: "600" },
    { path: "../../public/assets/fonts/BDOGrotesk-Bold.woff2", weight: "700" },
    { path: "../../public/assets/fonts/BDOGrotesk-ExtraBold.woff2", weight: "800" },
    { path: "../../public/assets/fonts/BDOGrotesk-Black.woff2", weight: "900" },
  ],
  variable: "--font-heading",
  display: "swap",
});

const ibm_plex_mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

const source_serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
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
    <html
      lang="en"
      className={`${inter.variable} ${bdoGrotesk.variable} ${source_serif.variable} ${ibm_plex_mono.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
