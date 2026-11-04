import { ArrowRight, WhatsappLogo } from '@phosphor-icons/react'
import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { SOCIAL } from '../lib/content'
import { trackWhatsappClick, whatsappUrl } from '../lib/lead'
import { Logo } from './Header'
import { Marquee } from './ui'

const BANNER = ['Sua empresa cresceu', 'Seu sistema também']

export function Footer() {
  return (
    <footer className="night overflow-hidden border-t border-line">
      {/* Faixa gigante, decorativa */}
      <div aria-hidden className="select-none py-10 sm:py-14">
        <Marquee speed={55}>
          {[...BANNER, ...BANNER].map((t, i) => (
            <span
              key={i}
              className={`flex items-center whitespace-nowrap px-6 font-display text-[clamp(3.5rem,11vw,10rem)] font-bold leading-none tracking-tighter ${
                i % 2 ? 'text-outline' : 'text-ink'
              }`}
            >
              {t}
              <span className="ml-12 inline-block size-4 rounded-full bg-cta sm:size-6" />
            </span>
          ))}
        </Marquee>
      </div>

      <div className="container-lp grid gap-10 border-t border-line py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <Logo forceLight />
          <p className="max-w-[28ch] text-ink-2">Transformando sonhos em realidade através da tecnologia</p>
        </div>
        <nav aria-label="Rodapé" className="flex flex-col gap-2">
          <p className="mb-1 font-display text-sm font-bold">Navegação</p>
          <a className="text-ink-2 hover:text-ink" href="https://unect.com.br/#quem-somos">Quem somos</a>
          <a className="text-ink-2 hover:text-ink" href="#modulos">Soluções</a>
          <a className="text-ink-2 hover:text-ink" href="#diagnostico">Fale conosco</a>
        </nav>
        <div className="flex flex-col gap-2">
          <p className="mb-1 font-display text-sm font-bold">Contato</p>
          <a className="text-ink-2 hover:text-ink" href="mailto:unect@unect.com.br">unect@unect.com.br</a>
          <a className="text-ink-2 hover:text-ink" href={whatsappUrl()} target="_blank" rel="noopener noreferrer" onClick={trackWhatsappClick}>
            (43) 8869-6363 (WhatsApp)
          </a>
          <ul className="mt-2 flex gap-4">
            {SOCIAL.map((s) => (
              <li key={s.label}>
                <a className="text-ink-2 hover:text-ink" href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <address className="flex flex-col gap-2 not-italic">
          <p className="mb-1 font-display text-sm font-bold">Endereço</p>
          <span className="text-ink-2">Rua dos Expedicionários, 568, Sala Q 103-B, Vila Daher, Cornélio Procópio/PR</span>
        </address>
      </div>
      <div className="border-t border-line py-6 pb-28 text-center text-[0.9375rem] text-ink-2 lg:pb-6">
        © 2026 Unect Jr. UTFPR-CP · CNPJ 26.205.357/0001-08
      </div>
    </footer>
  )
}

/** WhatsApp flutuante (desktop) com pulso de 3 ciclos. */
export function WhatsAppFloat() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackWhatsappClick}
      aria-label="Falar no WhatsApp"
      className="wa-pulse fixed z-30 hidden size-14 place-items-center rounded-full bg-wa text-white shadow-xl transition-transform hover:scale-105 lg:grid"
      style={{ bottom: 'calc(24px + env(safe-area-inset-bottom))', right: 'calc(24px + env(safe-area-inset-right))' }}
    >
      <WhatsappLogo weight="fill" size={30} aria-hidden />
    </a>
  )
}

/** Barra fixa do celular: CTA + WhatsApp; some quando o formulário está visível. */
export function MobileBar() {
  const [hide, setHide] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    const el = document.getElementById('diagnostico')
    if (!el) return
    const io = new IntersectionObserver(([e]) => setHide(e.isIntersecting), { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <motion.div
      className="fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t border-line bg-surface/90 px-4 pt-3 backdrop-blur-xl lg:hidden"
      style={{ paddingBottom: 'calc(12px + env(safe-area-inset-bottom))' }}
      animate={{ y: hide ? '110%' : 0 }}
      transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 30 }}
      inert={hide}
    >
      <a
        href="#diagnostico"
        className="inline-flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-full bg-cta px-4 font-display font-bold text-cta-ink"
      >
        Diagnóstico grátis <ArrowRight weight="bold" size={18} aria-hidden />
      </a>
      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={trackWhatsappClick}
        aria-label="Falar no WhatsApp"
        className="grid size-[52px] shrink-0 place-items-center rounded-full bg-wa text-white"
      >
        <WhatsappLogo weight="fill" size={28} aria-hidden />
      </a>
    </motion.div>
  )
}
