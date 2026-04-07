import Image from 'next/image'
import { Archivo, MuseoModerno } from 'next/font/google'
import { MotionLayer } from './components/motion-layer'

const archivo = Archivo({ subsets: ['latin'], weight: ['400', '500', '600'] })
const museo = MuseoModerno({ subsets: ['latin'], weight: ['600', '700', '800'] })

const services = [
  {
    title: 'Creative Content',
    eyebrow: 'Narrativa + Identidad',
    desc: 'Diseñamos sistemas creativos que ordenan la comunicación, elevan la percepción de marca y sostienen la ejecución en el tiempo.',
    bullets: [
      'Branding y sistema visual',
      'Contenido audiovisual y campañas',
      'Comunicación interna con criterio editorial',
      'Diseño continuo para equipos en movimiento',
    ],
  },
  {
    title: 'Software Studio',
    eyebrow: 'Producto + Operación',
    desc: 'Construimos productos y plataformas que mejoran procesos, experiencia y capacidad de crecimiento sin sumar complejidad innecesaria.',
    bullets: [
      'Plataformas y productos SaaS',
      'Sitios web y landings de alto impacto',
      'Automatización y herramientas internas',
      'Soluciones a medida con foco de negocio',
    ],
  },
]

const highlights = [
  'Integramos creatividad, tecnología e IA en flujos de trabajo con criterio real de negocio',
  'Diseñamos soluciones donde las ideas, la estructura y la ejecución avanzan en la misma dirección',
  'Usamos IA para acelerar procesos sin perder control, calidad ni identidad de marca',
]

const stats = [
  { value: '2', label: 'unidades integradas' },
  { value: '1', label: 'criterio de producto' },
  { value: '∞', label: 'iteración y mejora' },
]

