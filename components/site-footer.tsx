export function SiteFooter() {
  return <footer className="px-7 pb-10 pt-2 md:px-10 md:pb-12">
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 border-t border-white/40 pt-6 md:flex-row">
      <div className="text-center text-sm text-[#6f7482] md:text-left">© 2026 KÄIK DIGITAL SOLUTIONS. Todos los derechos reservados.</div>
      <a href="https://www.linkedin.com/company/k%C3%A4ik-digital-solutions/about/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-[#616775] transition duration-300 hover:text-[#1f2330]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5 shrink-0 transition duration-300 group-hover:scale-110"><path d="M20.45 20.45h-3.56v-5.58c0-1.33-.03-3.05-1.86-3.05-1.87 0-2.16 1.45-2.16 2.95v5.68H9.31V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.48v6.27ZM5.29 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14Zm1.78 13.02H3.5V9h3.57v11.45ZM22 0H2C.9 0 0 .87 0 1.94v20.12C0 23.13.9 24 2 24h20c1.1 0 2-.87 2-1.94V1.94C24 .87 23.1 0 22 0Z" /></svg>
        <span className="text-sm">LinkedIn</span>
      </a>
    </div>
  </footer>;
}
