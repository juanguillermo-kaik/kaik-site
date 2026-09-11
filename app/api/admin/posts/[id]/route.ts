import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { toSlug, updatePost, type PostInput } from "@/lib/blog";

export const runtime = "edge";

function normalize(value: unknown): PostInput | null {
  if (!value || typeof value !== "object") return null;
  const input = value as Record<string, unknown>;
  const title = typeof input.title === "string" ? input.title.trim() : "";
  const body = typeof input.body === "string" ? input.body.trim() : "";
  if (!title || !body) return null;
  return { title, slug: toSlug(typeof input.slug === "string" && input.slug ? input.slug : title), excerpt: typeof input.excerpt === "string" ? input.excerpt.trim() : "", body, category: typeof input.category === "string" && input.category.trim() ? input.category.trim() : "KAIK", cover_image: typeof input.cover_image === "string" ? input.cover_image.trim() : null, seo_title: typeof input.seo_title === "string" ? input.seo_title.trim() : null, seo_description: typeof input.seo_description === "string" ? input.seo_description.trim() : null, status: input.status === "published" ? "published" : "draft" };
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await isAdmin()) return NextResponse.json({ message: "No autorizado." }, { status: 401 });
  const id = Number((await params).id);
  const input = normalize(await request.json().catch(() => null));
  if (!Number.isInteger(id) || !input) return NextResponse.json({ message: "Datos inválidos." }, { status: 400 });
  try {
    await updatePost(id, input);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ message: error instanceof Error ? error.message : "No se pudo guardar." }, { status: 500 });
  }
}
