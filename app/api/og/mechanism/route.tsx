```tsx
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

import { getMechanismSlugFromId } from "@/components/mechanisms";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response("Not Found", { status: 404 });
  }

  const slug = getMechanismSlugFromId(id);
  if (!slug) {
    return new Response("Not Found", { status: 404 });
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1a1a2e",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
          }}
        >
          <h1
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              color: "#ffffff",
              marginBottom: "20px",
            }}
          >
            Gitcoin Mechanism
          </h1>
          <p
            style={{
              fontSize: "32px",
              color: "#a0a0c0",
            }}
          >
            {slug}
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
