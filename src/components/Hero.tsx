import {
  CheckCircle,
  ChartLineUp,
  ClipboardText,
  Cube,
  Receipt,
  SquaresFour,
} from '@phosphor-icons/react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { BENEFITS, GUARANTEES } from '../lib/content'
import { CountUp, CtaButton, Reveal, SplitText } from './ui'

const BARS = [38, 46, 52, 61, 58, 74, 88] // Abr a Out
const MONTHS = ['Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out']
const ORDERS = [
  ['OS 0412 · Manutenção preventiva', 'Em andamento', 'bg-brand-soft text-brand'],
  ['OS 0409 · Instalação', 'Entregue', 'bg-ok/15 text-ok'],
  ['OS 0405 · Reparo', 'Aguardando peça', 'bg-cta/20 text-ink'],
]
const ERRORS = [
  { t: 'Metalúrgica S. · #REF!', cls: 'left-[2%] top-[-6%] -rotate-6', dy: -150 },
  { t: 'Dist. Norte · #N/D', cls: 'right-[3%] top-[-2%] rotate-3', dy: -120 },
  { t: 'TOTAL · #######', cls: 'right-[22%] top-[-11%] -rotate-2', dy: -190 },
]

function Dashboard() {
  const reduce = useReducedMotion()
  return (
    <div className="overflow-hidden rounded-[22px] border border-line bg-surface shadow-[0_40px_100px_-30px_rgb(41_98_255/0.35)]">
      <div className="flex items-center gap-2 border-b border-line bg-surface-2 px-4 py-3">
        <span className="size-2.5 rounded-full bg-bad/70" />
        <span className="size-2.5 rounded-full bg-cta" />
        <span className="size-2.5 rounded-full bg-ok" />
        <span className="ml-3 hidden rounded-full bg-surface px-3 py-0.5 text-xs text-ink-2 sm:block">
          painel.suaempresa.com.br
        </span>
      </div>
      <div className="grid grid-cols-[56px_1fr] sm:grid-cols-[72px_1fr]">
        <div className="flex flex-col items-center gap-5 border-r border-line py-5 text-ink-2">
          <SquaresFour size={22} weight="fill" className="text-brand" />
          <Receipt size={22} />
          <ClipboardText size={22} />
          <Cube size={22} />
          <ChartLineUp size={22} />
        </div>
        <div className="p-4 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="font-display text-sm font-bold sm:text-base">Painel de Gestão · Outubro</p>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-ok">
              <CheckCircle weight="fill" size={16} /> Atualizado
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {[
              ['Faturamento', <CountUp key="a" to={148} prefix="R$ " suffix=" mil" />, '▲ 12,4%'],
              ['OS em aberto', <CountUp key="b" to={23} />, ''],
              ['Margem', '31,2%', ''],
            ].map(([l, v, d], i) => (
              <div key={i} className="rounded-xl bg-surface-2 p-3 sm:p-4">
                <p className="text-[0.7rem] text-ink-2 sm:text-xs">{l as string}</p>
                <p className="font-display text-base font-bold leading-tight sm:text-2xl">{v}</p>
                {d && <p className="text-xs font-semibold text-ok">{d as string}</p>}
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-[1.2fr_1fr]">
            <div>
              <div className="flex h-32 items-end gap-2 border-b border-line">
                {BARS.map((h, i) => (
                  <div key={MONTHS[i]} className="flex h-full flex-1 items-end">
                    <motion.div
                      className={`w-full origin-bottom rounded-t-md ${i === BARS.length - 1 ? 'bg-brand' : 'bg-brand/30'}`}
                      style={{ height: `${h}%` }}
                      initial={reduce ? false : { scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 + i * 0.07, ease: 'easeOut' }}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-1.5 flex gap-2 text-[0.65rem] text-ink-2">
                {MONTHS.map((m) => (
                  <span key={m} className="flex-1 text-center">
                    {m}
                  </span>
                ))}
              </div>
            </div>
            <ul className="hidden flex-col gap-2 sm:flex">
              {ORDERS.map(([t, s, c]) => (
                <li key={t} className="flex items-center justify-between gap-2 rounded-xl border border-line px-3 py-2 text-xs">
                  <span className="truncate">{t}</span>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 font-semibold ${c}`}>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

/** Planilha quebrada -> painel limpo, guiado pela rolagem. */
function ProductShowcase() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 95%', 'start 25%'] })
  const rotateX = useTransform(scrollYProgress, [0, 1], [16, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1])
  const errOpacity = useTransform(scrollYProgress, [0.2, 0.9], [1, 0])

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Exemplo ilustrativo: células de planilha com erros como #REF! e #N/D dão lugar a um painel de gestão com faturamento, ordens de serviço em aberto, margem e gráfico dos últimos 7 meses."
      className="relative mx-auto mt-24 w-full max-w-[1000px] [perspective:1400px] sm:mt-28"
    >
      {ERRORS.map((e) => (
        <ErrorChip key={e.t} {...e} progress={scrollYProgress} opacity={errOpacity} reduce={!!reduce} />
      ))}
      <motion.div
        aria-hidden
        style={reduce ? undefined : { rotateX, scale, transformOrigin: '50% 100%' }}
        className="relative"
      >
        <Dashboard />
      </motion.div>
    </div>
  )
}

function ErrorChip({
  t,
  cls,
  dy,
  progress,
  opacity,
  reduce,
}: {
  t: string
  cls: string
  dy: number
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  opacity: ReturnType<typeof useTransform<number, number>>
  reduce: boolean
}) {
  const y = useTransform(progress, [0, 1], [0, dy])
  return (
    <motion.span
      aria-hidden
      style={reduce ? undefined : { y, opacity }}
      className={`absolute z-10 rounded-lg border border-bad/40 bg-surface px-3 py-2 font-mono text-xs font-semibold text-bad shadow-lg sm:text-sm ${cls}`}
    >
      {t}
    </motion.span>
  )
}

const STATS: { to: number; prefix?: string; suffix?: string; label: string }[] = [
  { to: 24, suffix: 'h', label: 'para receber sua proposta por escrito' },
  { to: 6, label: 'projetos já em uso' },
  { to: 4, label: 'passos até o sistema rodando' },
  { to: 0, prefix: 'R$ ', label: 'de mensalidade por usuário' },
]

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pt-36 sm:pt-44">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[620px] w-[1100px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--brand)_20%,transparent),transparent_65%)]"
      />
      <div className="container-lp">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center text-center">
          <Reveal className="mb-8 rounded-full border border-line bg-surface px-4 py-1.5 text-[0.8125rem] font-semibold text-ink-2">
            <span className="mr-2 inline-block size-2 rounded-full bg-ok align-middle" />
            Sistema de gestão sob medida · Cornélio Procópio e Norte do PR
          </Reveal>

          <SplitText
            as="h1"
            id="hero-title"
            inView={false}
            delay={0.2}
            accentFrom={3}
            text="Sua empresa cresceu. Suas planilhas não acompanharam."
            className="t-display text-ink"
          />

          <Reveal delay={0.7} className="mt-8 flex flex-col items-center gap-8">
            <p className="t-lead max-w-[58ch] text-ink-2">
              Financeiro, estoque, ordens de serviço e DRE em um só sistema web, feito para a rotina da sua equipe e com
              investimento de Empresa Júnior.
            </p>
            <div className="flex w-full flex-col items-center gap-4">
              <CtaButton />
              <ul className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-[0.9375rem] text-ink-2">
                {GUARANTEES.map((g) => (
                  <li key={g} className="flex items-center gap-1.5">
                    <CheckCircle weight="fill" size={16} className="text-ok" aria-hidden />
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <ProductShowcase />

        <Reveal className="mx-auto mt-14 max-w-[1000px]">
          <ul className="grid gap-4 sm:grid-cols-3">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-5">
                <CheckCircle weight="fill" size={22} className="mt-0.5 shrink-0 text-ok" aria-hidden />
                <span className="font-semibold leading-snug">{b}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <dl className="mx-auto mt-20 grid max-w-[1000px] grid-cols-2 gap-x-6 gap-y-10 border-t border-line pt-12 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col">
              <dt className="order-2 mt-2 text-[0.9375rem] text-ink-2">{s.label}</dt>
              <dd className="font-display text-5xl font-bold tracking-tight text-ink sm:text-6xl">
                <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="h-[clamp(64px,9vw,120px)]" />
    </section>
  )
}
