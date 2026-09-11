import { NextResponse } from "next/server";
import { logout } from "@/lib/admin-auth";

export const runtime = "edge";

export async function POST() {
  await logout();
  return NextResponse.json({ ok: true });
}
