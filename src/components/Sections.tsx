import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChartLineUp,
  Check,
  ClipboardText,
  Cube,
  Lightning,
  Minus,
  Quotes,
  Receipt,
  UsersThree,
  X,
} from '@phosphor-icons/react'
import { Accordion } from '@heroui/react'
import type { Icon } from '@phosphor-icons/react'
import { motion, useReducedMotion } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  CASES,
  CLIENTS,
  COMPARE_COLS,
  COMPARE_ROWS,
  CTA_LABEL,
  FAQ,
  MODULES,
  STEPS,
  TESTIMONIALS,
  type Cell,
  type Mark,
  type ModuleIcon,
} from '../lib/content'
import { Chip, CtaButton, Marquee, Reveal, SectionHead } from './ui'

/* ---------------- Logos (faixa em movimento) ---------------- */
export function Logos() {
  return (
    <section aria-label="Clientes atendidos" className="border-y border-line py-10">
      <p className="mb-6 text-center text-[0.9375rem] text-ink-2">Empresas que já confiaram na Unect Jr.</p>
      <div className="[mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <Marquee speed={36}>
          <ul className="flex items-center gap-6 pr-6 sm:gap-10 sm:pr-10" aria-label={CLIENTS.map((c) => c.name).join(', ')}>
            {CLIENTS.map((c) => (
              <li
                key={c.name}
                className="flex h-16 shrink-0 items-center rounded-xl bg-white px-4 opacity-75 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
              >
                <img src={c.src} alt={c.name} width={c.w} height={c.h} loading="lazy" className="h-10 w-auto" />
              </li>
            ))}
          </ul>
        </Marquee>
      </div>
    </section>
  )
}

/* ---------------- 01 Comparativo (escuro) ---------------- */
const MARK: Record<Mark, { Icon: Icon; cls: string; sr: string }> = {
  ok: { Icon: Check, cls: 'text-ok', sr: 'Bom: ' },
  mid: { Icon: Minus, cls: 'text-ink-2', sr: 'Regular: ' },
  bad: { Icon: X, cls: 'text-bad', sr: 'Ruim: ' },
}

function Mk({ cell }: { cell: Cell }) {
  const { Icon: I, cls, sr } = MARK[cell.mark]
  return (
    <span className="flex items-start gap-2.5">
      <I weight="bold" size={18} className={`mt-1 shrink-0 ${cls}`} aria-hidden />
      <span>
        <span className="sr-only">{sr}</span>
        {cell.text}
      </span>
    </span>
  )
}

