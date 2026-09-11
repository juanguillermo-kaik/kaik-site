import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { cookies } from "next/headers";
export const runtime = "edge";
export async function GET(request: Request) {
  const env = (await getCloudflareContext({ async: true })).env;
  if (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET) return NextResponse.redirect(new URL("/admin?error=google-not-configured", request.url));
  const state = crypto.randomUUID(); (await cookies()).set("kaik_google_state", state, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/api/admin/auth/google", maxAge: 600 });
  const redirectUri = new URL("/api/admin/auth/google/callback", request.url).toString(); const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  url.search = new URLSearchParams({ client_id: env.GOOGLE_CLIENT_ID, redirect_uri: redirectUri, response_type: "code", scope: "openid email profile", state, prompt: "select_account" }).toString(); return NextResponse.redirect(url);
}
