import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "raw.githubusercontent.com" },
      // GitHub-hosted issue attachment images (used in preview page)
      { protocol: "https", hostname: "user-images.githubusercontent.com" },
      { protocol: "https", hostname: "*.githubusercontent.com" },
      { protocol: "https", hostname: "github-production-user-asset-*.s3.amazonaws.com" },
    ],
  },

  // Prevent large packages from being bundled into serverless functions
  serverExternalPackages: ["three", "@react-three/fiber", "@react-three/drei"],

  experimental: {
    // outputFileTracingExcludes is valid but missing from the TS types
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...({
      outputFileTracingExcludes: {
        // Exclude the banner images and three.js from all serverless function
        // bundles — they are served as static files and don't need to be
        // bundled into functions like opengraph-image routes
        "**": [
          "public/content-images/**",
          "node_modules/three/**",
          "node_modules/@react-three/**",
        ],
      },
    } as any),
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
        source: "/generator/:path*",
        destination: "https://octaviaan.github.io/Chladni-Particles/:path*",
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
