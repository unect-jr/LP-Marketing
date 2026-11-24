import { ArrowRight, CheckCircle, Cube, Globe, Wallet } from '@phosphor-icons/react'
import { m, useReducedMotion } from 'motion/react'
import type { PointerEvent } from 'react'
import { OFFERS, type OfferIcon } from '../lib/content'
import { chooseOffer, useSelectedOffer } from '../lib/offer'

const ICONS: Record<OfferIcon, typeof Globe> = { globe: Globe, cube: Cube, wallet: Wallet }

export function Offers() {
  const reduce = useReducedMotion()
  const selected = useSelectedOffer()

  const spotlight = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <ul id="ofertas" aria-label="Ofertas da UBlack" className="grid w-full gap-4 text-left md:grid-cols-3">
      {OFFERS.map((o, i) => {
        const Icon = ICONS[o.icon]
        const on = selected === o.id
        return (
          <m.li
            key={o.id}
            initial={reduce ? false : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.9 + i * 0.12 }}
            onPointerMove={spotlight}
            className={`ub-card group relative flex flex-col gap-4 overflow-hidden rounded-3xl border p-6 transition-[border-color,transform] duration-300 hover:-translate-y-1 ${
              on
                ? 'border-cta'
                : 'border-line hover:border-cta/70'
            }`}
          >
            <div className="relative flex items-center justify-between">
              <span className="rounded-full border border-cta/50 bg-cta/10 px-3 py-1 text-[0.75rem] font-bold uppercase tracking-wider text-brand">
                {o.tag}
              </span>
              <span className="grid size-11 place-items-center rounded-full bg-cta text-white">
                <Icon weight="bold" size={22} aria-hidden />
              </span>
            </div>
            <div className="relative">
              <h2 className="font-display text-2xl font-bold leading-tight text-ink">{o.title}</h2>
              <p className="mt-2 text-ink-2">{o.desc}</p>
            </div>
            <button
              type="button"
              onClick={() => chooseOffer(o.id)}
              className="relative mt-auto inline-flex w-full text-left min-h-12 items-center justify-between gap-3 rounded-full border border-cta/60 py-1.5 pl-5 pr-1.5 font-display text-sm font-bold text-ink transition-colors hover:bg-cta"
            >
              {on ? (
                <span className="flex items-center gap-2">
                  <CheckCircle weight="fill" size={18} aria-hidden /> Oferta selecionada
                </span>
              ) : (
                'Quero esta oferta'
              )}
              <span className="grid size-9 place-items-center rounded-full bg-cta text-white transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight weight="bold" size={16} aria-hidden />
              </span>
            </button>
          </m.li>
        )
      })}
    </ul>
  )
}
