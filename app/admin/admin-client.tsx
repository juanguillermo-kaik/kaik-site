"use client";

import Link from "next/link";
import { useState } from "react";

type Post = { id: number; title: string; slug: string; excerpt: string; body: string; category: string; cover_image: string | null; seo_title: string | null; seo_description: string | null; status: "draft" | "published" };
type Form = Omit<Post, "id">;
type AdminUser = { id: number; email: string; role: "owner" | "admin" };
type View = "posts" | "access";

const emptyPost: Form = { title: "", slug: "", excerpt: "", body: "", category: "KAIK", cover_image: "", seo_title: "", seo_description: "", status: "draft" };

export default function AdminClient({ initialAuthenticated, initialPosts, initialAdmins, canManageUsers, googleError }: { initialAuthenticated: boolean; initialPosts: Post[]; initialAdmins: AdminUser[]; canManageUsers: boolean; googleError?: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(initialAuthenticated);
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [admins, setAdmins] = useState<AdminUser[]>(initialAdmins);
  const [form, setForm] = useState<Form>(emptyPost);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [view, setView] = useState<View>("posts");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");

  const set = (key: keyof Form, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const edit = (post: Post) => { const { id, ...values } = post; setEditingId(id); setForm(values); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const newPost = () => { setEditingId(null); setForm(emptyPost); };

  async function loadPosts() {
    const response = await fetch("/api/admin/posts");
    if (response.ok) setPosts(await response.json());
  }

  async function submitLogin(event: React.FormEvent) {
    event.preventDefault(); setBusy(true); setMessage("");
    try {
      const response = await fetch("/api/admin/login", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email, password }) });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) return setMessage(data.message || "No fue posible iniciar sesión.");
      setAuthenticated(true); setPassword(""); await loadPosts();
    } catch { setMessage("No fue posible conectar con el administrador. Intenta recargar la página."); }
    finally { setBusy(false); }
  }

  async function save(event: React.FormEvent) {
    event.preventDefault(); setBusy(true); setMessage("");
    try {
      const response = await fetch(editingId ? `/api/admin/posts/${editingId}` : "/api/admin/posts", { method: editingId ? "PUT" : "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(form) });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) return setMessage(data.message || "No se pudo guardar.");
      setMessage(form.status === "published" ? "Artículo publicado correctamente." : "Borrador guardado correctamente.");
      newPost(); await loadPosts();
    } catch { setMessage("No fue posible guardar el artículo."); }
    finally { setBusy(false); }
  }

  async function addAdministrator(event: React.FormEvent) {
    event.preventDefault(); setBusy(true); setMessage("");
    try {
      const response = await fetch("/api/admin/users", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email: adminEmail }) });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) return setMessage(data.message || "No se pudo agregar el administrador.");
      const users = await fetch("/api/admin/users"); if (users.ok) setAdmins(await users.json());
      setAdminEmail(""); setMessage("Correo autorizado para acceder con Google.");
    } finally { setBusy(false); }
  }

  async function removeAdministrator(id: number) {
    const response = await fetch(`/api/admin/users?id=${id}`, { method: "DELETE" });
    if (!response.ok) return setMessage("No se pudo revocar el acceso.");
    setAdmins((current) => current.filter((admin) => admin.id !== id)); setMessage("Acceso revocado.");
  }

  async function signOut() { await fetch("/api/admin/logout", { method: "POST" }); setAuthenticated(false); setPosts([]); }

  if (!authenticated) return <Login email={email} setEmail={setEmail} password={password} setPassword={setPassword} submitLogin={submitLogin} busy={busy} message={message || googleError || ""} />;

  return <main className="min-h-screen bg-[#f6f8fc] text-[#5e6474]">
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-20 border-r border-[#e0e6f0] bg-white py-7 md:flex md:flex-col md:items-center">
      <Link href="/" className="grid h-12 w-12 place-items-center rounded-2xl bg-[#0037ff] text-lg font-black tracking-[-.18em] text-white">KÄ</Link>
      <nav className="mt-16 flex flex-1 flex-col gap-4">
        <NavIcon label="Publicaciones" active={view === "posts"} onClick={() => setView("posts")}>▤</NavIcon>
        {canManageUsers && <NavIcon label="Accesos" active={view === "access"} onClick={() => setView("access")}>♙</NavIcon>}
      </nav>
      <Link href="/" className="grid h-11 w-11 place-items-center rounded-xl text-lg text-[#8b93a3] hover:bg-[#edf3ff] hover:text-[#0037ff]">⌂</Link>
    </aside>
    <div className="md:pl-20">
      <header className="flex min-h-24 items-center justify-between border-b border-[#edf0f5] bg-white px-6 md:px-10">
        <div><p className="text-[.68rem] font-semibold uppercase tracking-[.22em] text-[#9ca5b5]">KAIK · CMS</p><h1 className="mt-1 text-3xl font-semibold tracking-[-.05em] text-[#686c7b]">{view === "posts" ? "Noticias" : "Administradores"}</h1></div>
        <div className="flex items-center gap-4"><span className="hidden text-sm text-[#9aa4b5] sm:block">Administrador</span><button onClick={signOut} className="grid h-11 w-11 place-items-center rounded-full border-2 border-[#1475ff] bg-[#e8f2ff] text-base font-bold text-[#1475ff]" aria-label="Cerrar sesión">●</button></div>
      </header>
      <div className="bg-[radial-gradient(circle_at_90%_100%,rgba(193,219,255,.46),transparent_23rem),linear-gradient(110deg,#eefbfc,#f6f8fc_55%)] px-6 py-7 md:px-10">
        <div className="flex flex-wrap items-center gap-2">
          <Tab active={view === "posts"} onClick={() => setView("posts")}>Noticias</Tab>
          {canManageUsers && <Tab active={view === "access"} onClick={() => setView("access")}>Accesos</Tab>}
          {view === "posts" && <Tab active={editingId !== null || form.title !== ""} onClick={newPost}>Crear</Tab>}
        </div>
        {message && <div className="mt-5 rounded-xl border border-[#bed5ff] bg-white px-4 py-3 text-sm font-medium text-[#1467e9] shadow-sm">{message}</div>}
        {view === "posts" ? <PostsView posts={posts} form={form} editingId={editingId} busy={busy} edit={edit} newPost={newPost} save={save} set={set} /> : <AccessView admins={admins} email={adminEmail} setEmail={setAdminEmail} add={addAdministrator} revoke={removeAdministrator} busy={busy} />}
      </div>
    </div>
  </main>;
}

