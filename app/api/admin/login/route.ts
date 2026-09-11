import { NextResponse } from "next/server";
import { login } from "@/lib/admin-auth";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const { password } = await request.json().catch(() => ({}));
    if (typeof password !== "string") return NextResponse.json({ message: "Ingresa la contraseña." }, { status: 400 });
    const result = await login(password);
    return NextResponse.json(result, { status: result.ok ? 200 : 401 });
  } catch {
    return NextResponse.json({ message: "El administrador no está disponible. Intenta recargar la página." }, { status: 503 });
  }
}
