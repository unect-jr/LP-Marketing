import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { NAV } from '../lib/content'
import { ThemeToggle } from './ThemeToggle'
import { CtaButton } from './ui'

export function Logo({ forceLight = false }: { forceLight?: boolean }) {
  return (
    <a href="#top" className="flex shrink-0 items-center" aria-label="Unect Jr. UTFPR-CP, voltar ao topo">
      {forceLight ? (
        <img src="/logo/unect-logo-branco.png" alt="Unect Jr." width={102} height={32} className="h-8 w-auto" />
      ) : (
        <>
          <img src="/logo/unect-logo.png" alt="Unect Jr." width={102} height={32} className="h-8 w-auto dark:hidden" />
          <img src="/logo/unect-logo-branco.png" alt="" aria-hidden width={102} height={32} className="hidden h-8 w-auto dark:block" />
        </>
      )}
    </a>
  )
}

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  return (
    <motion.header
      initial={reduce ? false : { y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="fixed inset-x-0 z-40 px-3 sm:px-5"
      style={{ top: 'calc(12px + env(safe-area-inset-top))' }}
    >
      <div
        className={`mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-4 rounded-full border pl-5 pr-2 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300 ${
          scrolled ? 'border-line bg-surface/85 shadow-[0_8px_30px_rgb(10_13_31/0.08)]' : 'border-transparent bg-surface/40'
        }`}
      >
        <Logo />
        <nav aria-label="Seções da página" className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded-full px-4 py-2 text-[0.95rem] font-semibold text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden sm:block">
            <CtaButton label="Diagnóstico grátis" block={false} small />
          </div>
        </div>
      </div>
    </motion.header>
  )
}
