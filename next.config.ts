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
        destination: "https://app.gitcoin.co/about",
      },
      // medium - on webflow 
      {
        source: "/blog",
        destination: "https://app.gitcoin.co/blog",
      },
      // redo 
      {
        source: "/program",
        destination: "https://app.gitcoin.co/program",
      },
      // update 
      {
        source: "/whitepaper",
        destination: "https://app.gitcoin.co/whitepaper",
      },
      
      {
        source: "/updates",
        destination: "https://app.gitcoin.co/updates",
      },

      // redo 
      {
        source: "/brand",
        destination: "https://app.gitcoin.co/brand",
      },
     
      // redo
      {
        source: "/partner",
        destination: "https://app.gitcoin.co/partner",
      },
      // redo
      {
        source: "/privacy",
        destination: "https://app.gitcoin.co/privacy-policy",
      },
      // redo
      {
        source: "/terms",
        destination: "https://app.gitcoin.co/terms",
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
