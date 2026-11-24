import { m, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { MONTHS, REVENUE, mil } from '../data'

const MAX_REVENUE = Math.max(...REVENUE)

export function RevenueChart() {
  const reduce = useReducedMotion()
  const [hover, setHover] = useState<number | null>(null)
  const active = hover ?? REVENUE.length - 1

  return (
    <div>
      <div className="flex h-32 items-end gap-2 border-b border-line" onMouseLeave={() => setHover(null)}>
        {REVENUE.map((v, i) => (
          <button
            key={MONTHS[i]}
            type="button"
            aria-label={`${MONTHS[i]}: ${mil(v)}`}
            onMouseEnter={() => setHover(i)}
            onFocus={() => setHover(i)}
            onBlur={() => setHover(null)}
            className="relative flex h-full flex-1 items-end rounded-t-md outline-offset-2"
          >
            {hover === i && (
              <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 -translate-x-1/2 whitespace-nowrap rounded-md bg-ink px-2 py-1 text-[0.7rem] font-semibold text-bg">
                {mil(v)}
              </span>
            )}
            <m.span
              className={`block w-full origin-bottom rounded-t-md transition-colors duration-200 ${
                i === active ? 'bg-brand' : 'bg-brand/30'
              }`}
              style={{ height: `${(v / MAX_REVENUE) * 92}%` }}
              initial={reduce ? false : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.06, ease: 'easeOut' }}
            />
          </button>
        ))}
      </div>
      <div className="mt-1.5 flex gap-2 text-[0.65rem] text-ink-2">
        {MONTHS.map((m, i) => (
          <span key={m} className={`flex-1 text-center transition-colors ${i === active ? 'font-semibold text-ink' : ''}`}>
            {m}
          </span>
        ))}
      </div>
    </div>
  )
}
