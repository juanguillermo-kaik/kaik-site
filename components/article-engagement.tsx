"use client";

import Link from "next/link";
import { useState } from "react";

type RelatedPost = { slug: string; title: string; category: string };

export function ArticleEngagement({ url, relatedPosts }: { url: string; relatedPosts: RelatedPost[] }) {
  const [copied, setCopied] = useState(false);
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const emailUrl = `mailto:?subject=${encodeURIComponent("Artículo de KAIK")}&body=${encodeURIComponent(url)}`;

  async function copyLink() {
    try { await navigator.clipboard.writeText(url); setCopied(true); window.setTimeout(() => setCopied(false), 2200); } catch { window.prompt("Copia este enlace", url); }
  }

  return <section className="mt-20 border-t border-[#dce4f0] pt-12">
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div><p className="text-xs font-semibold uppercase tracking-[.22em] text-[#8a94a5]">¿Te pareció interesante?</p><h2 className="mt-3 text-2xl font-semibold tracking-[-.04em] text-[#262b37]">Comparte esta idea</h2></div>
      <div className="flex flex-wrap gap-3"><a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#d8e0ed] bg-white px-4 py-2.5 text-sm font-semibold text-[#3f4756] transition hover:border-[#0037ff] hover:text-[#0037ff]">LinkedIn</a><button type="button" onClick={copyLink} className="rounded-full border border-[#d8e0ed] bg-white px-4 py-2.5 text-sm font-semibold text-[#3f4756] transition hover:border-[#0037ff] hover:text-[#0037ff]">{copied ? "Enlace copiado" : "Copiar enlace"}</button><a href={emailUrl} className="rounded-full border border-[#d8e0ed] bg-white px-4 py-2.5 text-sm font-semibold text-[#3f4756] transition hover:border-[#0037ff] hover:text-[#0037ff]">Email</a></div>
    </div>
    {relatedPosts.length > 0 && <div className="mt-16"><p className="text-xs font-semibold uppercase tracking-[.22em] text-[#8a94a5]">Sigue explorando</p><div className="mt-5 grid gap-3 md:grid-cols-3">{relatedPosts.map((related) => <Link key={related.slug} href={`/blog/${related.slug}`} className="group rounded-2xl border border-[#dce4f0] bg-white/70 p-5 transition hover:-translate-y-0.5 hover:border-[#0037ff] hover:bg-white"><span className="text-xs font-semibold uppercase tracking-[.16em] text-[#0037ff]">{related.category}</span><span className="mt-3 block font-semibold leading-6 text-[#313846] group-hover:text-[#0037ff]">{related.title}</span><span className="mt-4 block text-sm font-semibold text-[#0037ff]">Leer artículo →</span></Link>)}</div></div>}
    <div className="mt-16 overflow-hidden rounded-[2rem] bg-[linear-gradient(120deg,#edf5ff,#fff_56%,#eaf2ff)] p-8 md:p-10"><p className="text-xs font-semibold uppercase tracking-[.22em] text-[#0037ff]">¿Tienes un desafío que quieras explorar?</p><div className="mt-5 flex flex-col gap-7 md:flex-row md:items-end md:justify-between"><div className="max-w-2xl"><h2 className="text-3xl font-semibold tracking-[-.05em] text-[#252a36]">Transformemos ideas y problemas en soluciones.</h2><p className="mt-4 text-base leading-7 text-[#626b7a]">En KAIK combinamos estrategia, creatividad y tecnología para construir experiencias que conectan.</p></div><a href="https://calendar.app.google/V4MkrusEFnESRAuaA" target="_blank" rel="noopener noreferrer" className="shrink-0 rounded-full bg-[#0037ff] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(0,55,255,.18)] transition hover:-translate-y-0.5 hover:bg-[#1b4fff]">Conversemos →</a></div><p className="mt-9 text-sm font-medium text-[#394257]">We explore to connect. Let&apos;s create. 🚀</p></div>
  </section>;
}
