import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "raw.githubusercontent.com" },
      // GitHub-hosted issue attachment images (used in preview page)
      { protocol: "https", hostname: "user-images.githubusercontent.com" },
      { protocol: "https", hostname: "*.githubusercontent.com" },
      {
        protocol: "https",
        hostname: "github-production-user-asset-*.s3.amazonaws.com",
      },
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
          "./**/*.pdf",
          "public/content-images/**",
          "node_modules/three/**",
          "node_modules/@react-three/**",
        ],
      },
    } as any),
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/whitepaper",
        destination: "http://docs.love.fund/",
        permanent: false,
      },
      {
        source: "/whitepaper/:path*",
        destination: "http://docs.love.fund/",
        permanent: false,
      },
      {
        source: "/privacy",
        destination: "/privacy-policy",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/partner",
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
      {
        source: "/blog/:path*",
        destination: "https://app.gitcoin.co/blog/:path*",
      },
      {
        source: "/blog/tag/:path*",
        destination: "https://app.gitcoin.co/blog/tag/:path*",
      },

      // impact.gitcoin.co rewrites
      {
        source: "/impact/:path*",
        destination: "https://impact.gitcoin.co/impact/:path*",
      },
    ];
  },
};

export default nextConfig;
