import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";
import { calcReadTime } from "./utils";

export const OG_SIZE = { width: 1200, height: 630 };

export type OgContentType =
  | "mechanisms"
  | "apps"
  | "research"
  | "case-studies"
  | "campaigns";

function readPublicImage(publicPath: string): string | null {
  try {
    const abs = path.join(
      process.cwd(),
      "public",
      publicPath.replace(/^\//, ""),
    );
    const buf = fs.readFileSync(abs);
    const mime = /\.(jpg|jpeg)$/i.test(publicPath) ? "image/jpeg" : "image/png";
    return `data:${mime};base64,${buf.toString("base64")}`;
  } catch {
    return null;
  }
}

// Cache font buffers — loaded once per process
let _fontRegular: Buffer | null = null;
let _fontBold: Buffer | null = null;

function loadFonts() {
  if (!_fontRegular) {
    try {
      _fontRegular = fs.readFileSync(
        path.join(process.cwd(), "public/assets/fonts/BDOGrotesk-Regular.ttf"),
      );
      _fontBold = fs.readFileSync(
        path.join(process.cwd(), "public/assets/fonts/BDOGrotesk-Bold.ttf"),
      );
    } catch {
      // fonts unavailable — Satori will fall back to system sans-serif
    }
  }
  return { fontRegular: _fontRegular, fontBold: _fontBold };
}


interface OgImageParams {
  name: string;
  description: string;
  contentType: OgContentType;
  slug: string;
  banner?: string;
}

export function generateOgImage(params: OgImageParams): ImageResponse {
  const { name, description, contentType, slug, banner } = params;

  // Manual override: team member drops og-image.png/jpg in the content-images folder
  for (const ext of ["png", "jpg"]) {
    const data = readPublicImage(
      `content-images/${contentType}/${slug}/og-image.${ext}`,
    );
    if (data) {
      return new ImageResponse(
        <div style={{ width: 1200, height: 630, display: "flex" }}>
          <img
            src={data}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>,
        OG_SIZE,
      );
    }
  }

  const bannerData = banner ? readPublicImage(banner) : null;
  const readTime = calcReadTime(description);
  const titleSize =
    name.length > 70 ? 44 : name.length > 50 ? 56 : name.length > 30 ? 68 : 80;

  const { fontRegular, fontBold } = loadFonts();
  const fontOptions =
    fontRegular && fontBold
      ? [
          {
            name: "BDOGrotesk",
            data: fontRegular,
            weight: 400 as const,
            style: "normal" as const,
          },
          {
            name: "BDOGrotesk",
            data: fontBold,
            weight: 700 as const,
            style: "normal" as const,
          },
        ]
      : [];

  return new ImageResponse(
    <div
      style={{
        width: 1200,
        height: 630,
        display: "flex",
        position: "relative",
        backgroundColor: "#1C1A17",
        fontFamily: "BDOGrotesk, sans-serif",
      }}
    >
      {/* Banner image */}
      {bannerData && (
        <img
          src={bannerData}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      )}

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(to right, #1C1A17 40%, transparent 100%)",
        }}
      />

      {/* Content — flows top-down with gap between logo row and title block */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "48px 56px 64px 80px",
        }}
      >
        {/* Top bar: logo left, read time pill right */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <svg
            width="140"
            height="25"
            viewBox="0 0 281 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M86.5952 49.168V11.8429H76.0269V0.896828H109.016V11.8455H98.4473V49.1705H86.5978L86.5952 49.168Z"
              fill="#12D9B2"
            />
            <path
              d="M0 25.2255C0 10.2437 11.4656 0 25.9423 0C34.6536 0 42.5325 3.51996 47.5924 11.0757L37.1511 16.5163C34.3321 12.675 30.6805 10.6273 26.0693 10.6273C17.9337 10.6273 12.2333 16.9647 12.2333 25.2877C12.2333 33.6107 18.4472 39.8212 25.6855 39.8212C31.6427 39.8212 35.9348 36.2364 36.7025 31.4982V31.4334H26.5828V22.3432H49.9628V24.3909C49.9628 40.14 40.546 50 25.5584 50C11.4008 50 0 39.8212 0 25.2255Z"
              fill="#12D9B2"
            />
            <path
              d="M58.0906 49.168V0.896828H69.9401V49.168H58.0906Z"
              fill="#12D9B2"
            />
            <path
              d="M213.459 49.168V0.896828H225.308V49.168H213.459Z"
              fill="#12D9B2"
            />
            <path
              d="M269.405 0.896828H281V49.168H271.391L247.179 18.7584L247.371 49.168H235.713V0.896828H245.579L269.791 31.1146L269.407 0.896828H269.405Z"
              fill="#12D9B2"
            />
            <path
              d="M137.725 39.0539C130.36 39.0539 124.146 33.2919 124.146 25.0337C124.146 17.224 130.103 11.0135 137.855 11.0135C141.672 11.0135 145.005 12.4572 147.43 14.8471C148.599 11.1146 150.42 7.62312 152.84 4.50233C148.602 1.67444 143.446 0.0648004 137.917 0.0648004C123.697 0.0648004 111.91 10.6921 111.91 24.9689C111.91 39.9508 123.759 50 137.725 50C143.301 50 148.496 48.4396 152.757 45.6661C150.365 42.548 148.563 39.0358 147.409 35.2566C144.948 37.6361 141.566 39.0539 137.725 39.0539Z"
              fill="#12D9B2"
            />
            <path
              d="M180.201 0.0648004C171.276 0.0648004 163.312 4.25091 158.615 10.8968C155.83 14.8419 154.193 19.6527 154.193 24.9689C154.193 30.2851 155.825 35.4018 158.589 39.3416C163.276 46.0213 171.225 50 180.009 50C194.293 50 206.081 39.7564 206.081 25.0959C206.081 10.4355 194.358 0.0648004 180.201 0.0648004ZM180.009 39.0539C172.643 39.0539 166.429 33.2919 166.429 25.0337C166.429 17.224 172.386 11.0135 180.138 11.0135C187.89 11.0135 193.847 17.1592 193.847 25.0985C193.847 33.0378 187.89 39.0539 180.011 39.0539H180.009Z"
              fill="#12D9B2"
            />
          </svg>

          {/* "X min read" — dark pill bg, light text */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#1C1A17",
              borderRadius: "8px",
              padding: "6px 16px",
              fontSize: 16,
              color: "#D6D3CD",
            }}
          >
            {`${readTime} min read`}
          </div>
        </div>

        <div style={{ flex: 1 }} />

        {/* Title + button */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
            maxWidth: 580,
            marginTop: 24,
          }}
        >
          <div
            style={{
              fontSize: titleSize,
              fontWeight: 400,
              color: "#f9fafb",
              lineHeight: 1.2,
            }}
          >
            {name}
          </div>

          {/* Read Now — teal text, teal border, subtle teal glow from bottom */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 148,
              padding: "10px 0",
              border: "1.5px solid #12D9B2",
              borderRadius: 6,
              background:
                "linear-gradient(to top, rgba(18,217,178,0.15) 0%, transparent 100%)",
              color: "#12D9B2",
              fontSize: 17,
              fontWeight: 400,
            }}
          >
            Read Now
          </div>
        </div>

        <div style={{ flex: 1 }} />
      </div>
    </div>,
    {
      ...OG_SIZE,
      fonts: fontOptions,
    },
  );
}
