"use client";

import Link from "next/link";
import { useState } from "react";

type Post = { id: number; title: string; slug: string; excerpt: string; body: string; category: string; cover_image: string | null; seo_title: string | null; seo_description: string | null; status: "draft" | "published" };
type Form = Omit<Post, "id">;

const emptyPost: Form = { title: "", slug: "", excerpt: "", body: "", category: "KAIK", cover_image: "", seo_title: "", seo_description: "", status: "draft" };

export default function AdminClient({ initialAuthenticated, initialPosts }: { initialAuthenticated: boolean; initialPosts: Post[] }) {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(initialAuthenticated);
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [form, setForm] = useState<Form>(emptyPost);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function loadPosts() {
    const response = await fetch("/api/admin/posts");
    if (!response.ok) return false;
    setPosts(await response.json());
    return true;
  }

  async function submitLogin(event: React.FormEvent) {
    event.preventDefault(); setBusy(true); setMessage("");
    const response = await fetch("/api/admin/login", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ password }) });
    const data = await response.json(); setBusy(false);
    if (!response.ok) return setMessage(data.message || "No fue posible iniciar sesión.");
    setAuthenticated(true); setPassword(""); await loadPosts();
  }

  function edit(post: Post) {
    const { id, ...values } = post; setEditingId(id); setForm(values); window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function save(event: React.FormEvent) {
    event.preventDefault(); setBusy(true); setMessage("");
    const response = await fetch(editingId ? `/api/admin/posts/${editingId}` : "/api/admin/posts", { method: editingId ? "PUT" : "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(form) });
    const data = await response.json(); setBusy(false);
    if (!response.ok) return setMessage(data.message || "No se pudo guardar.");
    setMessage(form.status === "published" ? "Artículo publicado." : "Borrador guardado."); setForm(emptyPost); setEditingId(null); await loadPosts();
  }

  async function signOut() { await fetch("/api/admin/logout", { method: "POST" }); setAuthenticated(false); setPosts([]); }

  const set = (key: keyof Form, value: string) => setForm((current) => ({ ...current, [key]: value }));
  if (!authenticated) return <main className="min-h-screen bg-[radial-gradient(circle_at_10%_15%,rgba(151,199,255,.48),transparent_24rem),linear-gradient(135deg,#edf5ff,#fff)] px-6 py-16 text-[#20222d]"><form onSubmit={submitLogin} className="mx-auto max-w-md rounded-[2rem] border border-white bg-white/80 p-8 shadow-[0_24px_80px_rgba(30,70,145,.14)] backdrop-blur"><Link href="/" className="text-xl font-black tracking-[-.14em]">KÄIK</Link><p className="mt-12 text-xs font-semibold uppercase tracking-[.25em] text-[#0037ff]">Administración</p><h1 className="mt-3 text-4xl font-bold tracking-[-.06em]">Blog</h1><label className="mt-8 block text-sm font-medium">Contraseña<input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="mt-2 w-full rounded-xl border border-[#d9dfec] bg-white px-4 py-3 outline-none focus:border-[#0037ff]" /></label>{message && <p className="mt-4 text-sm text-red-600">{message}</p>}<button disabled={busy} className="mt-6 w-full rounded-full bg-[#0037ff] px-5 py-3 font-semibold text-white disabled:opacity-60">{busy ? "Ingresando..." : "Ingresar"}</button></form></main>;

  return <main className="min-h-screen bg-[#f5f8ff] px-5 py-7 text-[#20222d] md:px-10"><div className="mx-auto max-w-7xl"><header className="flex items-center justify-between"><div><Link href="/" className="text-xl font-black tracking-[-.14em]">KÄIK</Link><h1 className="mt-4 text-3xl font-bold tracking-[-.06em]">Administrador del blog</h1></div><button onClick={signOut} className="rounded-full border border-[#d8dfec] bg-white px-5 py-2.5 text-sm font-medium">Salir</button></header><div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]"><form onSubmit={save} className="rounded-[2rem] bg-white p-6 shadow-[0_18px_50px_rgba(30,70,145,.08)] md:p-8"><div className="flex items-center justify-between gap-4"><h2 className="text-xl font-bold">{editingId ? "Editar artículo" : "Nuevo artículo"}</h2>{editingId && <button type="button" onClick={() => { setEditingId(null); setForm(emptyPost); }} className="text-sm font-medium text-[#0037ff]">Nuevo</button>}</div><div className="mt-7 grid gap-5 md:grid-cols-2"><Field label="Título"><input value={form.title} onChange={(e) => set("title", e.target.value)} required /></Field><Field label="Categoría"><input value={form.category} onChange={(e) => set("category", e.target.value)} /></Field><Field label="URL / slug"><input value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="se-genera-desde-el-titulo" /></Field><Field label="Estado"><select value={form.status} onChange={(e) => set("status", e.target.value)}><option value="draft">Borrador</option><option value="published">Publicado</option></select></Field></div><Field label="Bajada"><textarea value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} rows={3} /></Field><Field label="Contenido"><textarea value={form.body} onChange={(e) => set("body", e.target.value)} required rows={13} placeholder="Separa párrafos con una línea en blanco." /></Field><details className="mt-6 rounded-2xl bg-[#f5f8ff] p-5"><summary className="cursor-pointer font-semibold">SEO y portada</summary><div className="mt-5 grid gap-5 md:grid-cols-2"><Field label="URL imagen de portada"><input value={form.cover_image || ""} onChange={(e) => set("cover_image", e.target.value)} /></Field><Field label="Título SEO"><input value={form.seo_title || ""} onChange={(e) => set("seo_title", e.target.value)} /></Field></div><Field label="Descripción SEO"><textarea value={form.seo_description || ""} onChange={(e) => set("seo_description", e.target.value)} rows={3} /></Field></details>{message && <p className="mt-5 text-sm font-medium text-[#0037ff]">{message}</p>}<button disabled={busy} className="mt-7 rounded-full bg-[#0037ff] px-7 py-3 font-semibold text-white disabled:opacity-60">{busy ? "Guardando..." : form.status === "published" ? "Publicar artículo" : "Guardar borrador"}</button></form><aside className="rounded-[2rem] bg-[#101a3a] p-6 text-white"><p className="text-xs font-semibold uppercase tracking-[.22em] text-[#8da9ff]">Publicaciones</p><div className="mt-6 space-y-3">{posts.length === 0 && <p className="text-sm text-[#b8c4e5]">Aún no hay artículos.</p>}{posts.map((post) => <button key={post.id} onClick={() => edit(post)} className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:bg-white/10"><span className="block text-[.67rem] font-semibold uppercase tracking-[.15em] text-[#8da9ff]">{post.status === "published" ? "Publicado" : "Borrador"}</span><span className="mt-2 block font-semibold leading-5">{post.title}</span></button>)}</div></aside></div></div></main>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="mt-5 block text-sm font-medium text-[#3c4351]">{label}<span className="mt-2 block [&_input]:w-full [&_input]:rounded-xl [&_input]:border [&_input]:border-[#d9dfec] [&_input]:bg-white [&_input]:px-4 [&_input]:py-3 [&_input]:outline-none [&_input]:focus:border-[#0037ff] [&_select]:w-full [&_select]:rounded-xl [&_select]:border [&_select]:border-[#d9dfec] [&_select]:bg-white [&_select]:px-4 [&_select]:py-3 [&_textarea]:w-full [&_textarea]:rounded-xl [&_textarea]:border [&_textarea]:border-[#d9dfec] [&_textarea]:bg-white [&_textarea]:px-4 [&_textarea]:py-3 [&_textarea]:outline-none [&_textarea]:focus:border-[#0037ff]">{children}</span></label>; }
