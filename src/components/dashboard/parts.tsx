import type { ReactNode } from 'react'
import { STATUS_META, type Order } from './data'

export function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: T
  options: { id: T; label: string }[]
  onChange: (id: T) => void
}) {
  return (
    <div role="group" aria-label={label} className="flex w-fit flex-wrap gap-1 rounded-full bg-surface-2 p-1">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          aria-pressed={o.id === value}
          onClick={() => onChange(o.id)}
          className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
            o.id === value ? 'bg-brand text-white shadow-sm' : 'text-ink-2 hover:text-ink'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

export function Pill({ className, children }: { className: string; children: ReactNode }) {
  return <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${className}`}>{children}</span>
}

export function Kpi({ label, children, tone = '' }: { label: string; children: ReactNode; tone?: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-surface-2 p-3 transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:block sm:p-4">
      <p className="text-xs text-ink-2">{label}</p>
      <div className={`font-display text-lg font-bold leading-tight sm:text-2xl ${tone}`}>{children}</div>
    </div>
  )
}

export function OrderRow({ code, title, client, status }: Order) {
  const meta = STATUS_META[status]
  return (
    <li className="flex items-center justify-between gap-2 rounded-xl border border-line px-3 py-2 text-xs transition-colors hover:border-brand hover:bg-brand-soft/50">
      <span className="min-w-0">
        <span className="block truncate font-semibold">
          {code} · {title}
        </span>
        <span className="block truncate text-ink-2">{client}</span>
      </span>
      <Pill className={meta.cls}>{meta.label}</Pill>
    </li>
  )
}
