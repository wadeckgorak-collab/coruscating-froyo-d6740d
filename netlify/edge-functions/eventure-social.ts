import type { Context, Config } from "@netlify/edge-functions";

export default async (_req: Request, context: Context) => {
  const response = await context.next();
  const type = response.headers.get("content-type") || "";
  if (!type.includes("text/html")) return response;
  let html = await response.text();
  const social = `
<meta property="og:type" content="website">
<meta property="og:site_name" content="Eventure">
<meta property="og:title" content="Winter Trail Pra Loup — Un week-end entre événement et temps libre">
<meta property="og:description" content="Du 11 au 13 décembre 2026 à Pra Loup · 3 demi-journées de temps libre · vis l’événement de l’intérieur.">
<meta property="og:image" content="https://coruscating-froyo-d6740d.netlify.app/share-story.jpg?v=20260910-2">
<meta property="og:image:secure_url" content="https://coruscating-froyo-d6740d.netlify.app/share-story.jpg?v=20260910-2">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:alt" content="Winter Trail Pra Loup — Eventure">
<meta property="og:url" content="https://coruscating-froyo-d6740d.netlify.app/?event=trail-praloup">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Winter Trail Pra Loup — Eventure">
<meta name="twitter:description" content="Un week-end à la montagne entre événement et temps libre.">
<meta name="twitter:image" content="https://coruscating-froyo-d6740d.netlify.app/share-story.jpg?v=20260910-2">
<script defer src="/eventure-visual-patch.js"></script>`;
  html = html.replace("</head>", `${social}</head>`);
  const headers = new Headers(response.headers);
  headers.set("content-type", "text/html; charset=utf-8");
  headers.set("cache-control", "public, max-age=0, must-revalidate");
  return new Response(html, { status: response.status, headers });
};

export const config: Config = { path: "/" };