import type { Context, Config } from "@netlify/edge-functions";

export default async (_req: Request, context: Context) => {
  const response = await context.next();
  if (!(response.headers.get("content-type") || "").includes("text/html")) return response;

  const headers = new Headers(response.headers);
  headers.set("cache-control", "no-store, max-age=0");
  return new Response(response.body, { status: response.status, headers });
};

export const config: Config = { path: "/" };
