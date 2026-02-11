import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com"],
  },
  async rewrites() {
    return [
      // gitcoin.co rewrites
      //  redo - high priority
      {
        source: "/about",
        destination: "https://www.gitcoin.co/about",
      },
      // medium - on webflow 
      {
        source: "/blog",
        destination: "https://www.gitcoin.co/blog",
      },
      // redo 
      {
        source: "/program",
        destination: "https://www.gitcoin.co/program",
      },
      // update 
      {
        source: "/whitepaper",
        destination: "https://www.gitcoin.co/whitepaper",
      },
      
      {
        source: "/updates",
        destination: "https://www.gitcoin.co/updates",
      },

      // redo 
      {
        source: "/brand",
        destination: "https://www.gitcoin.co/brand",
      },
     
      // redo
      {
        source: "/partner",
        destination: "https://www.gitcoin.co/partner",
      },
      // redo
      {
        source: "/privacy",
        destination: "https://www.gitcoin.co/privacy-policy",
      },
      // redo
      {
        source: "/terms",
        destination: "https://www.gitcoin.co/terms",
      },

      // impact.gitcoin.co rewrites

      // redo - high priority
      {
        source: "/impact",
        destination: "https://impact.gitcoin.co",
      },
      {
        source: "/impact/:path*",
        destination: "https://impact.gitcoin.co/impact/:path*",
      },
    ];
  },
};

export default nextConfig;
