import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Archivo, MuseoModerno } from "next/font/google";
import { getPublishedPost } from "@/lib/blog";

const archivo = Archivo({ subsets: ["latin"], weight: ["400", "500", "600"] });
const museo = MuseoModerno({ subsets: ["latin"], weight: ["600", "700", "800"] });
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = await getPublishedPost((await params).slug);
  if (!post) return {};
  return { title: post.seo_title || `${post.title} | KAIK`, description: post.seo_description || post.excerpt, alternates: { canonical: `/blog/${post.slug}` }, openGraph: { title: post.seo_title || post.title, description: post.seo_description || post.excerpt, type: "article", publishedTime: post.published_at || undefined, images: post.cover_image ? [post.cover_image] : undefined } };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const post = await getPublishedPost((await params).slug);
  if (!post) notFound();
  return <main className={`min-h-screen bg-[linear-gradient(140deg,#eff6ff,#fff_54%,#edf5ff)] text-[#20222d] ${archivo.className}`}>
    <header className="mx-auto flex max-w-4xl items-center justify-between px-7 py-7 md:px-10"><Link href="/" className="text-2xl font-black tracking-[-.15em] text-[#161923]">KÄIK</Link><Link href="/blog" className="text-sm font-semibold text-[#0037ff]">← Blog</Link></header>
    <article className="mx-auto max-w-4xl px-7 pb-24 pt-14 md:px-10 md:pt-24">
      <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#0037ff]">{post.category}</p>
      <h1 className={`mt-5 max-w-3xl text-[clamp(3.2rem,7vw,6.2rem)] font-bold leading-[.88] tracking-[-.07em] ${museo.className}`}>{post.title}</h1>
      <p className="mt-7 max-w-2xl text-xl leading-8 text-[#5f6675]">{post.excerpt}</p>
      {post.cover_image && <Image className="mt-12 aspect-[16/8] w-full rounded-[2rem] object-cover shadow-[0_24px_60px_rgba(45,83,150,.16)]" src={post.cover_image} alt="" width={1200} height={600} unoptimized />}
      <div className="mt-12 max-w-2xl space-y-7 text-lg leading-9 text-[#454b59]">{post.body.split(/\n\s*\n/).filter(Boolean).map((paragraph: string, index: number) => <p key={index}>{paragraph}</p>)}</div>
    </article>
  </main>;
}
