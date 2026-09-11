import { getAllPosts } from "@/lib/blog";
import { isAdmin } from "@/lib/admin-auth";
import AdminClient from "./admin-client";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authenticated = await isAdmin();
  const posts = authenticated ? await getAllPosts() : [];
  return <AdminClient initialAuthenticated={authenticated} initialPosts={posts} />;
}
