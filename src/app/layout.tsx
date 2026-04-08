import type { Metadata } from "next";
import { siteTitle, siteDescription } from "@/lib/page-seo";
import localFont from "next/font/local";
import { IBM_Plex_Mono, Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SearchProvider from "@/components/search/SearchProvider";
import SearchModal from "@/components/search/SearchModal";
import AIChatSidebar from "@/components/search/AIChatSidebar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const bdoGrotesk = localFont({
  src: [
    { path: "../../public/assets/fonts/BDOGrotesk-Light.woff2", weight: "300" },
    {
      path: "../../public/assets/fonts/BDOGrotesk-Regular.woff2",
      weight: "400",
    },
    {
      path: "../../public/assets/fonts/BDOGrotesk-Medium.woff2",
      weight: "500",
    },
    {
      path: "../../public/assets/fonts/BDOGrotesk-DemiBold.woff2",
      weight: "600",
    },
    { path: "../../public/assets/fonts/BDOGrotesk-Bold.woff2", weight: "700" },
    {
      path: "../../public/assets/fonts/BDOGrotesk-ExtraBold.woff2",
      weight: "800",
    },
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
    default: siteTitle,
    template: "%s | Gitcoin",
  },
  description: siteDescription,
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
  alternates: {
    canonical: "https://gitcoin.co",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gitcoin.co",
    siteName: "Gitcoin",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "https://gitcoin.co/opengraph-image.jpg",
        width: 1920,
        height: 1080,
        alt: siteTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["https://gitcoin.co/opengraph-image.jpg"],
    site: "@gitcoin",
    creator: "@gitcoin",
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
        <SearchProvider>
          <Header />
          <main className="flex-grow pt-[72px]">{children}</main>
          <Footer />
          <SearchModal />
          <AIChatSidebar />
        </SearchProvider>
      </body>
      <GoogleAnalytics gaId="G-MYMQNTYY27" />
    </html>
  );
}
