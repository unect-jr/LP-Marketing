import { ArrowRight } from '@phosphor-icons/react'
import { useCountdown } from '../lib/countdown'

const pad = (n: number) => String(n).padStart(2, '0')

function Unit({ value, label }: { value: string; label: string }) {
  return (
    <span className="flex items-baseline gap-0.5">
      <span className="min-w-[2ch] rounded-md bg-black/45 px-1.5 py-0.5 text-center font-display font-bold tabular-nums text-white">
        {value}
      </span>
      <span className="text-[0.6875rem] font-semibold uppercase text-white/80">{label}</span>
    </span>
  )
}

export function UBlackBanner() {
  const left = useCountdown()
  if (left?.done) return null
  const v = (n?: number) => (left ? pad(n ?? 0) : '--')

  return (
    <div
      className="fixed inset-x-0 top-0 z-[45] border-b border-white/10 bg-gradient-to-r from-cta-deep via-cta to-cta-deep text-white"
      style={{ height: 'calc(var(--ub-h) + env(safe-area-inset-top))', paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="container-lp flex h-full items-center justify-center gap-2 text-sm sm:gap-5">
        <span className="flex items-center gap-2 font-display font-bold uppercase tracking-wide">
          <span aria-hidden className="ub-blink size-2 rounded-full bg-white" />
          UBlack
        </span>
        <span className="hidden font-semibold md:inline">Ofertas por tempo limitado. Termina em</span>
        <span className="whitespace-nowrap font-semibold md:hidden">Termina em</span>
        <div role="timer" aria-label="Tempo restante da UBlack" className="flex items-center gap-1.5 sm:gap-2">
          <Unit value={v(left?.days)} label="d" />
          <Unit value={v(left?.hours)} label="h" />
          <Unit value={v(left?.minutes)} label="m" />
          <Unit value={v(left?.seconds)} label="s" />
        </div>
        <a
          href="#ofertas"
          className="hidden items-center gap-1 rounded-full bg-white px-3.5 py-1 font-display text-[0.8125rem] font-bold text-cta-deep transition-transform hover:scale-105 lg:inline-flex"
        >
          Ver ofertas <ArrowRight weight="bold" size={14} aria-hidden />
        </a>
      </div>
    </div>
  )
}
