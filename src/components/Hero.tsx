import { CheckCircle } from '@phosphor-icons/react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { BENEFITS, GUARANTEES } from '../lib/content'
import { InteractiveDashboard } from './dashboard/Dashboard'
import { CountUp, CtaButton, Reveal, SplitText } from './ui'

function ProductShowcase() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 95%', 'start 25%'] })
  const rotateX = useTransform(scrollYProgress, [0, 1], [16, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1])

  return (
    <section
      ref={ref}
      aria-label="Exemplo interativo de painel de gestão"
      className="relative mx-auto mt-16 w-full max-w-[1000px] [perspective:1400px] sm:mt-20"
    >
      <motion.div style={reduce ? undefined : { rotateX, scale, transformOrigin: '50% 100%' }} className="relative">
        <InteractiveDashboard />
      </motion.div>
      <p className="mt-5 text-center text-sm text-ink-2">
        Exemplo com dados fictícios. Clique nos ícones do menu e nos gráficos para explorar.
      </p>
    </section>
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
