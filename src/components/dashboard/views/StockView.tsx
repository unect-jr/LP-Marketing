import { Warning } from '@phosphor-icons/react'
import { motion, useReducedMotion } from 'motion/react'
import { STOCK } from '../data'
import { Pill } from '../parts'

export function StockView() {
  const reduce = useReducedMotion()
  return (
    <ul className="flex flex-col gap-2">
      {STOCK.map((s, i) => {
        const low = s.qty < s.min
        return (
          <li
            key={s.name}
            className="rounded-xl border border-line px-3 py-2.5 text-xs transition-colors hover:border-brand hover:bg-brand-soft/50"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold">{s.name}</span>
              {low ? (
                <Pill className="bg-bad/15 text-bad">
                  <span className="flex items-center gap-1">
                    <Warning size={12} weight="fill" aria-hidden /> Repor
                  </span>
                </Pill>
              ) : (
                <span className="text-ink-2">{s.qty} un.</span>
              )}
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-2">
              <motion.div
                className={`h-full origin-left rounded-full ${low ? 'bg-bad' : 'bg-brand'}`}
                style={{ width: `${(s.qty / s.max) * 100}%` }}
                initial={reduce ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: 'easeOut' }}
              />
            </div>
            <p className="mt-1 text-ink-2">
              {s.qty} em estoque · mínimo {s.min}
            </p>
          </li>
        )
      })}
    </ul>
  )
}