function Login({ email, setEmail, password, setPassword, submitLogin, busy, message }: { email: string; setEmail: (value: string) => void; password: string; setPassword: (value: string) => void; submitLogin: (event: React.FormEvent) => void; busy: boolean; message: string }) {
  return <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_15%_15%,rgba(176,211,255,.7),transparent_27rem),linear-gradient(125deg,#edf9fb,#f7f9ff)] p-6"><form onSubmit={submitLogin} className="w-full max-w-md rounded-[1.8rem] border border-white bg-white p-8 shadow-[0_20px_60px_rgba(50,88,155,.14)]"><Link href="/" className="inline-flex h-12 w-16 items-center justify-center rounded-2xl bg-[#0037ff] text-lg font-black tracking-[-.18em] text-white">KÄ</Link><p className="mt-9 text-xs font-semibold uppercase tracking-[.24em] text-[#1873ff]">KAIK CMS</p><h1 className="mt-2 text-4xl font-semibold tracking-[-.06em] text-[#696d7b]">Administración</h1><p className="mt-3 text-sm leading-6 text-[#8b93a3]">Gestiona publicaciones y los accesos del equipo.</p><a href="/api/admin/auth/google" className="mt-7 flex w-full items-center justify-center rounded-xl border border-[#dbe2ee] bg-white px-5 py-3 font-semibold text-[#5f6574] shadow-sm transition hover:border-[#1873ff]">Continuar con Google</a><div className="my-6 flex items-center gap-3 text-xs text-[#9ba4b3]"><span className="h-px flex-1 bg-[#e4e8ef]" />o ingresa con contraseña<span className="h-px flex-1 bg-[#e4e8ef]" /></div><label className="block text-sm font-medium text-[#626978]">Correo<input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required placeholder="nombre@kaik.cl" className="mt-2 w-full rounded-xl border border-[#dce3ed] px-4 py-3 text-[#303644] outline-none focus:border-[#1873ff]" /></label><label className="mt-5 block text-sm font-medium text-[#626978]">Contraseña<input value={password} onChange={(event) => setPassword(event.target.value)} type="password" required className="mt-2 w-full rounded-xl border border-[#dce3ed] px-4 py-3 text-[#303644] outline-none focus:border-[#1873ff]" /></label>{message && <p className="mt-4 text-sm text-[#d14d4d]">{message}</p>}<button disabled={busy} className="mt-6 w-full rounded-full bg-[#0037ff] px-5 py-3 font-semibold text-white shadow-[0_8px_18px_rgba(0,55,255,.25)] disabled:opacity-60">{busy ? "Ingresando..." : "Ingresar"}</button></form></main>;
}

