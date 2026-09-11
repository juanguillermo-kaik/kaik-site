import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Archivo, MuseoModerno } from "next/font/google";
import { getPublishedPost, getPublishedPosts } from "@/lib/blog";
import { SiteNavigation } from "@/components/site-navigation";
import { SiteFooter } from "@/components/site-footer";
import { RichText } from "@/components/rich-text";

const archivo = Archivo({ subsets: ["latin"], weight: ["400", "500", "600"] });
const museo = MuseoModerno({ subsets: ["latin"], weight: ["600", "700", "800"] });
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = await getPublishedPost((await params).slug);
  if (!post) return {};
  return { title: post.seo_title || `${post.title} | KAIK`, description: post.seo_description || post.excerpt, alternates: { canonical: `/blog/${post.slug}` }, openGraph: { title: post.seo_title || post.title, description: post.seo_description || post.excerpt, type: "article", publishedTime: post.published_at || undefined, modifiedTime: post.updated_at, images: post.og_image || post.cover_image ? [post.og_image || post.cover_image!] : undefined } };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const post = await getPublishedPost((await params).slug);
  if (!post) notFound();
  const posts = await getPublishedPosts();
  const postIndex = posts.findIndex((item) => item.slug === post.slug);
  const newerPost = postIndex > 0 ? posts[postIndex - 1] : null;
  const olderPost = postIndex >= 0 ? posts[postIndex + 1] ?? null : null;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seo_description || post.excerpt,
    mainEntityOfPage: `https://kaik.cl/blog/${post.slug}`,
    datePublished: post.published_at || undefined,
    dateModified: post.updated_at,
    author: { "@type": "Organization", name: post.author || "KAIK" },
    publisher: { "@type": "Organization", name: "KAIK", url: "https://kaik.cl" },
    image: post.og_image || post.cover_image || undefined,
  };
  return <main className={`min-h-screen bg-[linear-gradient(140deg,#eff6ff,#fff_54%,#edf5ff)] text-[#20222d] ${archivo.className}`}>
    <SiteNavigation article />
    <article className="mx-auto max-w-7xl px-7 pb-24 pt-14 md:px-10 md:pt-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#0037ff]">{post.category}</p>
      <h1 className={`mt-5 max-w-3xl text-[clamp(3.2rem,7vw,6.2rem)] font-bold leading-[.88] tracking-[-.07em] ${museo.className}`}>{post.title}</h1>
      <p className="mt-7 max-w-2xl text-xl leading-8 text-[#5f6675]">{post.excerpt}</p>
      {post.cover_image && <Image className="mt-12 aspect-[16/8] w-full rounded-[2rem] object-cover shadow-[0_24px_60px_rgba(45,83,150,.16)]" src={post.cover_image} alt={post.cover_alt || post.title} width={1200} height={600} unoptimized />}
      <div className="mt-14 max-w-5xl space-y-9 text-[clamp(1.15rem,1.55vw,1.55rem)] leading-[1.75] text-[#454b59]"><RichText content={post.body} /></div>
      {(olderPost || newerPost) && <nav aria-label="Navegación entre artículos" className="mt-16 flex flex-col gap-4 border-t border-[#dce4f0] pt-8 sm:flex-row sm:items-stretch sm:justify-between">
        {olderPost ? <Link href={`/blog/${olderPost.slug}`} className="group max-w-sm rounded-2xl border border-[#dce4f0] bg-white/70 p-5 transition hover:border-[#0037ff] hover:bg-white"><span className="text-xs font-semibold uppercase tracking-[.18em] text-[#6d7687]">← Anterior</span><span className="mt-2 block text-lg font-semibold leading-6 text-[#252a36] group-hover:text-[#0037ff]">{olderPost.title}</span></Link> : <span />}
        {newerPost ? <Link href={`/blog/${newerPost.slug}`} className="group max-w-sm rounded-2xl border border-[#dce4f0] bg-white/70 p-5 text-right transition hover:border-[#0037ff] hover:bg-white sm:ml-auto"><span className="text-xs font-semibold uppercase tracking-[.18em] text-[#6d7687]">Siguiente →</span><span className="mt-2 block text-lg font-semibold leading-6 text-[#252a36] group-hover:text-[#0037ff]">{newerPost.title}</span></Link> : <span />}
      </nav>}
    </article>
    <SiteFooter />
  </main>;
}
