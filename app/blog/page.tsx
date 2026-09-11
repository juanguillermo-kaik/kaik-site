import type { Metadata } from "next";
import Link from "next/link";
import { Archivo, MuseoModerno } from "next/font/google";
import { getPublishedPosts } from "@/lib/blog";

const archivo = Archivo({ subsets: ["latin"], weight: ["400", "500", "600"] });
const museo = MuseoModerno({ subsets: ["latin"], weight: ["600", "700", "800"] });

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Blog | KAIK",
  description: "Ideas sobre creatividad, tecnología, software e inteligencia artificial para empresas que quieren conectar y crecer.",
  alternates: { canonical: "/blog" },
};

function dateLabel(value: string | null) {
  if (!value) return "Próximamente";
  return new Intl.DateTimeFormat("es-CL", { day: "numeric", month: "long", year: "numeric" }).format(new Date(value));
}

export default async function BlogPage() {
  const posts = await getPublishedPosts();
  return <main className={`min-h-screen bg-[radial-gradient(circle_at_7%_15%,rgba(151,199,255,.46),transparent_26rem),linear-gradient(130deg,#edf5ff,#fff_48%,#eff6ff)] text-[#20222d] ${archivo.className}`}>
    <header className="mx-auto flex max-w-7xl items-center justify-between px-7 py-7 md:px-10">
      <Link href="/" className="text-2xl font-black tracking-[-.15em] text-[#161923]">KÄIK</Link>
      <Link href="/" className="rounded-full border border-[#d8dfec] bg-white/70 px-5 py-2.5 text-sm font-medium transition hover:border-[#0037ff] hover:text-[#0037ff]">Volver al sitio</Link>
    </header>
    <section className="mx-auto max-w-7xl px-7 pb-20 pt-14 md:px-10 md:pt-24">
      <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#0037ff]">Ideas para conectar</p>
      <h1 className={`mt-5 max-w-3xl text-[clamp(3.4rem,8vw,7rem)] font-bold leading-[.85] tracking-[-.07em] ${museo.className}`}>Pensamos, creamos y <span className="text-[#0037ff]">conectamos.</span></h1>
      <p className="mt-7 max-w-2xl text-lg leading-8 text-[#606777]">Perspectivas de KAIK sobre comunicación, diseño, tecnología y las herramientas que hacen crecer a las empresas.</p>
      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => <article key={post.id} className="group flex min-h-80 flex-col rounded-[2rem] border border-white/80 bg-white/75 p-7 shadow-[0_24px_60px_rgba(45,83,150,.10)] backdrop-blur">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[.18em] text-[#0037ff]"><span>{post.category}</span><span className="text-[#9298a6]">{dateLabel(post.published_at)}</span></div>
          <h2 className={`mt-9 text-3xl font-bold leading-[.94] tracking-[-.05em] ${museo.className}`}>{post.title}</h2>
          <p className="mt-5 text-[.98rem] leading-7 text-[#656c7a]">{post.excerpt}</p>
          <Link href={`/blog/${post.slug}`} className="mt-auto pt-8 text-sm font-semibold text-[#0037ff] transition group-hover:translate-x-1">Leer artículo <span aria-hidden="true">→</span></Link>
        </article>)}
      </div>
    </section>
  </main>;
}