function PostsView({ posts, form, editingId, busy, edit, newPost, save, set }: { posts: Post[]; form: Form; editingId: number | null; busy: boolean; edit: (post: Post) => void; newPost: () => void; save: (event: React.FormEvent) => void; set: (key: keyof Form, value: string) => void }) {
  const editing = editingId !== null || form.title !== "";
  if (editing) return <form onSubmit={save} className="mt-7 rounded-2xl border border-[#e0e6ef] bg-white p-6 shadow-[0_4px_16px_rgba(61,91,138,.11)] md:p-8"><div className="flex items-center justify-between gap-4"><div><h2 className="text-2xl font-semibold text-[#1371fa]">{editingId ? "Editar noticia" : "Crear noticia"}</h2><p className="mt-1 text-sm">Completa los campos para guardar un borrador o publicar.</p></div><button type="button" onClick={newPost} className="rounded-full bg-[#eef1f5] px-5 py-2.5 text-sm font-semibold text-[#737a89]">Cancelar</button></div><div className="mt-7 grid gap-5 md:grid-cols-2"><Field label="Título"><input value={form.title} onChange={(event) => set("title", event.target.value)} required /></Field><Field label="Categoría"><input value={form.category} onChange={(event) => set("category", event.target.value)} /></Field><Field label="URL / slug"><input value={form.slug} onChange={(event) => set("slug", event.target.value)} placeholder="se-genera-desde-el-titulo" /></Field><Field label="Estado"><select value={form.status} onChange={(event) => set("status", event.target.value)}><option value="draft">Borrador</option><option value="published">Publicado</option></select></Field></div><Field label="Bajada"><textarea value={form.excerpt} onChange={(event) => set("excerpt", event.target.value)} rows={3} /></Field><Field label="Contenido"><textarea value={form.body} onChange={(event) => set("body", event.target.value)} required rows={12} placeholder="Separa cada párrafo con una línea en blanco." /></Field><details className="mt-6 rounded-xl bg-[#f5f8ff] p-5"><summary className="cursor-pointer font-semibold text-[#626a79]">SEO y portada</summary><div className="mt-5 grid gap-5 md:grid-cols-2"><Field label="URL de imagen de portada"><input value={form.cover_image || ""} onChange={(event) => set("cover_image", event.target.value)} /></Field><Field label="Título SEO"><input value={form.seo_title || ""} onChange={(event) => set("seo_title", event.target.value)} /></Field></div><Field label="Descripción SEO"><textarea value={form.seo_description || ""} onChange={(event) => set("seo_description", event.target.value)} rows={3} /></Field></details><button disabled={busy} className="mt-7 rounded-full bg-[#0037ff] px-7 py-3 font-semibold text-white shadow-[0_8px_18px_rgba(0,55,255,.22)] disabled:opacity-60">{busy ? "Guardando..." : form.status === "published" ? "Publicar noticia" : "Guardar borrador"}</button></form>;
  return <section className="mt-7"><div className="flex flex-wrap items-end justify-between gap-4"><p className="max-w-2xl text-[1.02rem] leading-7 text-[#8d98aa]">Revisa, edita y publica los contenidos del blog de KAIK.</p><button onClick={newPost} className="rounded-full bg-[#0037ff] px-6 py-3 font-semibold text-white shadow-[0_8px_18px_rgba(0,55,255,.24)]">＋ Crear noticia</button></div><div className="mt-5 grid gap-4 sm:grid-cols-[minmax(0,1fr)_12rem]"><div className="flex items-center gap-3 rounded-xl border border-[#dfe5ef] bg-white px-4 py-3 text-[#1371fa] shadow-sm">⌕ <span className="text-sm text-[#a0a8b5]">Buscar noticia</span></div><div className="rounded-xl border border-[#dfe5ef] bg-white px-4 py-3 text-sm text-[#8e96a5] shadow-sm">Todas las categorías</div></div><div className="mt-5 overflow-hidden rounded-2xl border border-white bg-white shadow-[0_5px_18px_rgba(61,91,138,.09)]">{posts.length === 0 ? <div className="grid min-h-72 place-items-center text-center"><div><div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#e7f0ff] text-3xl">✦</div><p className="mt-4 font-medium text-[#8994a6]">Aún no hay noticias para mostrar</p><button onClick={newPost} className="mt-4 rounded-full bg-[#0037ff] px-5 py-2.5 text-sm font-semibold text-white">Crear primera noticia</button></div></div> : posts.map((post) => <button key={post.id} onClick={() => edit(post)} className="flex w-full items-center gap-5 border-b border-[#edf0f4] px-6 py-5 text-left last:border-0 hover:bg-[#f8fbff]"><span className="grid h-11 w-11 place-items-center rounded-xl bg-[#e8f1ff] text-[#1371fa]">▤</span><span className="min-w-0 flex-1"><span className="block truncate font-semibold text-[#505766]">{post.title}</span><span className="mt-1 block text-sm text-[#9aa3b1]">{post.category} · {post.status === "published" ? "Publicado" : "Borrador"}</span></span><span className="text-sm font-semibold text-[#1371fa]">Editar</span></button>)}</div></section>;
}

function AccessView({ admins, email, setEmail, add, revoke, busy }: { admins: AdminUser[]; email: string; setEmail: (value: string) => void; add: (event: React.FormEvent) => void; revoke: (id: number) => void; busy: boolean }) {
  return <section className="mt-7 max-w-4xl"><p className="max-w-2xl text-[1.02rem] leading-7 text-[#8d98aa]">Autoriza a tu equipo para que acceda al administrador usando su cuenta de Google.</p><div className="mt-5 rounded-2xl border border-[#e0e6ef] bg-white p-6 shadow-[0_5px_18px_rgba(61,91,138,.09)]"><h2 className="text-xl font-semibold text-[#1371fa]">Agregar administrador</h2><form onSubmit={add} className="mt-5 flex flex-col gap-3 sm:flex-row"><input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="correo@kaik.cl" className="min-w-0 flex-1 rounded-xl border border-[#dbe2ec] px-4 py-3 text-[#414855] outline-none focus:border-[#1371fa]" /><button disabled={busy} className="rounded-full bg-[#0037ff] px-6 py-3 font-semibold text-white disabled:opacity-60">Autorizar correo</button></form></div><div className="mt-5 overflow-hidden rounded-2xl bg-white shadow-[0_5px_18px_rgba(61,91,138,.09)]">{admins.length === 0 ? <p className="p-7 text-center text-[#9aa4b4]">Todavía no hay correos autorizados.</p> : admins.map((admin) => <div key={admin.id} className="flex items-center gap-4 border-b border-[#edf0f4] px-6 py-5 last:border-0"><span className="grid h-10 w-10 place-items-center rounded-full bg-[#e8f1ff] text-[#1371fa]">●</span><span className="min-w-0 flex-1"><span className="block truncate font-semibold text-[#515968]">{admin.email}</span><span className="text-sm text-[#9ba4b2]">{admin.role === "owner" ? "Propietario" : "Administrador Google"}</span></span><button onClick={() => revoke(admin.id)} className="text-sm font-semibold text-[#1371fa]">Revocar</button></div>)}</div></section>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="mt-5 block text-sm font-medium text-[#697282]">{label}<span className="mt-2 block [&_input]:w-full [&_input]:rounded-xl [&_input]:border [&_input]:border-[#dbe2ec] [&_input]:px-4 [&_input]:py-3 [&_input]:text-[#414855] [&_input]:outline-none [&_input]:focus:border-[#1371fa] [&_select]:w-full [&_select]:rounded-xl [&_select]:border [&_select]:border-[#dbe2ec] [&_select]:bg-white [&_select]:px-4 [&_select]:py-3 [&_textarea]:w-full [&_textarea]:rounded-xl [&_textarea]:border [&_textarea]:border-[#dbe2ec] [&_textarea]:px-4 [&_textarea]:py-3 [&_textarea]:text-[#414855] [&_textarea]:outline-none [&_textarea]:focus:border-[#1371fa]">{children}</span></label>; }
function Tab({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) { return <button onClick={onClick} className={`rounded-b-2xl rounded-t-md px-6 py-3 text-sm font-semibold ${active ? "bg-white text-[#1371fa] shadow-sm" : "bg-[#e9ebee] text-[#a0a4ac]"}`}>{children}</button>; }
function NavIcon({ active, onClick, label, children }: { active: boolean; onClick: () => void; label: string; children: React.ReactNode }) { return <button onClick={onClick} aria-label={label} className={`grid h-12 w-12 place-items-center rounded-2xl text-xl transition ${active ? "border-2 border-[#1475ff] bg-[#edf4ff] text-[#1475ff]" : "text-[#9fa7b5] hover:bg-[#edf4ff] hover:text-[#1475ff]"}`}>{children}</button>; }
