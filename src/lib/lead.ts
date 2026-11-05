import { WHATSAPP_NUMBER } from './content'

export interface LeadValues {
  nome: string
  whatsapp: string
  empresa: string
  desafio: string
  segmento: string
  equipe: string
}

export type LeadErrors = Partial<Record<keyof LeadValues, string>>

export const EMPTY_LEAD: LeadValues = {
  nome: '',
  whatsapp: '',
  empresa: '',
  desafio: '',
  segmento: '',
  equipe: '',
}

export function maskPhone(raw: string): string {
  const d = raw.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d.length ? `(${d}` : ''
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

export function validateField(name: keyof LeadValues, value: string): string | undefined {
  const v = value.trim()
  switch (name) {
    case 'nome':
      return v.length < 2 ? 'Informe seu nome.' : undefined
    case 'whatsapp': {
      const d = v.replace(/\D/g, '')
      return d.length < 10 || d.length > 11 ? 'Informe o WhatsApp com DDD, ex.: (43) 99999-9999.' : undefined
    }
    case 'empresa':
      return v.length < 2 ? 'Informe o nome da empresa.' : undefined
    case 'desafio':
      return v ? undefined : 'Escolha seu maior desafio.'
    default:
      return undefined
  }
}

export function validateLead(values: LeadValues): LeadErrors {
  const errors: LeadErrors = {}
  for (const key of ['nome', 'whatsapp', 'empresa', 'desafio'] as const) {
    const msg = validateField(key, values[key])
    if (msg) errors[key] = msg
  }
  return errors
}

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'] as const

export function captureUtms(): Record<string, string> {
  const out: Record<string, string> = {}
  try {
    const params = new URLSearchParams(window.location.search)
    for (const k of UTM_KEYS) {
      const v = params.get(k)
      if (v) out[k] = v.slice(0, 200)
    }
  } catch {
  }
  return out
}

export function buildMessage(v: LeadValues, utms: Record<string, string>): string {
  const origem = Object.keys(utms).length
    ? ['utm_source', 'utm_campaign'].filter((k) => utms[k]).map((k) => `${k}=${utms[k]}`).join(' | ') ||
      'campanha identificada'
    : 'acesso direto'
  const lines = [
    'Olá, equipe Unect Jr.! Quero solicitar o *Diagnóstico Operacional Gratuito*.',
    '',
    `*Nome:* ${v.nome.trim()}`,
    `*Empresa:* ${v.empresa.trim()}`,
    `*Maior desafio:* ${v.desafio}`,
  ]
  if (v.segmento) lines.push(`*Segmento:* ${v.segmento}`)
  if (v.equipe) lines.push(`*Equipe:* ${v.equipe} pessoas`)
  lines.push(`*WhatsApp:* ${v.whatsapp}`, '', `_Origem: ${origem}_`)
  return lines.join('\n')
}

export function whatsappUrl(text?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}

type Fn = (...args: unknown[]) => void
interface TrackWindow {
  gtag?: Fn
  fbq?: Fn
}

function w(): TrackWindow {
  return window as unknown as TrackWindow
}

export function trackLead(v: LeadValues) {
  try {
    w().gtag?.('event', 'generate_lead', { segmento: v.segmento, equipe: v.equipe })
    w().fbq?.('track', 'Lead', { content_name: 'Diagnostico Gratuito' })
  } catch {
  }
}

export function trackWhatsappClick() {
  try {
    w().gtag?.('event', 'contact', { method: 'whatsapp' })
  } catch {
  }
}
