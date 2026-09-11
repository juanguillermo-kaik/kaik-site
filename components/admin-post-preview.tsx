"use client";

import Image from "next/image";
import { RichText } from "@/components/rich-text";

type PreviewPost = { title: string; excerpt: string; body: string; category: string; cover_image: string | null; cover_alt: string | null };

export function AdminPostPreview({ form, close }: { form: PreviewPost; close: () => void }) {
  return <div role="dialog" aria-modal="true" aria-label="Vista previa de entrada" className="fixed inset-0 z-50 overflow-y-auto bg-[#122143]/35 p-4 backdrop-blur-sm md:p-8"><div className="mx-auto min-h-full max-w-6xl rounded-[2rem] bg-[#f5f8ff] shadow-[0_28px_80px_rgba(18,33,67,.3)]"><div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#dce4f0] bg-white/95 px-6 py-4 backdrop-blur md:px-10"><p className="text-sm font-semibold text-[#1371fa]">Vista previa sin guardar</p><button type="button" onClick={close} className="rounded-full bg-[#eef1f5] px-5 py-2.5 text-sm font-semibold text-[#626b79]">Cerrar</button></div><article className="mx-auto max-w-7xl px-7 pb-16 pt-14 md:px-10 md:pt-20"><p className="text-xs font-semibold uppercase tracking-[.28em] text-[#0037ff]">{form.category || "KAIK"}</p><h1 className="mt-5 max-w-4xl text-[clamp(3rem,7vw,6rem)] font-bold leading-[.96] tracking-[-.07em] text-[#20222d]">{form.title || "Título de la entrada"}</h1><p className="mt-7 max-w-3xl text-xl leading-8 text-[#5f6675]">{form.excerpt || "La bajada aparecerá aquí para acompañar el título."}</p>{form.cover_image && <Image className="mt-12 aspect-[16/8] w-full rounded-[2rem] object-cover shadow-[0_24px_60px_rgba(45,83,150,.16)]" src={form.cover_image} alt={form.cover_alt || form.title || "Portada"} width={1200} height={600} unoptimized />}<div className="mt-14 max-w-5xl space-y-9 text-lg leading-9 text-[#454b59]"><RichText content={form.body || "El contenido de la entrada aparecerá aquí."} /></div></article></div></div>;
}
