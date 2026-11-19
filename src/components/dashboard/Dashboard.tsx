import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useRef, useState, type KeyboardEvent, type ReactElement } from 'react'
import { VIEWS, type ViewId } from './data'
import { FinanceView } from './views/FinanceView'
import { OrdersView } from './views/OrdersView'
import { PanelView } from './views/PanelView'
import { ReportsView } from './views/ReportsView'
import { StockView } from './views/StockView'

const VIEW_COMPONENT: Record<ViewId, () => ReactElement> = {
  painel: PanelView,
  ordens: OrdersView,
  financeiro: FinanceView,
  estoque: StockView,
  relatorios: ReportsView,
}

export function InteractiveDashboard() {
  const reduce = useReducedMotion()
  const [view, setView] = useState<ViewId>('painel')
  const [touched, setTouched] = useState(false)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])

  const current = VIEWS.find((v) => v.id === view) ?? VIEWS[0]
  const View = VIEW_COMPONENT[view]

  const select = (id: ViewId) => {
    setView(id)
    setTouched(true)
  }

  const onKeyDown = (e: KeyboardEvent, index: number) => {
    const moves: Record<string, number> = {
      ArrowDown: index + 1,
      ArrowRight: index + 1,
      ArrowUp: index - 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: VIEWS.length - 1,
    }
    if (!(e.key in moves)) return
    e.preventDefault()
    const next = (moves[e.key] + VIEWS.length) % VIEWS.length
    select(VIEWS[next].id)
    tabs.current[next]?.focus()
  }

  return (
    <div className="overflow-hidden rounded-[22px] border border-line bg-surface shadow-[0_40px_100px_-30px_rgb(41_98_255/0.35)]">
      <div className="flex items-center gap-2 border-b border-line bg-surface-2 px-4 py-3">
        <span className="size-2.5 rounded-full bg-bad/70" />
        <span className="size-2.5 rounded-full bg-cta" />
        <span className="size-2.5 rounded-full bg-ok" />
        <span className="ml-3 hidden rounded-full bg-surface px-3 py-0.5 text-xs text-ink-2 sm:block">
          painel.suaempresa.com.br/{view}
        </span>
      </div>
      <div className="grid grid-cols-[56px_minmax(0,1fr)] sm:grid-cols-[72px_minmax(0,1fr)]">
        <div
          role="tablist"
          aria-orientation="vertical"
          aria-label="Áreas do sistema"
          className="flex flex-col items-center gap-2 border-r border-line py-4"
        >
          {VIEWS.map(({ id, label, Icon }, i) => {
            const selected = id === view
            return (
              <button
                key={id}
                ref={(el) => {
                  tabs.current[i] = el
                }}
                type="button"
                role="tab"
                id={`dash-tab-${id}`}
                aria-selected={selected}
                aria-controls="dash-panel"
                aria-label={label}
                title={label}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`group relative grid size-11 place-items-center rounded-xl transition-colors ${
                  selected ? 'bg-brand-soft text-brand' : 'text-ink-2 hover:bg-surface-2 hover:text-ink'
                }`}
              >
                <Icon size={22} weight={selected ? 'fill' : 'regular'} aria-hidden />
                {!touched && i === 1 && (
                  <span aria-hidden className="absolute inset-0 animate-ping rounded-xl border-2 border-brand/60" />
                )}
              </button>
            )
          })}
        </div>
        <div className="min-h-[400px] p-4 sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="font-display text-sm font-bold sm:text-base">{current.title}</p>
            <span className="flex shrink-0 items-center gap-1.5 text-xs font-semibold text-ok">
              <span className="size-2 rounded-full bg-ok" aria-hidden /> Atualizado
            </span>
          </div>
          <div role="tabpanel" id="dash-panel" aria-labelledby={`dash-tab-${view}`} tabIndex={0}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={view}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
              >
                <View />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
