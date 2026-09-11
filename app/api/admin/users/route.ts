import { NextResponse } from "next/server";
import { getAdminSession, isOwner } from "@/lib/admin-auth";
import { addAdminUser, getAdminUsers, removeAdminUser } from "@/lib/blog";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function GET() { if (!await isOwner()) return NextResponse.json({ message: "Solo el propietario puede gestionar accesos." }, { status: 403 }); return NextResponse.json(await getAdminUsers()); }
export async function POST(request: Request) {
  if (!await isOwner()) return NextResponse.json({ message: "Solo el propietario puede crear administradores." }, { status: 403 });
  const { email } = await request.json().catch(() => ({})); const normalized = typeof email === "string" ? email.trim().toLowerCase() : "";
  if (!emailPattern.test(normalized)) return NextResponse.json({ message: "Ingresa un correo válido." }, { status: 400 });
  try { await addAdminUser(normalized, (await getAdminSession())?.email ?? "owner"); return NextResponse.json({ ok: true }, { status: 201 }); } catch { return NextResponse.json({ message: "Ese correo ya tiene acceso." }, { status: 409 }); }
}
export async function DELETE(request: Request) { if (!await isOwner()) return NextResponse.json({ message: "Solo el propietario puede revocar accesos." }, { status: 403 }); const id = Number(new URL(request.url).searchParams.get("id")); if (!Number.isInteger(id)) return NextResponse.json({ message: "Administrador inválido." }, { status: 400 }); await removeAdminUser(id); return NextResponse.json({ ok: true }); }
