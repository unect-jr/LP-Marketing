import { STEPS } from '../../lib/content'
import { Chip, CtaButton, Reveal, SectionHead } from '../ui'

export function HowItWorks() {
  return (
    <section id="como-funciona" aria-labelledby="como-title" className="section-y bg-surface-2">
      <div className="container-lp grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHead
            id="como-title"
            section="como-funciona"
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
              <div className="rounded-3xl border border-line bg-surface p-7 shadow-[0_20px_50px_-30px_rgb(0_0_0/0.6)] sm:p-10">
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
