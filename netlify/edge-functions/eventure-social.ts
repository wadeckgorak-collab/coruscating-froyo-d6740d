import type { Context, Config } from "@netlify/edge-functions";

const SHARE_IMAGE = "https://raw.githubusercontent.com/wadeckgorak-collab/coruscating-froyo-d6740d/main/share-story.jpg";

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
<meta property="og:image" content="${SHARE_IMAGE}">
<meta property="og:image:secure_url" content="${SHARE_IMAGE}">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:alt" content="Winter Trail Pra Loup — Eventure">
<meta property="og:url" content="https://coruscating-froyo-d6740d.netlify.app/?event=trail-praloup">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Winter Trail Pra Loup — Eventure">
<meta name="twitter:description" content="Un week-end à la montagne entre événement et temps libre.">
<meta name="twitter:image" content="${SHARE_IMAGE}">
<script defer src="/eventure-visual-patch.js?v=20260910-0655"></script>`;
  html = html.replace("</head>", `${social}</head>`);
  const headers = new Headers(response.headers);
  headers.set("content-type", "text/html; charset=utf-8");
  headers.set("cache-control", "no-store, max-age=0");
  return new Response(html, { status: response.status, headers });
};

export const config: Config = { path: "/" };