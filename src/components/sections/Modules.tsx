import { ChartLineUp, Check, ClipboardText, Cube, Lightning, Receipt, UsersThree, type Icon } from '@phosphor-icons/react'
import { MODULES, type ModuleIcon } from '../../lib/content'
import { Reveal, SectionHead } from '../ui'

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
