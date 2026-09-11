import { getAdminUsers, getAllPosts } from "@/lib/blog";
import { getAdminSession } from "@/lib/admin-auth";
import AdminClient from "./admin-client";

export const dynamic = "force-dynamic";

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const session = await getAdminSession();
  const error = (await searchParams).error;
  const authenticated = Boolean(session);
  const posts = authenticated ? await getAllPosts() : [];
  const admins = session?.role === "owner" ? await getAdminUsers() : [];
  return <AdminClient initialAuthenticated={authenticated} initialPosts={posts} initialAdmins={admins} canManageUsers={session?.role === "owner"} googleError={error === "google-not-configured" ? "El acceso con Google aún está en configuración. Usa tu correo y contraseña por ahora." : error === "not-authorized" ? "Tu correo de Google todavía no está autorizado para este administrador." : undefined} />;
}
