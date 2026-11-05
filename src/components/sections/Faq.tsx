import { CaretDown } from '@phosphor-icons/react'
import { CTA_LABEL, FAQ } from '../../lib/content'
import { Reveal, SectionHead } from '../ui'

export function Faq() {
  return (
    <section id="duvidas" aria-labelledby="faq-title" className="section-y bg-surface-2">
      <div className="container-lp grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHead id="faq-title" n={6} label="Dúvidas" title="Perguntas frequentes" />
        </div>
        <Reveal>
          <div className="border-b border-line">
            {FAQ.map((f) => (
              <details key={f.q} className="group border-t border-line">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-6 text-left font-display text-lg font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <CaretDown
                    size={20}
                    weight="bold"
                    aria-hidden
                    className="shrink-0 transition-transform duration-300 group-open:rotate-180"
                  />
                </summary>
                <p className="pb-6 text-ink-2">{f.a}</p>
              </details>
            ))}
          </div>
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
