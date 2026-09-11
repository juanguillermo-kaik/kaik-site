import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { cookies } from "next/headers";
import { getAdminByEmail } from "@/lib/blog";
import { loginGoogle } from "@/lib/admin-auth";
export const runtime = "edge";
export async function GET(request: Request) {
  const url = new URL(request.url); const code = url.searchParams.get("code"); const state = url.searchParams.get("state"); const stateCookie = (await cookies()).get("kaik_google_state")?.value; (await cookies()).delete("kaik_google_state");
  if (!code || !state || state !== stateCookie) return NextResponse.redirect(new URL("/admin?error=google-state", request.url));
  const env = (await getCloudflareContext({ async: true })).env; const redirectUri = new URL("/api/admin/auth/google/callback", request.url).toString();
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ code, client_id: env.GOOGLE_CLIENT_ID || "", client_secret: env.GOOGLE_CLIENT_SECRET || "", redirect_uri: redirectUri, grant_type: "authorization_code" }) });
  const token = await tokenResponse.json() as { access_token?: string }; if (!token.access_token) return NextResponse.redirect(new URL("/admin?error=google-token", request.url));
  const profileResponse = await fetch("https://openidconnect.googleapis.com/v1/userinfo", { headers: { authorization: `Bearer ${token.access_token}` } }); const profile = await profileResponse.json() as { email?: string; email_verified?: boolean }; const email = profile.email?.trim().toLowerCase();
  if (!email || !profile.email_verified) return NextResponse.redirect(new URL("/admin?error=google-email", request.url));
  const user = await getAdminByEmail(email); if (!user) return NextResponse.redirect(new URL("/admin?error=not-authorized", request.url)); await loginGoogle(email, user.role); return NextResponse.redirect(new URL("/admin", request.url));
}
