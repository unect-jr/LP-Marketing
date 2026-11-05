import { DELIVERABLES } from '../lib/content'
import { LeadForm } from './LeadForm'
import { Reveal, SectionHead } from './ui'

export function Diagnostic() {
  return (
    <section id="diagnostico" aria-labelledby="diag-title" className="night section-y">
      <div className="container-lp grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="lg:order-2">
          <div className="rounded-[28px] border border-line bg-surface p-6 sm:p-10">
            <LeadForm />
          </div>
        </Reveal>

        <div className="flex flex-col gap-8 lg:order-1 lg:pt-4">
          <SectionHead
            id="diag-title"
            n={7}
            label="Diagnóstico gratuito"
            title="Descubra quanto as planilhas custam à sua empresa"
            lead="Em uma reunião online de 30 a 45 minutos mapeamos sua operação. Você sai com um plano claro, mesmo que decida não contratar."
          />
          <Reveal>
            <p className="mb-4 font-display font-bold">O que você recebe</p>
            <ol className="flex flex-col gap-4">
              {DELIVERABLES.map(([t, d], i) => (
                <li key={t} className="flex gap-4">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-soft font-display text-sm font-bold text-brand">
                    {i + 1}
                  </span>
                  <p>
                    <strong className="font-semibold">{t}:</strong> <span className="text-ink-2">{d}</span>
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
