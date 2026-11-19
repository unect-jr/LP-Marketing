import { ChartLineUp, ClipboardText, Cube, Receipt, SquaresFour, type Icon } from '@phosphor-icons/react'

export type ViewId = 'painel' | 'ordens' | 'financeiro' | 'estoque' | 'relatorios'

export interface ViewMeta {
  id: ViewId
  label: string
  title: string
  Icon: Icon
}

export const VIEWS: ViewMeta[] = [
  { id: 'painel', label: 'Painel', title: 'Painel de Gestão · Outubro', Icon: SquaresFour },
  { id: 'ordens', label: 'Ordens de serviço', title: 'Ordens de serviço', Icon: ClipboardText },
  { id: 'financeiro', label: 'Financeiro', title: 'Contas a pagar e receber', Icon: Receipt },
  { id: 'estoque', label: 'Estoque', title: 'Estoque', Icon: Cube },
  { id: 'relatorios', label: 'Relatórios', title: 'DRE simplificada', Icon: ChartLineUp },
]

export const MONTHS = ['Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out']
export const REVENUE = [92, 104, 112, 121, 118, 134, 148]

export type OrderStatus = 'andamento' | 'aguardando' | 'entregue'

export const STATUS_META: Record<OrderStatus, { label: string; cls: string }> = {
  andamento: { label: 'Em andamento', cls: 'bg-brand-soft text-brand' },
  aguardando: { label: 'Aguardando peça', cls: 'bg-cta/20 text-ink' },
  entregue: { label: 'Entregue', cls: 'bg-ok/15 text-ok' },
}

export interface Order {
  code: string
  title: string
  client: string
  status: OrderStatus
}

export const ORDERS: Order[] = [
  { code: 'OS 0412', title: 'Manutenção preventiva', client: 'Metalúrgica Norte', status: 'andamento' },
  { code: 'OS 0411', title: 'Troca de rolamentos', client: 'Distribuidora Vale', status: 'andamento' },
  { code: 'OS 0409', title: 'Instalação', client: 'Clínica Aurora', status: 'entregue' },
  { code: 'OS 0407', title: 'Revisão elétrica', client: 'Mercado Central', status: 'entregue' },
  { code: 'OS 0405', title: 'Reparo', client: 'Agro Paraná', status: 'aguardando' },
]

export type EntryStatus = 'aberto' | 'pago'

export interface Entry {
  id: string
  description: string
  due: string
  value: number
  kind: 'receber' | 'pagar'
  status: EntryStatus
}

export const ENTRIES: Entry[] = [
  { id: 'e1', description: 'Mensalidade Distribuidora Vale', due: '08/11', value: 18400, kind: 'receber', status: 'aberto' },
  { id: 'e2', description: 'Fornecedor de peças', due: '10/11', value: 9200, kind: 'pagar', status: 'aberto' },
  { id: 'e3', description: 'Projeto Clínica Aurora', due: '12/11', value: 26500, kind: 'receber', status: 'aberto' },
  { id: 'e4', description: 'Folha de pagamento', due: '05/11', value: 31800, kind: 'pagar', status: 'pago' },
]

export interface StockItem {
  name: string
  qty: number
  min: number
  max: number
}

export const STOCK: StockItem[] = [
  { name: 'Rolamento 6205', qty: 42, min: 20, max: 80 },
  { name: 'Correia dentada B52', qty: 9, min: 12, max: 40 },
  { name: 'Filtro de óleo', qty: 27, min: 15, max: 50 },
  { name: 'Sensor de temperatura', qty: 6, min: 10, max: 30 },
]

export type Period = 'mes' | 'trimestre'

export const DRE: Record<Period, { receita: number; custos: number; despesas: number }> = {
  mes: { receita: 148, custos: 71, despesas: 31 },
  trimestre: { receita: 400, custos: 198, despesas: 92 },
}

export const brl = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
export const mil = (n: number) => `R$ ${n.toLocaleString('pt-BR')} mil`

export const margin = ({ receita, custos, despesas }: (typeof DRE)[Period]) =>
  `${(((receita - custos - despesas) / receita) * 100).toFixed(1).replace('.', ',')}%`
