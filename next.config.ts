import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: "images.unsplash.com" }],
  },

  // Skip type-checking during build — run tsc separately in CI/lint
  typescript: { ignoreBuildErrors: true },

  // Prevent large packages from being bundled into serverless functions
  serverExternalPackages: ["three", "@react-three/fiber", "@react-three/drei", "pg"],

  outputFileTracingExcludes: {
    "**": [
      "public/content-images/**",
      "node_modules/three/**",
      "node_modules/@react-three/**",
    ],
  },

  async redirects() {
    return [
      {
        source: "/whitepaper",
        destination: "/research",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/generator",
        destination: "https://octaviaan.github.io/Chladni-Particles/",
      },
      // gitcoin.co rewrites
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
