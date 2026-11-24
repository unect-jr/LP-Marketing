import { m, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { DRE, margin, mil, type Period } from '../data'
import { Segmented } from '../parts'

const PERIODS: { id: Period; label: string }[] = [
  { id: 'mes', label: 'Outubro' },
  { id: 'trimestre', label: 'Trimestre' },
]

export function ReportsView() {
  const reduce = useReducedMotion()
  const [period, setPeriod] = useState<Period>('mes')
  const { receita, custos, despesas } = DRE[period]
  const lucro = receita - custos - despesas
  const rows = [
    { label: 'Receita', value: receita, bar: 'bg-brand' },
    { label: 'Custos', value: custos, bar: 'bg-bad/70' },
    { label: 'Despesas', value: despesas, bar: 'bg-ink-2' },
    { label: 'Lucro', value: lucro, bar: 'bg-ok' },
  ]

  return (
    <>
      <Segmented label="Período da DRE" value={period} options={PERIODS} onChange={setPeriod} />
      <ul className="mt-4 flex flex-col gap-3">
        {rows.map((r) => (
          <li key={r.label} className="text-xs">
            <div className="mb-1 flex justify-between">
              <span className="font-semibold">{r.label}</span>
              <span className="tabular-nums text-ink-2">{mil(r.value)}</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-surface-2">
              <m.div
                className={`h-full rounded-full ${r.bar}`}
                initial={reduce ? false : { width: 0 }}
                animate={{ width: `${(r.value / receita) * 100}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-ink-2">Margem líquida de {margin(DRE[period])} no período.</p>
    </>
  )
}
