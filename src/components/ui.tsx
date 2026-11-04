import { ArrowRight } from '@phosphor-icons/react'
import { animate, motion, useInView, useReducedMotion, type HTMLMotionProps } from 'motion/react'
import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'
import { CTA_LABEL } from '../lib/content'

const EASE = [0.22, 1, 0.36, 1] as const

/** Entrada suave ao rolar. Estado inicial com opacity .6: nunca fica invisível sem JS. */
export function Reveal({
  children,
  delay = 0,
  className,
  ...rest
}: { children: ReactNode; delay?: number; className?: string } & HTMLMotionProps<'div'>) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0.4, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/** Título que sobe palavra por palavra, com máscara. `accentFrom` pinta as palavras seguintes de azul. */
export function SplitText({
  text,
  as: Tag = 'span',
  id,
  className = '',
  delay = 0,
  accentFrom,
  inView = true,
}: {
  text: string
  as?: ElementType
  id?: string
  className?: string
  delay?: number
  accentFrom?: number
  inView?: boolean
}) {
  const reduce = useReducedMotion()
  const words = text.split(' ')
  const anim = inView
    ? { whileInView: { y: 0 }, viewport: { once: true, margin: '0px 0px -10% 0px' } }
    : { animate: { y: 0 } }
  return (
    <Tag id={id} aria-label={text} className={className}>
      {words.map((w, i) => (
        <span key={i} aria-hidden>
          <span className="inline-block overflow-hidden pb-[0.14em] align-bottom [margin-bottom:-0.14em]">
            <motion.span
              className={`inline-block ${accentFrom !== undefined && i >= accentFrom ? 'text-brand' : ''}`}
              initial={reduce ? false : { y: '112%' }}
              {...anim}
              transition={{ duration: 0.9, ease: EASE, delay: delay + i * 0.05 }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  )
}

/** Cabeçalho de seção numerado: "01 / 07 — Comparativo" + título grande. */
export function SectionHead({
  id,
  n,
  label,
  title,
  lead,
  className = '',
}: {
  id: string
  n: number
  label: string
  title: string
  lead?: string
  className?: string
}) {
  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      <Reveal className="flex items-center gap-4 text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-ink-2">
        <span className="font-display text-brand tabular-nums">
          {String(n).padStart(2, '0')} <span className="text-ink-2">/ 07</span>
        </span>
        <span aria-hidden className="h-px w-10 bg-line" />
        {label}
      </Reveal>
      <SplitText as="h2" id={id} text={title} className="t-h2 max-w-[18ch] text-ink" />
      {lead && (
        <Reveal delay={0.15}>
          <p className="t-lead max-w-[56ch] text-ink-2">{lead}</p>
        </Reveal>
      )}
    </div>
  )
}

export function Chip({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-brand-soft px-3 py-1 text-[0.8125rem] font-semibold text-brand ${className}`}
    >
      {children}
    </span>
  )
}

/** Botão principal: único texto de CTA; sempre leva a #diagnostico. */
export function CtaButton({
  label = CTA_LABEL,
  className = '',
  block = true,
  small = false,
}: {
  label?: string
  className?: string
  block?: boolean
  small?: boolean
}) {
  return (
    <a
      href="#diagnostico"
      className={`group inline-flex items-center justify-between gap-4 rounded-full bg-cta font-display font-bold text-cta-ink transition-[transform,background-color] duration-200 hover:bg-cta-hover active:scale-[0.98] ${
        small ? 'min-h-12 py-1.5 pl-5 pr-1.5 text-sm' : 'min-h-[60px] py-2 pl-8 pr-2 text-base'
      } ${block ? 'w-full sm:w-auto' : ''} ${className}`}
    >
      {label}
      <span
        className={`grid shrink-0 place-items-center rounded-full bg-cta-ink text-cta transition-transform duration-300 group-hover:translate-x-1 ${
          small ? 'size-9' : 'size-11'
        }`}
      >
        <ArrowRight weight="bold" size={small ? 16 : 20} aria-hidden />
      </span>
    </a>
  )
}

/** Número que sobe até o valor ao entrar na tela. */
export function CountUp({ to, prefix = '', suffix = '' }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()
  const [val, setVal] = useState(reduce ? to : 0)
  useEffect(() => {
    if (!inView || reduce) return
    const c = animate(0, to, { duration: 1.6, ease: 'easeOut', onUpdate: (v) => setVal(Math.round(v)) })
    return () => c.stop()
  }, [inView, reduce, to])
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {val}
      {suffix}
    </span>
  )
}

/** Faixa infinita. O conteúdo é duplicado; a cópia fica oculta para leitores de tela. */
export function Marquee({
  children,
  speed = 40,
  reverse = false,
  className = '',
}: {
  children: ReactNode
  speed?: number
  reverse?: boolean
  className?: string
}) {
  return (
    <div className={`marquee overflow-hidden ${className}`}>
      <div
        className="marquee-track"
        style={{ ['--marquee-speed' as string]: `${speed}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  )
}
