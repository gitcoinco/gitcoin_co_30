import { ImageResponse } from "next/og";
import { getAppBySlug, apps } from "@/content/apps";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return apps.map((app) => ({ slug: app.slug }));
}

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const app = getAppBySlug(slug);

  const logoSrc = app?.logo
    ? `https://explore.gitcoin.co${app.logo}`
    : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#030712",
          gap: 32,
        }}
      >
        {logoSrc && (
          <img
            src={logoSrc}
            width={160}
            height={160}
            style={{ borderRadius: 24, objectFit: "contain", backgroundColor: "#030712" }}
          />
        )}
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: "#f9fafb",
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          {app?.name ?? "App"}
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#9ca3af",
            textAlign: "center",
            maxWidth: 800,
            lineClamp: 2,
            overflow: "hidden",
          }}
        >
          {app?.shortDescription ?? ""}
        </div>
      </div>
    ),
    { ...size },
  );
}
