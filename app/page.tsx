import Image from 'next/image'
import { Archivo, MuseoModerno } from 'next/font/google'
import { MotionLayer } from './components/motion-layer'

const archivo = Archivo({ subsets: ['latin'], weight: ['400', '500', '600'] })
const museo = MuseoModerno({ subsets: ['latin'], weight: ['600', '700', '800'] })

const services = [
  {
    eyebrow: 'Narrativa + Identidad',
    title: 'Creative Content',
    desc: 'Contenido digital que conecta, organiza y hace crecer tu marca.',
    bullets: [
      'Sistemas visuales para comunicar con eficiencia',
      'Contenido y campañas con dirección de arte',
      'Marketing interno e industrial con estándar excepcional',
      'Equipo creativo externo en modelo continuo (fee)',
    ],
    icon: '+',
  },
  {
    eyebrow: 'Producto + Operación',
    title: 'Software Studio',
    desc: 'Plataformas digitales que conectan, optimizan y hacen crecer tu operación.',
    bullets: [
      'Plataformas y productos SaaS',
      'Sitios web y landings de alto impacto',
      'Automatización y herramientas internas',
      'Soluciones a medida con foco de negocio',
    ],
    icon: '◩',
  },
]

const principles = [
  { label: 'Inicio', title: 'Exploramos. Entendemos.', desc: 'Analizamos tu negocio, audiencias y oportunidades para descubrir dónde están las verdaderas conexiones.', icon: '+' },
  { label: 'Desarrollo', title: 'Descubrimos. Creamos la ruta.', desc: 'Diseñamos estructuras y piezas que organizan, escalan y sostienen tu comunicación en el tiempo.', icon: '◩' },
  { label: 'Deployment', title: 'Lanzamos y escalamos impacto.', desc: 'Ejecutamos piezas comunicacionales, experiencias y plataformas con foco en resultados de valor para nuestros clientes.', icon: '×' },
]

