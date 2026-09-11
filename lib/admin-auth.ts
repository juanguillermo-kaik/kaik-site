import { getCloudflareContext } from "@opennextjs/cloudflare";
import { cookies } from "next/headers";

const cookieName = "kaik_blog_admin";
const encoder = new TextEncoder();
export type AdminSession = { expiresAt: number; role: "owner" | "admin"; email: string | null; provider: "password" | "google" };

function base64url(bytes: Uint8Array) { let value = ""; for (const byte of bytes) value += String.fromCharCode(byte); return btoa(value).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); }
function fromBase64url(value: string) { const padded = value.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - value.length % 4) % 4); return Uint8Array.from(atob(padded), (char) => char.charCodeAt(0)); }
async function env() {
  const bindings = (await getCloudflareContext({ async: true })).env;
  if (process.env.NODE_ENV !== "development") return bindings;

  // Next dev does not consistently expose .dev.vars through the platform proxy.
  return {
    ...bindings,
    BLOG_ADMIN_EMAIL: bindings.BLOG_ADMIN_EMAIL ?? process.env.BLOG_ADMIN_EMAIL,
    BLOG_ADMIN_PASSWORD: bindings.BLOG_ADMIN_PASSWORD ?? process.env.BLOG_ADMIN_PASSWORD,
    BLOG_SESSION_SECRET: bindings.BLOG_SESSION_SECRET ?? process.env.BLOG_SESSION_SECRET,
  };
}
async function signature(value: string, keyValue: string) { const key = await crypto.subtle.importKey("raw", encoder.encode(keyValue), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]); return base64url(new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(value)))); }

export async function getAdminSession(): Promise<AdminSession | null> {
  let currentEnv: CloudflareEnv;
  try { currentEnv = await env(); } catch { return null; }
  const token = (await cookies()).get(cookieName)?.value;
  if (!currentEnv.BLOG_SESSION_SECRET || !token) return null;
  const [payload, receivedSignature] = token.split(".");
  if (!payload || !receivedSignature || await signature(payload, currentEnv.BLOG_SESSION_SECRET) !== receivedSignature) return null;
  try { const session = JSON.parse(new TextDecoder().decode(fromBase64url(payload))) as AdminSession; return session.expiresAt > Date.now() ? session : null; } catch { return null; }
}

export async function isAdmin() { return Boolean(await getAdminSession()); }
export async function isOwner() { return (await getAdminSession())?.role === "owner"; }

async function startSession(session: Omit<AdminSession, "expiresAt">) {
  const currentEnv = await env();
  if (!currentEnv.BLOG_SESSION_SECRET) throw new Error("Falta BLOG_SESSION_SECRET.");
  const payload = base64url(encoder.encode(JSON.stringify({ ...session, expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 7 })));
  (await cookies()).set(cookieName, `${payload}.${await signature(payload, currentEnv.BLOG_SESSION_SECRET)}`, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 24 * 7 });
}

export async function login(email: string, password: string) {
  const currentEnv = await env();
  if (!currentEnv.BLOG_ADMIN_EMAIL || !currentEnv.BLOG_ADMIN_PASSWORD || !currentEnv.BLOG_SESSION_SECRET) return { ok: false, message: "Faltan los secretos de administración en Cloudflare." };
  if (email.trim().toLowerCase() !== currentEnv.BLOG_ADMIN_EMAIL.trim().toLowerCase() || password !== currentEnv.BLOG_ADMIN_PASSWORD) return { ok: false, message: "Correo o contraseña incorrectos." };
  await startSession({ role: "owner", email: currentEnv.BLOG_ADMIN_EMAIL.trim().toLowerCase(), provider: "password" });
  return { ok: true };
}

export async function loginGoogle(email: string, role: "owner" | "admin") { await startSession({ role, email, provider: "google" }); }
export async function logout() { (await cookies()).delete(cookieName); }
