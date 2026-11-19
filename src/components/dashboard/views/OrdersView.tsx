import { useState } from 'react'
import { ORDERS, type OrderStatus } from '../data'
import { OrderRow, Segmented } from '../parts'

type OrderFilter = 'todas' | OrderStatus

const ORDER_FILTERS: { id: OrderFilter; label: string }[] = [
  { id: 'todas', label: 'Todas' },
  { id: 'andamento', label: 'Em andamento' },
  { id: 'aguardando', label: 'Aguardando' },
  { id: 'entregue', label: 'Entregues' },
]

export function OrdersView() {
  const [filter, setFilter] = useState<OrderFilter>('todas')
  const list = filter === 'todas' ? ORDERS : ORDERS.filter((o) => o.status === filter)

  return (
    <>
      <Segmented label="Filtrar ordens de serviço" value={filter} options={ORDER_FILTERS} onChange={setFilter} />
      <ul className="mt-4 flex flex-col gap-2">
        {list.map((o) => (
          <OrderRow key={o.code} {...o} />
        ))}
      </ul>
      <p className="mt-3 text-xs text-ink-2" aria-live="polite">
        {list.length} {list.length === 1 ? 'ordem' : 'ordens'} na lista
      </p>
    </>
  )
}
