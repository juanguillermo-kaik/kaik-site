import { getAdminUsers, getAllPosts } from "@/lib/blog";
import { getAdminSession } from "@/lib/admin-auth";
import AdminClient from "./admin-client";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getAdminSession();
  const authenticated = Boolean(session);
  const posts = authenticated ? await getAllPosts() : [];
  const admins = session?.role === "owner" ? await getAdminUsers() : [];
  return <AdminClient initialAuthenticated={authenticated} initialPosts={posts} initialAdmins={admins} canManageUsers={session?.role === "owner"} />;
}
