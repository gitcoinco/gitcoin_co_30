import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/preview/", "/api/"],
      },
    ],
    sitemap: "https://gitcoin.co/sitemap.xml",
  };
}
