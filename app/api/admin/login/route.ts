import { NextResponse } from "next/server";
import { login } from "@/lib/admin-auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json().catch(() => ({}));
    if (typeof email !== "string" || typeof password !== "string") return NextResponse.json({ message: "Ingresa tu correo y contraseña." }, { status: 400 });
    const result = await login(email, password);
    return NextResponse.json(result, { status: result.ok ? 200 : 401 });
  } catch {
    return NextResponse.json({ message: "El administrador no está disponible. Intenta recargar la página." }, { status: 503 });
  }
}
