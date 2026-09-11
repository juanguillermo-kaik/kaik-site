import { getCloudflareContext } from "@opennextjs/cloudflare";
import { cookies } from "next/headers";

const cookieName = "kaik_blog_admin";
const encoder = new TextEncoder();

function base64url(bytes: Uint8Array) {
  let value = "";
  for (const byte of bytes) value += String.fromCharCode(byte);
  return btoa(value).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64url(value: string) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - value.length % 4) % 4);
  return Uint8Array.from(atob(padded), (char) => char.charCodeAt(0));
}

async function secret() {
  try {
    return (await getCloudflareContext({ async: true })).env.BLOG_SESSION_SECRET;
  } catch {
    return undefined;
  }
}

async function signature(value: string, keyValue: string) {
  const key = await crypto.subtle.importKey("raw", encoder.encode(keyValue), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return base64url(new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(value))));
}

export async function isAdmin() {
  const currentSecret = await secret();
  const token = (await cookies()).get(cookieName)?.value;
  if (!currentSecret || !token) return false;
  const [payload, receivedSignature] = token.split(".");
  if (!payload || !receivedSignature) return false;
  const expectedSignature = await signature(payload, currentSecret);
  if (expectedSignature !== receivedSignature) return false;
  try {
    return JSON.parse(new TextDecoder().decode(fromBase64url(payload))).expiresAt > Date.now();
  } catch {
    return false;
  }
}

export async function login(password: string) {
  const env = (await getCloudflareContext({ async: true })).env;
  if (!env.BLOG_ADMIN_PASSWORD || !env.BLOG_SESSION_SECRET) return { ok: false, message: "Faltan los secretos de administración en Cloudflare." };
  if (password !== env.BLOG_ADMIN_PASSWORD) return { ok: false, message: "Contraseña incorrecta." };
  const payload = base64url(encoder.encode(JSON.stringify({ expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 7 })));
  const token = `${payload}.${await signature(payload, env.BLOG_SESSION_SECRET)}`;
  (await cookies()).set(cookieName, token, { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 24 * 7 });
  return { ok: true };
}

export async function logout() {
  (await cookies()).delete(cookieName);
}
