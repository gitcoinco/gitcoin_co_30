import { NextRequest } from "next/server";

const MARKEE_VIEWS_API = "https://markee.xyz/api/views";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const upstream = new URL(MARKEE_VIEWS_API);
    searchParams.forEach((v, k) => upstream.searchParams.set(k, v));
    const res = await fetch(upstream.toString(), { next: { revalidate: 0 } });
    const data = await res.json();
    return Response.json(data, { status: res.status });
  } catch {
    return Response.json({}, { status: 200 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const res = await fetch(MARKEE_VIEWS_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return Response.json(data, { status: res.status });
  } catch {
    return Response.json({ error: "view tracking unavailable" }, { status: 200 });
  }
}