export default function KaikWebsite() {
  return (
    <main className={`min-h-screen bg-[radial-gradient(circle_at_top,rgba(91,121,255,0.14),transparent_28%),linear-gradient(135deg,#f6f7fb_0%,#f4f5f9_40%,#eef1fb_100%)] text-[#20222d] ${archivo.className}`}>
      <MotionLayer />
      <section data-hero-scope className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(0,55,255,0.05),transparent_24%),radial-gradient(circle_at_76%_28%,rgba(114,145,255,0.06),transparent_22%),radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.72),transparent_30%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(0,55,255,0.3),transparent)]" />
        <div className="absolute left-[40%] top-[22%] h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,55,255,0.05),transparent_70%)] blur-3xl" />
        <Image
          src="/shape-brand-arc-dot.svg"
          alt=""
          width={282}
          height={284}
          className="brand-shape-float pointer-events-none absolute -right-10 top-24 z-0 hidden w-36 max-w-none [--shape-float-x:-8px] [--shape-float-y:-20px] md:block lg:right-12 lg:w-44"
          aria-hidden="true"
        />
        <Image
          src="/shape-brand-l.svg"
          alt=""
          width={250}
          height={154}
          className="brand-shape-float brand-shape-float-soft pointer-events-none absolute -bottom-8 -left-12 z-0 hidden w-44 max-w-none [--shape-float-x:8px] [--shape-float-y:-16px] md:block lg:left-4 lg:w-56"
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0 hidden md:block">
          <Image
            src="/hero-mascot-final.png?v=20260409-1951"
            alt="Mascota espacial de KAIK"
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
            unoptimized
          />
        </div>
        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-7 pb-10 pt-6 md:px-10 md:pb-12 md:pt-6">
          <header className="reveal flex items-center justify-between">
            <Image
              src="/logo-kaik.svg"
              alt="KAIK"
              width={106}
              height={34}
              className="h-8 w-auto [filter:brightness(0)_saturate(100%)_invert(13%)_sepia(14%)_saturate(643%)_hue-rotate(191deg)_brightness(95%)_contrast(92%)]"
              priority
            />

            <nav className="hidden items-center gap-8 text-sm text-[#444857] md:flex">
              <a href="#services" className="transition-colors duration-300 hover:text-[#1f2330]">Servicios</a>
              <a href="#approach" className="transition-colors duration-300 hover:text-[#1f2330]">Enfoque</a>
              <a
                href="#contact"
                className="rounded-full bg-[#0037FF] px-5 py-2.5 text-white shadow-[0_12px_30px_rgba(0,55,255,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1b4fff]"
              >
                Conecta
              </a>
            </nav>
          </header>

          <div className="grid flex-1 gap-8 pb-4 pt-10 md:grid-cols-[52%_48%] md:items-center md:gap-0 md:pt-10">
            <div className="max-w-[29rem] md:pt-3">
              <div className="reveal inline-flex items-center gap-2 rounded-full border border-[#d9dce6] bg-white/55 px-4 py-2 text-xs text-[#5d6272] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-[#0037FF]" />
                  <span className="h-2 w-2 rounded-full bg-[#0037FF]" />
                </span>
                <span>Creative Content + Software Solutions</span>
              </div>

              <h1 className={`reveal reveal-delay-1 mt-6 text-[clamp(3.1rem,8vw,6.25rem)] font-bold leading-[0.82] tracking-[-0.07em] text-[#7c808d] ${museo.className}`}>
                <span className="block whitespace-nowrap">We explore</span>
                <span className="block text-[#0037FF]">to connect.</span>
                <span className="mt-1 block text-[#2a2d38]">Let&apos;s create.</span>
              </h1>

              <p className="reveal reveal-delay-2 mt-5 max-w-xl text-[0.98rem] leading-7 text-[#696f7d] md:text-[1.02rem]">
                Exploramos para ayudar a las empresas a <strong className="font-semibold text-[#2a2d38]">descubrir nuevas formas</strong> de conectar con sus equipos y clientes, combinando <strong className="font-semibold text-[#2a2d38]">contenido creativo</strong> y <strong className="font-semibold text-[#2a2d38]">plataformas digitales</strong>.
              </p>

              <div className="reveal reveal-delay-2 mt-6 flex items-center gap-3 text-sm font-semibold text-[#666b78]">
                <span>Explorar</span>
                <span>→</span>
                <span>Crear</span>
                <span>→</span>
                <span>Conectar</span>
              </div>

              <div className="reveal reveal-delay-3 mt-7 flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="rounded-full bg-[#0037FF] px-7 py-3.5 text-sm font-medium text-white shadow-[0_16px_40px_rgba(0,55,255,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1b4fff]"
                >
                  Conecta
                </a>
                <a
                  href="#services"
                  className="rounded-full border border-[#d6dae7] bg-white/70 px-7 py-3.5 text-sm font-medium text-[#1b1f2a] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
                >
                  Ver servicios
                </a>
              </div>
            </div>

            <div className="relative min-h-[28rem] md:min-h-[34rem]">
              <div className="relative z-10 flex min-h-[28rem] items-end justify-center gap-5 px-2 pb-8 pt-16 md:min-h-[34rem] md:justify-center md:gap-[1.6rem] md:px-0 md:pb-0 md:pt-[10.5rem]">
                {services.map((card, index) => (
                  <article
                    key={card.title}
                    data-spotlight
                    className={`reveal reveal-zoom ${index === 1 ? 'reveal-delay-1' : ''} glass-card hero-float flex min-h-[19.2rem] w-full max-w-[17.6rem] flex-col rounded-[2rem] border border-white/92 bg-[rgba(255,255,255,0.85)] p-7 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-[20px] supports-[backdrop-filter]:bg-white/85 ${index === 0 ? 'md:-ml-2' : 'hero-float-delay md:ml-1'}`}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-[1.15rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(255,255,255,0.55))] shadow-[inset_0_1px_0_rgba(255,255,255,0.98),0_8px_18px_rgba(180,188,208,0.14)] backdrop-blur-xl">
                      <span className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#0037FF]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#0037FF]" />
                      </span>
                    </div>
                    <div className="mt-6 text-[0.62rem] uppercase tracking-[0.24em] text-[#8a90a1]">{card.eyebrow}</div>
                    <div className={`mt-3 text-[1.72rem] font-bold leading-[0.95] tracking-[-0.045em] text-[#171a24] ${museo.className}`}>
                      {card.title}
                    </div>
                    <p className="mt-3 max-w-[13.8rem] text-[0.95rem] leading-7 text-[#636978]">{card.desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <a
            href="#services"
            className="group absolute bottom-6 right-7 z-20 hidden items-center gap-3 rounded-full border border-white/80 bg-[rgba(255,255,255,0.78)] px-3 py-3 shadow-[0_18px_50px_rgba(0,0,0,0.08)] backdrop-blur-[20px] transition-all duration-300 hover:-translate-y-1 hover:bg-white/90 md:flex md:right-10 md:bottom-8"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0037FF] text-white shadow-[0_10px_24px_rgba(0,55,255,0.24)] transition-transform duration-300 group-hover:translate-y-0.5">
              ↓
            </span>
            <span className="pr-2 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-[#5a6070]">
              Explora
            </span>
          </a>
        </div>
      </section>

      <section id="services" className="relative min-h-screen overflow-hidden px-7 py-8 md:px-10 md:py-8">
        <div className="pointer-events-none absolute right-0 top-0 z-0 hidden h-[48%] w-[48%] md:block">
          <Image
            src="/services-dog-20260411.png"
            alt=""
            fill
            className="object-cover object-top"
            sizes="48vw"
            aria-hidden="true"
            unoptimized
          />
        </div>
        <Image
          src="/shape-brand-corner.svg"
          alt=""
          width={156}
          height={240}
          className="brand-shape-float pointer-events-none absolute right-10 top-16 z-0 hidden w-24 max-w-none [--shape-float-x:-10px] [--shape-float-y:-18px] md:block lg:right-16 lg:w-32"
          aria-hidden="true"
        />
        <Image
          src="/shape-brand-dot.svg"
          alt=""
          width={108}
          height={105}
          className="brand-shape-float brand-shape-float-soft pointer-events-none absolute bottom-16 left-10 z-0 hidden w-10 max-w-none [--shape-float-x:8px] [--shape-float-y:-14px] md:block lg:left-16 lg:w-12"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center">
          <div className="reveal flex items-center justify-between text-sm text-[#5e6372]">
            <span>Servicios</span>
            <Image src="/logo-kaik.svg" alt="KAIK" width={58} height={18} className="h-4 w-auto opacity-75" />
          </div>

          <h2 className={`reveal mt-5 max-w-5xl text-[clamp(2.6rem,5.3vw,4.4rem)] font-bold leading-[0.92] tracking-[-0.05em] text-[#141824] ${museo.className}`}>
            <span className="block">Dos unidades,</span>
            <span className="block">una misma <span className="text-[#0037FF]">lógica de valor.</span></span>
          </h2>
          <p className="reveal reveal-delay-1 mt-3 max-w-2xl text-[0.98rem] leading-7 text-[#676d7b] md:text-base">
            Integramos <strong className="font-semibold text-[#2a2d38]">contenido creativo</strong>, <strong className="font-semibold text-[#2a2d38]">desarrollo digital</strong> e <strong className="font-semibold text-[#2a2d38]">inteligencia artificial</strong> para construir sistemas coherentes, escalables y visualmente más atractivos.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {services.map((item, index) => (
              <article
                key={item.title}
                data-spotlight
                className={`reveal reveal-zoom glass-card ${index === 1 ? 'reveal-delay-1' : ''} relative flex h-full min-h-[22rem] flex-col overflow-hidden rounded-[1.7rem] border border-white/92 bg-[rgba(255,255,255,0.85)] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-[20px] transition-all duration-300 hover:-translate-y-1 supports-[backdrop-filter]:bg-white/85`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-[1.15rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(255,255,255,0.55))] shadow-[inset_0_1px_0_rgba(255,255,255,0.98),0_8px_18px_rgba(180,188,208,0.14)] backdrop-blur-xl">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#0037FF]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#0037FF]" />
                  </span>
                </div>
                <div className="mt-6 text-xs uppercase tracking-[0.24em] text-[#66708e]">{item.eyebrow}</div>
                <h3 className={`mt-4 text-[1.95rem] font-bold leading-[0.95] tracking-[-0.04em] text-[#0037FF] ${museo.className}`}>
                  {item.title}
                </h3>
                <p className="mt-4 max-w-[34rem] text-[0.98rem] leading-7 text-[#6c7280]">{item.desc}</p>
                <div className="mt-5 h-px w-full bg-[linear-gradient(90deg,rgba(0,55,255,0.5),rgba(0,55,255,0.06))]" />
                <div className="mt-5 grid gap-3">
                  {item.bullets.map((bullet) => (
                    <div
                      key={bullet}
                      className="rounded-[1.05rem] border border-white/82 bg-white/60 px-4 py-3 text-[0.94rem] text-[#505665] backdrop-blur-xl"
                    >
                      {bullet}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="approach" className="relative overflow-hidden px-7 py-12 md:px-10 md:py-16">
        <Image
          src="/approach-dog-20260411-1138.png?v=20260411-alpha"
          alt=""
          width={1536}
          height={1024}
          className="pointer-events-none absolute -left-24 top-0 z-0 hidden w-[28rem] max-w-none md:block lg:-left-14 lg:w-[34rem]"
          aria-hidden="true"
          unoptimized
        />
        <Image
          src="/shape-brand-arc.svg"
          alt=""
          width={284}
          height={282}
          className="brand-shape-float brand-shape-float-soft pointer-events-none absolute -left-16 bottom-10 z-0 hidden w-36 max-w-none [--shape-rotate:90deg] [--shape-float-x:10px] [--shape-float-y:-20px] md:block"
          aria-hidden="true"
        />
        <Image
          src="/shape-brand-arc-dot.svg"
          alt=""
          width={282}
          height={284}
          className="brand-shape-float pointer-events-none absolute right-14 top-12 z-0 hidden w-28 max-w-none [--shape-float-x:-8px] [--shape-float-y:-18px] md:block lg:right-20 lg:w-36"
          aria-hidden="true"
        />
        <div className="mx-auto max-w-7xl text-center">
          <div className="reveal text-xs uppercase tracking-[0.28em] text-[#717685]">Enfoque</div>
          <h2 className={`reveal mt-5 text-[clamp(3rem,7vw,5.2rem)] font-bold leading-[0.92] tracking-[-0.06em] text-[#252833] ${museo.className}`}>
            We build
            <span className="block text-[#0037FF]">connections.</span>
          </h2>
          <p className="reveal reveal-delay-1 mx-auto mt-5 max-w-3xl text-base leading-8 text-[#676d7b] md:text-lg">
            No trabajamos piezas aisladas. Diseñamos sistemas y servicios de comunicación + herramientas digitales que hacen que una empresa se vea mejor, comunique mejor y opere con mayor eficiencia.
          </p>
          <div className="relative mt-12 grid gap-6 md:grid-cols-3">
            <div className="absolute bottom-0 left-1/2 hidden h-44 w-[28rem] -translate-x-1/2 rounded-[4rem] bg-[linear-gradient(180deg,rgba(205,210,222,0.42),rgba(245,246,250,0.94))] shadow-[0_30px_60px_rgba(175,181,195,0.16)] md:block" />
            {principles.map((card, index) => (
              <article
                key={card.title}
                data-spotlight
                className={`reveal reveal-zoom ${index === 1 ? 'reveal-delay-1' : index === 2 ? 'reveal-delay-2' : ''} glass-card relative z-10 flex min-h-[23rem] flex-col rounded-[2rem] border border-white/92 bg-[rgba(255,255,255,0.85)] p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-[20px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(0,55,255,0.12)] supports-[backdrop-filter]:bg-white/85 ${index === 0 ? 'md:mt-4' : index === 1 ? 'md:min-h-[24rem]' : 'md:mt-4'}`}
              >
                <div className="mt-4 flex items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[1.15rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(255,255,255,0.55))] shadow-[inset_0_1px_0_rgba(255,255,255,0.98),0_8px_18px_rgba(180,188,208,0.14)] backdrop-blur-xl">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#0037FF]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#0037FF]" />
                    </span>
                  </div>
                </div>
                <div className={`mx-auto mt-8 max-w-[13rem] text-[2rem] font-bold leading-[1.02] tracking-[-0.045em] text-[#0037FF] ${museo.className}`}>
                  {card.title}
                </div>
                <p className="mx-auto mt-5 max-w-[15rem] text-[0.98rem] leading-8 text-[#6c7280]">{card.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="relative overflow-hidden px-7 py-12 md:px-10 md:py-16">
        <div className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-[52%] md:block">
          <Image
            src="/contact-dog-20260411.png"
            alt=""
            fill
            className="object-cover object-center"
            sizes="52vw"
            aria-hidden="true"
            unoptimized
          />
        </div>
        <Image
          src="/shape-brand-diagonal.svg"
          alt=""
          width={170}
          height={238}
          className="brand-shape-float brand-shape-float-soft pointer-events-none absolute right-16 top-8 z-0 hidden w-24 max-w-none [--shape-rotate:-6deg] [--shape-float-x:-10px] [--shape-float-y:-16px] md:block lg:right-24"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.28em] text-[#717685]">Contacto</div>
            <h2 className={`mt-5 text-[clamp(2.8rem,6vw,5rem)] font-bold leading-[0.94] tracking-[-0.05em] text-[#1c202b] ${museo.className}`}>
              Let&apos;s create what <span className="text-[#0037FF]">connects.</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-[#676d7b] md:text-lg">
              Si estás buscando un partner que combine contenido creativo y desarrollo digital con mirada estratégica, conversemos y exploremos juntos para crear algo realmente diferenciador.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:hola@kaik.cl"
              className="rounded-full bg-[#0037FF] px-7 py-3.5 text-sm font-medium text-white shadow-[0_16px_40px_rgba(0,55,255,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1b4fff]"
            >
              hola@kaik.cl
            </a>
            <a
              href="https://calendar.app.google/yj33kB3b1XfCDkQJ9"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[#d9dde8] bg-white/70 px-7 py-3.5 text-sm font-medium text-[#1b1f2a] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
            >
              Agenda una reunión
            </a>
          </div>
        </div>
      </section>

      <footer className="px-7 pb-10 pt-2 md:px-10 md:pb-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 border-t border-white/40 pt-6 md:flex-row">
          <div className="text-center text-sm text-[#6f7482] md:text-left">
            © 2026 KÄIK DIGITAL SOLUTIONS. Todos los derechos reservados.
          </div>

          <a
            href="https://www.linkedin.com/company/k%C3%A4ik-digital-solutions/about/?viewAsMember=true"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-[#616775] transition duration-300 hover:text-[#1f2330]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="h-5 w-5 shrink-0 transition duration-300 group-hover:scale-110"
            >
              <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.03-3.05-1.86-3.05-1.87 0-2.16 1.45-2.16 2.95v5.68H9.31V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.48v6.27ZM5.29 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14Zm1.78 13.02H3.5V9h3.57v11.45ZM22 0H2C.9 0 0 .87 0 1.94v20.12C0 23.13.9 24 2 24h20c1.1 0 2-.87 2-1.94V1.94C24 .87 23.1 0 22 0Z" />
            </svg>
            <span className="text-sm">LinkedIn</span>
          </a>
        </div>
      </footer>
    </main>
  )
}
