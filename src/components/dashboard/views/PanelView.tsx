import { TrendUp } from '@phosphor-icons/react'
import { CountUp } from '../../ui'
import { DRE, ORDERS, margin } from '../data'
import { Kpi, OrderRow } from '../parts'
import { RevenueChart } from './RevenueChart'

export function PanelView() {
  return (
    <>
      <div className="grid gap-2 sm:grid-cols-3 sm:gap-4">
        <Kpi label="Faturamento">
          <CountUp to={148} prefix="R$ " suffix=" mil" />
          <span className="mt-0.5 flex items-center gap-1 font-sans text-xs font-semibold text-ok">
            <TrendUp size={14} weight="bold" aria-hidden />
            12,4%
          </span>
        </Kpi>
        <Kpi label="OS em aberto">
          <CountUp to={23} />
        </Kpi>
        <Kpi label="Margem">{margin(DRE.mes)}</Kpi>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-[1.2fr_1fr]">
        <RevenueChart />
        <ul className="hidden flex-col gap-2 sm:flex">
          {[ORDERS[0], ORDERS[2], ORDERS[4]].map((o) => (
            <OrderRow key={o.code} {...o} />
          ))}
        </ul>
      </div>
    </>
  )
}
