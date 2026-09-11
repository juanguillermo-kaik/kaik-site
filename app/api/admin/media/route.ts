import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { isAdmin } from "@/lib/admin-auth";

const maximumFileSize = 8 * 1024 * 1024;
const supportedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);

export async function POST(request: Request) {
  if (!await isAdmin()) return NextResponse.json({ message: "No autorizado." }, { status: 401 });

  const formData = await request.formData().catch(() => null);
  const file = formData?.get("file");
  if (!(file instanceof File)) return NextResponse.json({ message: "Selecciona una imagen." }, { status: 400 });
  if (!supportedTypes.has(file.type)) return NextResponse.json({ message: "Usa una imagen JPG, PNG, WebP o AVIF." }, { status: 400 });
  if (file.size > maximumFileSize) return NextResponse.json({ message: "La imagen no puede superar 8 MB." }, { status: 400 });

  const media = (await getCloudflareContext({ async: true })).env.BLOG_MEDIA;
  if (!media) return NextResponse.json({ message: "Falta configurar el almacenamiento de imágenes en Cloudflare." }, { status: 503 });

  const extension = file.type.split("/")[1].replace("jpeg", "jpg");
  const key = `blog/${crypto.randomUUID()}.${extension}`;
  await media.put(key, await file.arrayBuffer(), { httpMetadata: { contentType: file.type } });
  return NextResponse.json({ key, url: `/api/blog/media/${key}` }, { status: 201 });
}
