import Image from "next/image";
import Link from "next/link";

export function SiteNavigation({ article = false }: { article?: boolean }) {
  return <header className={`mx-auto flex items-center justify-between px-7 py-7 md:px-10 ${article ? "max-w-4xl" : "max-w-7xl"}`}>
    <Link href="/" aria-label="KAIK, inicio">
      <Image src="/logo-kaik.svg" alt="KAIK" width={106} height={34} className="h-8 w-auto [filter:brightness(0)_saturate(100%)_invert(13%)_sepia(14%)_saturate(643%)_hue-rotate(191deg)_brightness(95%)_contrast(92%)]" priority />
    </Link>
    <nav className="hidden items-center gap-5 text-[0.78rem] text-[#444857] md:flex lg:gap-8 lg:text-sm">
      <Link href="/#services" className="transition-colors duration-300 hover:text-[#1f2330]">Servicios</Link>
      <Link href="/#approach" className="transition-colors duration-300 hover:text-[#1f2330]">Enfoque</Link>
      <Link href="/blog" className="font-medium text-[#1f2330]">Blog</Link>
      <Link href="/#contact" className="transition-colors duration-300 hover:text-[#1f2330]">Contacto</Link>
      <a href="https://calendar.app.google/V4MkrusEFnESRAuaA" target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#0037ff] px-5 py-2.5 text-white shadow-[0_12px_30px_rgba(0,55,255,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1b4fff]">Agenda</a>
    </nav>
    {article && <Link href="/blog" className="text-sm font-semibold text-[#0037ff] md:hidden">← Blog</Link>}
  </header>;
}
