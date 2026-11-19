import { useState } from 'react'
import { ENTRIES, brl, type EntryStatus } from '../data'
import { Kpi, Pill } from '../parts'

export function FinanceView() {
  const [entries, setEntries] = useState(ENTRIES)
  const sum = (kind: 'receber' | 'pagar', status: EntryStatus) =>
    entries.filter((e) => e.kind === kind && e.status === status).reduce((t, e) => t + e.value, 0)
  const toReceive = sum('receber', 'aberto')
  const toPay = sum('pagar', 'aberto')

  const settle = (id: string) =>
    setEntries((list) => list.map((e) => (e.id === id ? { ...e, status: e.status === 'pago' ? 'aberto' : 'pago' } : e)))

  return (
    <>
      <div className="grid gap-2 sm:grid-cols-3 sm:gap-4">
        <Kpi label="A receber" tone="text-ok">
          {brl(toReceive)}
        </Kpi>
        <Kpi label="A pagar" tone="text-bad">
          {brl(toPay)}
        </Kpi>
        <Kpi label="Saldo previsto">{brl(toReceive - toPay)}</Kpi>
      </div>
      <ul className="mt-4 flex flex-col gap-2">
        {entries.map((e) => (
          <li key={e.id}>
            <button
              type="button"
              onClick={() => settle(e.id)}
              aria-pressed={e.status === 'pago'}
              aria-label={`${e.description}, ${brl(e.value)}, vence ${e.due}. ${e.status === 'pago' ? 'Pago' : 'Em aberto'}. Alternar situação`}
              className="flex w-full items-center justify-between gap-2 rounded-xl border border-line px-3 py-2 text-left text-xs transition-colors hover:border-brand hover:bg-brand-soft/50"
            >
              <span className="min-w-0">
                <span className={`block truncate font-semibold ${e.status === 'pago' ? 'text-ink-2 line-through' : ''}`}>
                  {e.description}
                </span>
                <span className="block text-ink-2">Vence {e.due}</span>
              </span>
              <span className="flex shrink-0 flex-col items-end gap-1 sm:flex-row sm:items-center sm:gap-2">
                <span className={`font-semibold ${e.kind === 'receber' ? 'text-ok' : 'text-bad'}`}>
                  {e.kind === 'receber' ? '+' : '-'} {brl(e.value)}
                </span>
                <Pill className={e.status === 'pago' ? 'bg-ok/15 text-ok' : 'bg-cta/20 text-ink'}>
                  {e.status === 'pago' ? 'Pago' : 'Em aberto'}
                </Pill>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-ink-2">Clique em um lançamento para dar baixa e veja o saldo mudar.</p>
    </>
  )
}
