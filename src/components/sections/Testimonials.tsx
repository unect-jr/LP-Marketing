import { Quotes } from '@phosphor-icons/react'
import { motion } from 'motion/react'
import { TESTIMONIALS } from '../../lib/content'
import { Reveal, SectionHead } from '../ui'

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