export default function KaikWebsite() {
  return (
    <main className={`min-h-screen overflow-x-hidden text-white ${archivo.className}`}>
      <MotionLayer />

      <section className="relative isolate overflow-hidden border-b border-white/10">
        <div className="editorial-grid" />
        <div className="brand-shape shape-quarter right-[3.5rem] top-[3rem] hidden xl:block" />
        <div className="brand-shape shape-l right-[8.5rem] top-[12.5rem] hidden xl:block" />
        <div className="brand-shape shape-dot right-[13.5rem] bottom-[8.5rem] hidden xl:block" />
        <div className="brand-shape shape-slash right-[2.5rem] bottom-[-1.5rem] hidden xl:block" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_20%,transparent_82%,rgba(0,55,255,0.08))]" />

        <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-8 md:pb-24 md:pt-10">
          <header className="reveal flex items-center justify-between">
            <Image src="/logo-kaik.svg" alt="KAIK" width={104} height={36} className="h-8 w-auto md:h-9" priority />
            <nav className="hidden gap-8 text-sm text-white/68 md:flex">
              <a className="transition-colors duration-300 hover:text-white" href="#services">
                Servicios
              </a>
              <a className="transition-colors duration-300 hover:text-white" href="#approach">
                Enfoque
              </a>
              <a className="transition-colors duration-300 hover:text-white" href="#contact">
                Contacto
              </a>
            </nav>
          </header>

          <div className="grid gap-14 py-18 md:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] md:items-end md:py-24">
            <div>
              <div className="reveal section-kicker">
                Creative + Software solutions
              </div>

              <div className="reveal-line reveal-delay-1 mt-6 h-px w-28 bg-[linear-gradient(90deg,#0037FF,rgba(0,55,255,0.08))]" />

              <h1 className={`reveal reveal-delay-1 mt-8 max-w-4xl text-5xl font-bold leading-[0.92] tracking-[-0.04em] md:text-7xl lg:text-[5.7rem] ${museo.className}`}>
                <span className="block">We build what</span>
                <span className="text-gradient block">connects.</span>
                <span className="mt-2 block text-white">Let&apos;s create.</span>
              </h1>

              <p className="reveal reveal-delay-2 mt-7 max-w-2xl text-base leading-8 text-white/72 md:text-lg">
                KAIK combina estrategia, creatividad y tecnología para construir soluciones, productos y experiencias que conectan mejor a las empresas con sus equipos, clientes y oportunidades de negocio.
              </p>

              <div className="reveal reveal-delay-3 mt-9 flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="button-shine ambient-pulse rounded-full bg-[#0037FF] px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1B4FFF] hover:shadow-[0_18px_40px_rgba(0,55,255,0.28)]"
                >
                  Hablemos
                </a>
                <a
                  href="#services"
                  className="rounded-full border border-white/14 bg-white/[0.03] px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/26 hover:bg-white/[0.06]"
                >
                  Ver servicios
                </a>
              </div>

              <div className="mt-12 grid gap-4 md:max-w-2xl md:grid-cols-3">
                {stats.map((item, index) => (
                  <div
                    key={item.label}
                    className={`brand-panel brand-panel-dark reveal ${index === 0 ? 'reveal-delay-1' : index === 1 ? 'reveal-delay-2' : 'reveal-delay-3'} rounded-2xl px-5 py-5`}
                    data-spotlight
                  >
                    <div className={`text-3xl font-semibold tracking-[-0.04em] ${museo.className}`}>{item.value}</div>
                    <div className="mt-2 text-sm text-white/65">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal reveal-zoom reveal-delay-2">
              <div className="brand-panel brand-panel-dark floating-panel rounded-[2rem] p-6 md:p-7" data-spotlight>
                <div className="brand-content">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.28em] text-white/48">
                    <span>Empathy + AI - powered solutions</span>
                    <span>01</span>
                  </div>

                  <div className="mt-8 grid gap-4">
                    {highlights.map((item, index) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]"
                      >
                        <div className="text-xs uppercase tracking-[0.24em] text-[#7F9AFF]">
                          0{index + 1}
                        </div>
                        <p className="mt-2 text-sm leading-7 text-white/78">{item}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 rounded-2xl border border-[#0037FF]/30 bg-[linear-gradient(135deg,rgba(0,55,255,0.24),rgba(255,255,255,0.03))] p-5">
                    <div className="text-xs uppercase tracking-[0.24em] text-white/52">Experiencia junto a grandes empresas</div>
                    <p className="mt-3 max-w-sm text-sm leading-7 text-white/78">
                      Incorporamos nuestro know-how en experiencias, procesos y herramientas para crear soluciones más ágiles, escalables y útiles para cada cliente.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="relative mx-auto max-w-6xl px-6 py-22 md:py-28">
        <div className="reveal section-kicker">Servicios</div>
        <div className="mt-6 max-w-3xl">
          <h2 className={`reveal reveal-delay-1 text-3xl font-semibold tracking-[-0.04em] md:text-5xl ${museo.className}`}>
            Dos unidades, una misma lógica de valor.
          </h2>
          <p className="reveal reveal-delay-2 mt-5 max-w-2xl text-base leading-8 text-white/68">
            Integramos contenido creativo y desarrollo digital para construir sistemas coherentes, escalables y mucho más interesantes visualmente.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {services.map((item, index) => (
            <article
              key={item.title}
              data-spotlight
              className={`brand-panel ${index === 1 ? 'brand-panel-blue text-white' : 'brand-panel-dark'} reveal ${index === 0 ? 'reveal-delay-1' : 'reveal-delay-2'} group rounded-[2rem] p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-white/20 md:p-9`}
            >
              <div className="brand-content">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className={`text-xs uppercase tracking-[0.24em] ${index === 1 ? 'text-white/72' : 'text-[#7F9AFF]'}`}>{item.eyebrow}</div>
                    <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white md:text-[2rem]">
                      {item.title}
                    </h3>
                  </div>
                  <div className="rounded-full border border-white/12 px-3 py-1 text-xs uppercase tracking-[0.22em] text-white/60 transition-colors duration-300 group-hover:border-[#0037FF]/40 group-hover:text-white/88">
                    0{index + 1}
                  </div>
                </div>

                <p className="mt-6 max-w-lg text-sm leading-8 text-white/80 md:text-[0.98rem]">
                  {item.desc}
                </p>

                <div className={`mt-8 h-px w-full ${index === 1 ? 'bg-[linear-gradient(90deg,rgba(255,255,255,0.88),rgba(255,255,255,0.08))]' : 'bg-[linear-gradient(90deg,rgba(0,55,255,0.8),rgba(255,255,255,0.08))]'}`} />

                <div className="mt-8 grid gap-3">
                  {item.bullets.map((bullet) => (
                    <div
                      key={bullet}
                      className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition-colors duration-300 group-hover:text-white/92 ${index === 1 ? 'border-white/16 bg-black/18 text-white/82' : 'border-white/10 bg-white/[0.03] text-white/70'}`}
                    >
                      <span className={`h-2 w-2 rounded-full ${index === 1 ? 'bg-white' : 'bg-[#0037FF]'}`} />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="approach"
        className="relative overflow-hidden border-y border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))]"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(0,55,255,0.9),transparent)]" />
        <div className="brand-shape shape-dot right-[8rem] top-[7rem] hidden xl:block" />
        <div className="brand-shape shape-dot right-[7.4rem] top-[20.8rem] hidden xl:block" />
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-22 md:grid-cols-[minmax(0,1.1fr)_minmax(260px,0.9fr)] md:items-center md:py-24">
          <div>
            <div className="reveal section-kicker">Enfoque</div>
            <h2 className={`reveal reveal-delay-1 mt-6 max-w-3xl text-3xl font-semibold tracking-[-0.04em] md:text-5xl ${museo.className}`}>
              Creamos experiencias que conectan ideas, equipos y negocio.
            </h2>
            <p className="reveal reveal-delay-2 mt-6 max-w-2xl text-base leading-8 text-white/68">
              No trabajamos piezas aisladas. Diseñamos sistemas y servicios de comunicación y herramientas digitales que hacen que una empresa se vea mejor, comunique mejor y opere con mayor eficiencia.
            </p>
          </div>

          <div className="reveal reveal-delay-3">
            <div className="brand-panel brand-panel-dark rounded-[2rem] p-6 md:p-7" data-spotlight>
              <div className="brand-content">
                <div className="text-xs uppercase tracking-[0.24em] text-white/48">Principios</div>
                <div className="mt-6 grid gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4">
                    <div className="text-sm font-medium text-white">Claridad visual</div>
                    <p className="mt-2 text-sm leading-7 text-white/66">Movimiento y estética al servicio del mensaje, no del adorno.</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4">
                    <div className="text-sm font-medium text-white">Ritmo narrativo</div>
                    <p className="mt-2 text-sm leading-7 text-white/66">Cada bloque entra con intención para sostener atención y jerarquía.</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4">
                    <div className="text-sm font-medium text-white">Tecnología sobria</div>
                    <p className="mt-2 text-sm leading-7 text-white/66">Interactividad ligera, accesible y alineada con performance.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-6 py-22 md:py-28">
        <div
          data-spotlight
          className="brand-panel reveal rounded-[2rem] border-[#0037FF]/24 bg-[linear-gradient(135deg,rgba(0,0,0,0.96),rgba(0,0,0,0.9))] p-8 md:p-10"
        >
          <div className="brand-shape shape-quarter right-[3rem] top-[2.75rem] hidden xl:block" />
          <div className="brand-shape shape-l right-[6rem] bottom-[2.5rem] hidden xl:block" />
          <div className="brand-content">
            <div className="section-kicker">Contacto</div>
            <h2 className={`reveal reveal-delay-1 mt-6 text-3xl font-semibold tracking-[-0.04em] md:text-5xl ${museo.className}`}>
              Let&apos;s create what connects.
            </h2>
            <p className="reveal reveal-delay-2 mt-5 max-w-2xl text-base leading-8 text-white/72 md:pr-18 lg:pr-30 xl:pr-40">
              Si estás buscando un partner que combine contenido creativo y desarrollo digital con mirada estratégica, conversemos y creemos algo realmente diferenciador.
            </p>

            <div className="reveal reveal-delay-3 mt-8 flex flex-wrap gap-4">
              <a
                href="mailto:hola@kaik.cl"
                className="button-shine rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/92 hover:shadow-[0_20px_48px_rgba(255,255,255,0.14)]"
              >
                hola@kaik.cl
              </a>
              <a
                href="https://calendar.app.google/yj33kB3b1XfCDkQJ9"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/14 bg-white/[0.03] px-7 py-3.5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:border-white/26 hover:bg-white/[0.06]"
              >
                Agenda una reunión
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center text-sm text-white/45 md:text-left">
            © 2026 KÄIK DIGITAL SOLUTIONS. Todos los derechos reservados.
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/company/k%C3%A4ik-digital-solutions/about/?viewAsMember=true"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-white/58 transition duration-300 hover:text-white"
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
        </div>
      </footer>
    </main>
  )
}
