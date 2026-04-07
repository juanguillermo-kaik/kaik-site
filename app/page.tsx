'use client'

import { useEffect } from 'react'
import { Archivo, MuseoModerno } from 'next/font/google'

const archivo = Archivo({ subsets: ['latin'], weight: ['400', '500', '600'] })
const museo = MuseoModerno({ subsets: ['latin'], weight: ['600', '700', '800'] })

export default function KaikWebsite() {
  const services = [
    {
      title: 'Creative Content',
      desc: 'Servicios creativos que potencian la comunicación y ordenan la gestión, funcionando como un equipo externo que aporta estrategia, ejecución y continuidad.',
      bullets: [
        'Branding y sistema visual',
        'Contenido audiovisual',
        'Campañas y comunicación interna',
        'Diseño y creatividad continua',
      ],
    },
    {
      title: 'Software Studio',
      desc: 'Plataformas digitales, productos SaaS y desarrollo a medida para optimizar procesos y comunicación.',
      bullets: [
        'Desarrollo de plataformas',
        'Productos digitales',
        'Sitios web y landings',
        'Soluciones a medida',
      ],
    },
  ]

  useEffect(() => {
    const cursor = document.getElementById('cursor-halo')

    const move = (e: MouseEvent) => {
      if (!cursor) return
      cursor.style.transform = `translate(${e.clientX - 90}px, ${e.clientY - 90}px)`
    }

    const reveals = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    reveals.forEach((el) => io.observe(el))
    window.addEventListener('mousemove', move)

    return () => {
      window.removeEventListener('mousemove', move)
      io.disconnect()
    }
  }, [])

  return (
    <>
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        ::selection {
          background: #1016f8;
          color: white;
        }

        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.65s ease, transform 0.65s ease;
        }

        .reveal.in {
          opacity: 1;
          transform: translateY(0);
        }

        .reveal-delay-1 {
          transition-delay: 0.1s;
        }

        .reveal-delay-2 {
          transition-delay: 0.2s;
        }

        .reveal-delay-3 {
          transition-delay: 0.3s;
        }

        .btn-primary {
          position: relative;
          overflow: hidden;
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.6s ease;
        }

        .btn-primary:hover::before {
          left: 100%;
        }
      `}</style>

      <div className={`min-h-screen bg-black text-white ${archivo.className}`}>
        <div
          id="cursor-halo"
          className="pointer-events-none fixed z-50 h-[180px] w-[180px] rounded-full bg-[radial-gradient(circle,rgba(16,22,248,0.22),transparent_70%)] blur-xl transition-transform duration-100"
        />

        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,22,248,0.35),transparent_30%),radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_25%)]" />

          <div className="relative mx-auto max-w-6xl px-6 py-10">
            <header className="flex items-center justify-between">
              <img src="/logo-kaik.svg" alt="KAIK" className="h-8 w-auto" />
              <nav className="hidden gap-8 text-sm text-white/70 md:flex">
                <a href="#services" className="hover:text-white">Servicios</a>
                <a href="#contact" className="hover:text-white">Contacto</a>
              </nav>
            </header>

            <div className="py-20 md:py-28">
              <div className="reveal mb-4 inline-block border border-[#1016f8] px-4 py-2 text-xs tracking-[0.25em] text-[#1016f8]">
                CREATIVE + SOFTWARE SOLUTIONS
              </div>

              <h1 className={`reveal reveal-delay-1 max-w-3xl text-5xl font-bold leading-[0.95] md:text-7xl ${museo.className}`}>
                <span className="block whitespace-nowrap">
                  We build what <span className="text-[#1016f8]">connects</span>.
                </span>
                <span className="block mt-2">Let’s create.</span>
              </h1>

              <p className="reveal reveal-delay-2 mt-6 max-w-xl text-base leading-7 text-white/70 md:text-lg">
                KAIK combina estrategia, creatividad y tecnología para ayudar a las empresas a conectar mejor con sus equipos, clientes y negocios.
              </p>

              <div className="reveal reveal-delay-3 mt-8 flex gap-4">
                <a
                  href="#contact"
                  className="btn-primary rounded-xl bg-[#1016f8] px-6 py-3 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1b20ff] hover:shadow-lg hover:shadow-[#1016f8]/20"
                >
                  Hablemos
                </a>
                <a
                  href="#services"
                  className="rounded-xl border border-white/15 px-6 py-3 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.04]"
                >
                  Ver servicios
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-2xl reveal">
            <h2 className={`text-3xl font-semibold md:text-5xl ${museo.className}`}>
              Dos unidades, una misma lógica de valor.
            </h2>
            <p className="mt-4 text-white/70">
              Integramos contenido creativo y desarrollo digital para construir soluciones completas, coherentes y escalables.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {services.map((item, index) => (
              <div
                key={item.title}
                className={`reveal ${index === 0 ? 'reveal-delay-1' : 'reveal-delay-2'} rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/30 ${index === 1 ? 'bg-[#1016f8] text-white hover:bg-[#1b20ff]' : 'border border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]'}`}
              >
                <h3 className="text-2xl font-semibold">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/80">{item.desc}</p>

                <div className="mt-6 grid gap-2">
                  {item.bullets.map((b) => (
                    <div key={b} className="text-sm text-white/70">
                      • {b}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.02]">
          <div className="mx-auto max-w-6xl px-6 py-20 reveal">
            <h2 className={`max-w-3xl text-3xl font-semibold md:text-5xl ${museo.className}`}>
              Creamos soluciones que conectan ideas, equipos y negocio.
            </h2>
            <p className="mt-6 max-w-2xl text-white/70">
              No trabajamos piezas aisladas. Diseñamos sistemas de comunicación y herramientas digitales que permiten a las empresas avanzar con claridad, consistencia y foco.
            </p>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-6xl px-6 py-20">
          <div className="reveal rounded-3xl border border-white/10 bg-[linear-gradient(135deg,rgba(16,22,248,0.2),rgba(255,255,255,0.05))] p-10 transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-[#1016f8]/10">
            <h2 className={`text-3xl font-semibold md:text-5xl ${museo.className}`}>
              Let’s create what connects.
            </h2>
            <p className="mt-4 text-white/70">
              Si estás buscando un partner que combine contenido creativo y desarrollo digital con mirada estratégica, conversemos.
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="mailto:juanguillermo@kaik.cl"
                className="rounded-xl bg-white px-6 py-3 text-sm font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-lg hover:shadow-white/10"
              >
                hola@kaik.cl
              </a>
              <a
                href="https://calendar.app.google/yj33kB3b1XfCDkQJ9"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-white/15 px-6 py-3 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.04]"
              >
                Agenda una reunión
              </a>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/10 px-6 py-10">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
            <div className="text-center text-sm text-white/50 md:text-left">
              © 2026 KÄIK DIGITAL SOLUTIONS. Todos los derechos reservados.
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/company/k%C3%A4ik-digital-solutions/about/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-white/60 transition hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5 transition group-hover:scale-110"
                >
                  <path d="M19 0h-14C2.239 0 1 1.239 1 3v18c0 1.761 1.239 3 3 3h14c1.761 0 3-1.239 3-3V3c0-1.761-1.239-3-3-3zM7 20H4V9h3v11zM5.5 7.732C4.672 7.732 4 7.06 4 6.232s.672-1.5 1.5-1.5S7 5.404 7 6.232s-.672 1.5-1.5 1.5zM20 20h-3v-5.604c0-1.337-.027-3.059-1.865-3.059-1.867 0-2.154 1.459-2.154 2.963V20h-3V9h2.881v1.507h.041c.401-.761 1.381-1.562 2.844-1.562 3.041 0 3.604 2.002 3.604 4.604V20z" />
                </svg>
                <span className="text-sm">LinkedIn</span>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