export function Compare() {
  return (
    <section id="comparativo" aria-labelledby="comparativo-title" className="night section-y">
      <div className="container-lp flex flex-col gap-16">
        <SectionHead
          id="comparativo-title"
          n={1}
          label="Comparativo"
          title="Planilha, ERP genérico ou sob medida?"
          lead="Toda empresa em crescimento chega a esse ponto. Veja o que cada opção entrega na prática."
        />

        {/* Desktop: tabela */}
        <Reveal className="hidden lg:block">
          <table className="w-full border-separate border-spacing-0 text-left">
            <caption className="sr-only">Comparação entre planilhas, ERP genérico e sistema sob medida da Unect</caption>
            <thead>
              <tr>
                <th scope="col" className="w-[19%] p-5 text-sm font-semibold text-ink-2">
                  Critério
                </th>
                {COMPARE_COLS.map((c, i) => (
                  <th
                    key={c}
                    scope="col"
                    className={`p-5 font-display text-lg ${
                      i === 2 ? 'rounded-t-3xl border-x border-t border-brand bg-brand/10 pt-7 text-ink' : 'text-ink-2'
                    }`}
                  >
                    {i === 2 && (
                      <span className="mb-2 block w-fit rounded-full bg-cta px-3 py-0.5 text-[0.7rem] font-bold uppercase tracking-wider text-cta-ink">
                        Recomendado
                      </span>
                    )}
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map((r, ri) => (
                <tr key={r.criterion}>
                  <th scope="row" className="border-t border-line p-5 align-top font-display text-sm font-semibold">
                    {r.criterion}
                  </th>
                  {r.cells.map((c, ci) => (
                    <td
                      key={ci}
                      className={`border-t border-line p-5 align-top text-[0.97rem] ${
                        ci === 2
                          ? `border-x border-x-brand bg-brand/10 ${ri === COMPARE_ROWS.length - 1 ? 'rounded-b-3xl border-b border-b-brand' : ''}`
                          : 'text-ink-2'
                      }`}
                    >
                      <Mk cell={c} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        {/* Celular: um bloco por opção, "Sob medida" primeiro */}
        <div className="flex flex-col gap-4 lg:hidden">
          {[2, 0, 1].map((ci) => (
            <Reveal key={ci}>
              <div
                className={`rounded-3xl p-6 ${ci === 2 ? 'border border-brand bg-brand/10' : 'border border-line bg-surface'}`}
              >
                <h3 className="mb-5 flex flex-wrap items-center gap-3 font-display text-xl font-bold">
                  {COMPARE_COLS[ci]}
                  {ci === 2 && (
                    <span className="rounded-full bg-cta px-3 py-0.5 text-[0.7rem] font-bold uppercase tracking-wider text-cta-ink">
                      Recomendado
                    </span>
                  )}
                </h3>
                <dl className="flex flex-col gap-4">
                  {COMPARE_ROWS.map((r) => (
                    <div key={r.criterion}>
                      <dt className="text-sm font-semibold text-ink-2">{r.criterion}</dt>
                      <dd className="mt-1">
                        <Mk cell={r.cells[ci]} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <CtaButton />
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------- 02 Módulos (lista editorial) ---------------- */
const MODULE_ICON: Record<ModuleIcon, Icon> = {
  finance: Receipt,
  orders: ClipboardText,
  stock: Cube,
  dashboard: ChartLineUp,
  automation: Lightning,
  users: UsersThree,
}

export function Modules() {
  return (
    <section id="modulos" aria-labelledby="modulos-title" className="section-y">
      <div className="container-lp flex flex-col gap-16">
        <SectionHead
          id="modulos-title"
          n={2}
          label="Módulos"
          title="Comece pelo gargalo que mais custa caro"
          lead="Cada módulo resolve um problema da operação. Você escolhe por onde começar e o sistema cresce conforme a empresa pede."
        />
        <ul>
          {MODULES.map((m, i) => {
            const I = MODULE_ICON[m.icon]
            return (
              <li key={m.title}>
                <Reveal>
                  <article className="group grid gap-6 border-t border-line py-9 transition-colors hover:bg-surface-2/60 lg:grid-cols-[88px_1.1fr_1fr_0.8fr] lg:gap-10 lg:px-4">
                    <div className="flex items-center gap-4 lg:block">
                      <span className="font-display text-4xl font-bold text-ink-2/40 transition-colors group-hover:text-brand lg:text-5xl">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="grid size-11 place-items-center rounded-full bg-brand-soft text-brand lg:mt-4">
                        <I size={22} aria-hidden />
                      </span>
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-bold leading-tight sm:text-3xl">{m.title}</h3>
                      <p className="mt-3 text-ink-2">{m.desc}</p>
                    </div>
                    <ul className="flex flex-col gap-2.5 text-[0.97rem]">
                      {m.includes.map((inc) => (
                        <li key={inc} className="flex items-start gap-2.5">
                          <Check weight="bold" size={16} className="mt-1.5 shrink-0 text-ok" aria-hidden />
                          {inc}
                        </li>
                      ))}
                    </ul>
                    <p className="font-display text-lg font-semibold leading-snug lg:text-right">
                      <span className="mb-1 block text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-ink-2">
                        Resultado
                      </span>
                      {m.result}
                    </p>
                  </article>
                </Reveal>
              </li>
            )
          })}
          <li aria-hidden className="border-t border-line" />
        </ul>
      </div>
    </section>
  )
}

/* ---------------- 03 Como funciona (cartões empilhados) ---------------- */
export function HowItWorks() {
  return (
    <section id="como-funciona" aria-labelledby="como-title" className="section-y bg-surface-2">
      <div className="container-lp grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHead
            id="como-title"
            n={3}
            label="Como funciona"
            title="Do diagnóstico ao sistema em 4 passos"
            lead="Você valida cada etapa e sabe o que vai receber antes de investir."
          />
          <Reveal className="mt-10 flex flex-col items-start gap-4">
            <p className="font-semibold">O primeiro passo é gratuito, online e não obriga a contratar.</p>
            <CtaButton />
          </Reveal>
        </div>

        <ol className="flex flex-col gap-6 pb-4">
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              className="sticky"
              style={{ top: `calc(104px + ${i * 22}px)` }}
            >
              <div className="rounded-3xl border border-line bg-surface p-7 shadow-[0_20px_50px_-30px_rgb(10_13_31/0.35)] sm:p-10">
                <div className="flex items-start justify-between gap-4">
                  <span className="font-display text-7xl font-bold leading-none text-brand sm:text-8xl">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <Chip>{s.when}</Chip>
                </div>
                <h3 className="mt-8 font-display text-2xl font-bold sm:text-3xl">{s.title}</h3>
                <p className="mt-3 max-w-[44ch] text-ink-2">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ---------------- 04 Cases (carrossel) ---------------- */
const CASE_LOGO: Record<string, string> = {
  AETA: 'Nova AETA',
  'P3 Agro': 'P3 Agro',
  'Clínica Ética': 'Clínica Ética',
  'Antônio Lima Advogados': 'Antônio Lima Advogados',
  'Cacto Comunicação EJ': 'Cacto Comunicação',
}

export function Cases() {
  const reduce = useReducedMotion()
  const track = useRef<HTMLUListElement>(null)
  const [idx, setIdx] = useState(0)

  const onScroll = useCallback(() => {
    const el = track.current
    const first = el?.firstElementChild as HTMLElement | null
    if (!el || !first) return
    const step = first.offsetWidth + 20
    setIdx(Math.min(CASES.length - 1, Math.round(el.scrollLeft / step)))
  }, [])

  useEffect(onScroll, [onScroll])

  const go = (dir: 1 | -1) => {
    const el = track.current
    const first = el?.firstElementChild as HTMLElement | null
    if (!el || !first) return
    el.scrollBy({ left: dir * (first.offsetWidth + 20), behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <section id="cases" aria-labelledby="cases-title" className="section-y overflow-hidden">
      <div className="container-lp flex flex-col gap-12">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHead id="cases-title" n={4} label="Cases" title="Projetos que já estão em uso" />
          <div className="flex items-center gap-5">
            <p className="font-display text-lg font-semibold tabular-nums" aria-live="polite">
              {String(idx + 1).padStart(2, '0')} <span className="text-ink-2">/ {String(CASES.length).padStart(2, '0')}</span>
            </p>
            {([-1, 1] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => go(d)}
                aria-label={d === 1 ? 'Próximo case' : 'Case anterior'}
                className="grid size-12 place-items-center rounded-full border border-line bg-surface transition hover:border-brand hover:text-brand active:scale-95"
              >
                {d === 1 ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ul
        ref={track}
        onScroll={onScroll}
        tabIndex={0}
        aria-label="Cases, role para o lado"
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-[max(20px,calc((100vw-1240px)/2+32px))] pb-4"
      >
        {CASES.map((c, i) => {
          const logo = CLIENTS.find((x) => x.name === CASE_LOGO[c.name])
          return (
            <li key={c.name} className="w-[82vw] max-w-[400px] shrink-0 snap-start scroll-ml-5">
              <article className="flex h-[440px] flex-col rounded-3xl border border-line bg-surface p-7 transition-transform duration-300 hover:-translate-y-1.5">
                <div className="flex items-start justify-between">
                  <Chip>{c.type}</Chip>
                  <span className="font-display text-sm font-semibold tabular-nums text-ink-2">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="mt-8 grid h-28 place-items-center rounded-2xl bg-white">
                  {logo ? (
                    <img src={logo.src} alt="" width={logo.w} height={logo.h} loading="lazy" className="h-16 w-auto max-w-[80%] object-contain" />
                  ) : (
                    <span className="font-display text-xl font-bold text-[#0a0d1f]/70">{c.name}</span>
                  )}
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold leading-tight">{c.name}</h3>
                <p className="mt-2 text-ink-2">{c.text}</p>
                {c.href && (
                  <a href={c.href} className="group mt-auto inline-flex items-center gap-1 pt-4 font-display font-semibold text-brand">
                    Ver case
                    <ArrowUpRight size={18} weight="bold" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                  </a>
                )}
              </article>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

/* ---------------- 05 Depoimentos ---------------- */
function initials(name: string) {
  return name
    .split(' ')
    .filter((w) => w.length > 2)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

export function Testimonials() {
  return (
    <section aria-labelledby="dep-title" className="section-y border-t border-line">
      <div className="container-lp flex flex-col gap-14">
        <SectionHead id="dep-title" n={5} label="Depoimentos" title="O que dizem os clientes" />
        <div className="grid gap-5 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <motion.figure
                whileHover={{ y: -6 }}
                className="flex h-full flex-col gap-8 rounded-3xl bg-surface-2 p-8"
              >
                <Quotes weight="fill" size={40} className="text-brand" aria-hidden />
                <blockquote className="font-display text-xl font-semibold leading-snug tracking-tight">{t.quote}</blockquote>
                <figcaption className="mt-auto flex items-center gap-3">
                  {t.avatar ? (
                    <img src={t.avatar} alt="" width={48} height={48} loading="lazy" className="size-12 rounded-full object-cover" />
                  ) : (
                    <span aria-hidden className="grid size-12 place-items-center rounded-full bg-brand-soft font-display font-bold text-brand">
                      {initials(t.name)}
                    </span>
                  )}
                  <span>
                    <span className="block font-display text-sm font-bold">{t.name}</span>
                    <span className="block text-[0.9375rem] text-ink-2">{t.project}</span>
                  </span>
                </figcaption>
              </motion.figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- 06 FAQ (HeroUI Accordion) ---------------- */
export function Faq() {
  return (
    <section id="duvidas" aria-labelledby="faq-title" className="section-y bg-surface-2">
      <div className="container-lp grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHead id="faq-title" n={6} label="Dúvidas" title="Perguntas frequentes" />
        </div>
        <Reveal>
          <Accordion className="w-full" variant="default">
            {FAQ.map((f, i) => (
              <Accordion.Item key={f.q} id={`faq-${i}`}>
                <Accordion.Heading>
                  <Accordion.Trigger className="py-6 text-left font-display text-lg font-semibold text-ink">
                    {f.q}
                    <Accordion.Indicator />
                  </Accordion.Trigger>
                </Accordion.Heading>
                <Accordion.Panel>
                  <Accordion.Body className="pb-6 text-ink-2">{f.a}</Accordion.Body>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
          <p className="mt-8 text-ink-2">
            Ainda tem dúvida?{' '}
            <a href="#diagnostico" className="font-semibold text-brand underline underline-offset-4">
              {CTA_LABEL}
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  )
}
