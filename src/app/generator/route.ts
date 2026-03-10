export async function GET() {
  const res = await fetch("https://octaviaan.github.io/Chladni-Particles/");
  const html = await res.text();

  // Replace relative base href so assets resolve under /generator/
  const modified = html.replace(
    /<base\s+href=["']\.\/["']\s*\/?>/i,
    '<base href="/generator/">'
  );

  return new Response(modified, {
    headers: {
      "Content-Type": "text/html",
      "X-Robots-Tag": "noindex",
    },
  });
}
