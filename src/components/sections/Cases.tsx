import { ArrowLeft, ArrowRight, ArrowUpRight } from '@phosphor-icons/react'
import { useReducedMotion } from 'motion/react'
import { Suspense, lazy, useState, useSyncExternalStore } from 'react'
import { CASES, CLIENTS, type CaseItem } from '../../lib/content'
import { Chip, SectionHead } from '../ui'

const CaseModal = lazy(() => import('../CaseModal').then((m) => ({ default: m.CaseModal })))

const QUERIES = ['(min-width: 1024px)', '(min-width: 640px)']

function subscribeBreakpoints(cb: () => void) {
  const lists = QUERIES.map((q) => window.matchMedia(q))
  lists.forEach((l) => l.addEventListener('change', cb))
  return () => lists.forEach((l) => l.removeEventListener('change', cb))
}

function perPageNow() {
  const [lg, md] = QUERIES.map((q) => window.matchMedia(q).matches)
  return lg ? 3 : md ? 2 : 1
}

const usePerPage = () => useSyncExternalStore(subscribeBreakpoints, perPageNow, () => 3)

export function Cases() {
  const reduce = useReducedMotion()
  const perPage = usePerPage()
  const [start, setStart] = useState(0)
  const [open, setOpen] = useState<CaseItem | null>(null)
  const [modalLoaded, setModalLoaded] = useState(false)

  const maxStart = Math.max(0, CASES.length - perPage)
  const from = Math.min(start, maxStart)
  const atStart = from === 0
  const atEnd = from >= maxStart

  const go = (d: 1 | -1) => setStart(Math.min(maxStart, Math.max(0, from + d)))

  return (
    <section id="cases" aria-labelledby="cases-title" className="section-y overflow-hidden">
      <div className="container-lp flex flex-col gap-12">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHead id="cases-title" section="cases" label="Cases" title="Projetos que já estão em uso" />
          <div className="flex items-center gap-3">
            {([-1, 1] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => go(d)}
                disabled={d === 1 ? atEnd : atStart}
                aria-label={d === 1 ? 'Próximo case' : 'Case anterior'}
                className="grid size-12 place-items-center rounded-full border border-line bg-surface transition enabled:hover:border-brand enabled:hover:text-brand enabled:active:scale-95 disabled:cursor-not-allowed disabled:opacity-35"
              >
                {d === 1 ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
              </button>
            ))}
          </div>
        </div>

        <div className="-mt-2 overflow-x-clip pt-2">
          <ul
            aria-live="polite"
            style={{ transform: `translateX(calc(${-from} * (100% + 20px) / ${perPage}))` }}
            className={`flex gap-5 ${reduce ? '' : 'transition-transform duration-500 ease-out'}`}
          >
            {CASES.map((c, i) => {
              const logo = c.logo ? CLIENTS.find((x) => x.name === c.logo) : undefined
              const shown = i >= from && i < from + perPage
              return (
                <li
                  key={c.name}
                  aria-hidden={!shown}
                  inert={!shown}
                  style={{ flex: `0 0 calc((100% - ${(perPage - 1) * 20}px) / ${perPage})` }}
                >
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
                    {c.images?.length ? (
                      <button
                        type="button"
                        onClick={() => {
                          setModalLoaded(true)
                          setOpen(c)
                        }}
                        className="group mt-auto inline-flex items-center gap-1 self-start pt-4 font-display font-semibold text-brand"
                      >
                        Ver case<span className="sr-only">: {c.name}</span>
                        <ArrowUpRight size={18} weight="bold" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                      </button>
                    ) : null}
                  </article>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      {modalLoaded && (
        <Suspense fallback={null}>
          <CaseModal key={open?.name ?? 'closed'} item={open} onClose={() => setOpen(null)} />
        </Suspense>
      )}
    </section>
  )
}
