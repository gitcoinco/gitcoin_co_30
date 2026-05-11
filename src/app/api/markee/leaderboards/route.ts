export const revalidate = 60; // cache for 60s at the CDN edge

export async function GET() {
  const res = await fetch(
    "https://markee.xyz/api/openinternet/leaderboards",
    { next: { revalidate: 60 } },
  );
  if (!res.ok) {
    return new Response(JSON.stringify({ leaderboards: [] }), {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    });
  }
  const json = await res.json();
  return Response.json(json);
}
