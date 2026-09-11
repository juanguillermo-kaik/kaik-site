import { getCloudflareContext } from "@opennextjs/cloudflare";

declare global {
  interface D1PreparedStatement {
    bind(...values: unknown[]): D1PreparedStatement;
    all<T = unknown>(): Promise<{ results: T[] }>;
    first<T = unknown>(): Promise<T | null>;
    run(): Promise<{ meta: { last_row_id: number } }>;
  }

  interface D1Database {
    prepare(query: string): D1PreparedStatement;
  }

  interface CloudflareEnv {
    BLOG_DB?: D1Database;
    BLOG_ADMIN_PASSWORD?: string;
    BLOG_SESSION_SECRET?: string;
    GOOGLE_CLIENT_ID?: string;
    GOOGLE_CLIENT_SECRET?: string;
  }
}

export type PostStatus = "draft" | "published";

export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  category: string;
  cover_image: string | null;
  seo_title: string | null;
  seo_description: string | null;
  status: PostStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type PostInput = Omit<BlogPost, "id" | "created_at" | "updated_at" | "published_at">;
export type AdminUser = { id: number; email: string; role: "owner" | "admin"; created_at: string; created_by: string | null };

const samplePosts: BlogPost[] = [
  {
    id: 1,
    title: "Comunicación y tecnología para desafíos reales",
    slug: "comunicacion-y-tecnologia-para-desafios-reales",
    excerpt: "Las mejores experiencias de marca ocurren cuando la creatividad y la tecnología trabajan como un mismo sistema.",
    body: "Las marcas no viven solo en una campaña ni en una plataforma. Viven en cada interacción con sus equipos, clientes y audiencias.\n\nCuando comunicación y tecnología se diseñan juntas, las ideas llegan más lejos: se vuelven consistentes, medibles y útiles para las personas.",
    category: "Estrategia",
    cover_image: null,
    seo_title: null,
    seo_description: null,
    status: "published",
    published_at: "2026-09-10T12:00:00.000Z",
    created_at: "2026-09-10T12:00:00.000Z",
    updated_at: "2026-09-10T12:00:00.000Z",
  },
];

async function database() {
  try {
    return (await getCloudflareContext({ async: true })).env.BLOG_DB;
  } catch {
    return undefined;
  }
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const db = await database();
  if (!db) return samplePosts;

  try {
    const result = await db.prepare("SELECT * FROM posts WHERE status = 'published' ORDER BY published_at DESC, id DESC").all<BlogPost>();
    return result.results as BlogPost[];
  } catch {
    return samplePosts;
  }
}

export async function getPublishedPost(slug: string): Promise<BlogPost | null> {
  const db = await database();
  if (!db) return samplePosts.find((post) => post.slug === slug) ?? null;

  try {
    return (await db.prepare("SELECT * FROM posts WHERE slug = ? AND status = 'published' LIMIT 1").bind(slug).first<BlogPost>()) ?? null;
  } catch {
    return samplePosts.find((post) => post.slug === slug) ?? null;
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const db = await database();
  if (!db) return samplePosts;
  const result = await db.prepare("SELECT * FROM posts ORDER BY updated_at DESC, id DESC").all<BlogPost>();
  return result.results as BlogPost[];
}

export async function createPost(input: PostInput) {
  const db = await database();
  if (!db) throw new Error("La base de datos del blog no está disponible todavía.");
  const publishedAt = input.status === "published" ? new Date().toISOString() : null;
  const result = await db.prepare(
    "INSERT INTO posts (title, slug, excerpt, body, category, cover_image, seo_title, seo_description, status, published_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)",
  ).bind(input.title, input.slug, input.excerpt, input.body, input.category, input.cover_image || null, input.seo_title || null, input.seo_description || null, input.status, publishedAt).run();
  return result.meta.last_row_id;
}

export async function updatePost(id: number, input: PostInput) {
  const db = await database();
  if (!db) throw new Error("La base de datos del blog no está disponible todavía.");
  const current = await db.prepare("SELECT published_at FROM posts WHERE id = ?").bind(id).first<{ published_at: string | null }>();
  const publishedAt = input.status === "published" ? current?.published_at ?? new Date().toISOString() : null;
  await db.prepare(
    "UPDATE posts SET title = ?, slug = ?, excerpt = ?, body = ?, category = ?, cover_image = ?, seo_title = ?, seo_description = ?, status = ?, published_at = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
  ).bind(input.title, input.slug, input.excerpt, input.body, input.category, input.cover_image || null, input.seo_title || null, input.seo_description || null, input.status, publishedAt, id).run();
}

export async function getAdminUsers(): Promise<AdminUser[]> {
  const db = await database();
  if (!db) return [];
  const result = await db.prepare("SELECT * FROM admin_users ORDER BY email ASC").all<AdminUser>();
  return result.results as AdminUser[];
}

export async function getAdminByEmail(email: string): Promise<AdminUser | null> {
  const db = await database();
  if (!db) return null;
  return (await db.prepare("SELECT * FROM admin_users WHERE email = ? LIMIT 1").bind(email.trim().toLowerCase()).first<AdminUser>()) ?? null;
}

export async function addAdminUser(email: string, createdBy: string | null) {
  const db = await database();
  if (!db) throw new Error("La base de datos del blog no está disponible todavía.");
  return db.prepare("INSERT INTO admin_users (email, role, created_by) VALUES (?, 'admin', ?)").bind(email.trim().toLowerCase(), createdBy).run();
}

export async function removeAdminUser(id: number) {
  const db = await database();
  if (!db) throw new Error("La base de datos del blog no está disponible todavía.");
  await db.prepare("DELETE FROM admin_users WHERE id = ? AND role = 'admin'").bind(id).run();
}

export function toSlug(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
