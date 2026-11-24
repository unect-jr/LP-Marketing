import { Check, X } from '@phosphor-icons/react'
import { useEffect, useRef, useState } from 'react'
import { LEAD_SENT_KEY, LeadForm } from './LeadForm'

const SHOWN_KEY = 'lp_exit_shown'
const MIN_TIME_ON_PAGE = 8000

const BULLETS = [
  'Site com 1 ano de hospedagem, sistema com site de brinde ou projeto sem entrada',
  'Mapa dos gargalos em uma reunião online de 30 a 45 minutos',
  'Proposta e arquitetura do sistema por escrito, em até 24h',
  'Sem compromisso e sem mensalidade por usuário',
]

function safeGet(k: string) {
  try {
    return sessionStorage.getItem(k)
  } catch {
    return null
  }
}
function safeSet(k: string) {
  try {
    sessionStorage.setItem(k, '1')
  } catch {
  }
}

export function ExitIntent() {
  const ref = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const start = Date.now()

    const onLeave = (e: MouseEvent) => {
      if (e.relatedTarget || e.clientY > 0) return
      if (Date.now() - start < MIN_TIME_ON_PAGE) return
      if (safeGet(SHOWN_KEY) || safeGet(LEAD_SENT_KEY)) return
      const form = document.getElementById('diagnostico')?.getBoundingClientRect()
      if (form && form.top < window.innerHeight * 0.6 && form.bottom > window.innerHeight * 0.4) return
      safeSet(SHOWN_KEY)
      setOpen(true)
    }
    document.addEventListener('mouseout', onLeave)
    return () => document.removeEventListener('mouseout', onLeave)
  }, [])

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-labelledby="exit-title"
      onClose={() => setOpen(false)}
      onClick={(e) => {
        if (e.target === ref.current) setOpen(false)
      }}
      className="m-auto w-[min(940px,calc(100vw-24px))] max-h-[calc(100dvh-24px)] overflow-hidden rounded-[28px] bg-transparent p-0 text-ink backdrop:bg-black/80 backdrop:backdrop-blur-sm open:animate-[exit-in_.35s_cubic-bezier(.22,1,.36,1)]"
    >
      {open && (
        <div className="grid max-h-[calc(100dvh-24px)] overflow-y-auto lg:grid-cols-[0.95fr_1.05fr]">
          <div className="night hidden flex-col justify-center gap-6 p-10 lg:flex">
            <span className="w-fit rounded-full border border-cta/50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand">
              UBlack · ofertas por tempo limitado
            </span>
            <h2 id="exit-title" className="font-display text-4xl font-bold leading-[1.08] tracking-tight">
              Antes de ir embora, garanta sua oferta UBlack.
            </h2>
            <p className="text-ink-2">
              As ofertas da UBlack valem só enquanto o contador estiver ativo. Escolha a sua e fale com a Unect Jr. pelo
              WhatsApp, sem compromisso.
            </p>
            <ul className="flex flex-col gap-3">
              {BULLETS.map((b) => (
                <li key={b} className="flex items-start gap-3 font-semibold">
                  <Check weight="bold" size={18} className="mt-1 shrink-0 text-brand" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative bg-surface p-6 sm:p-10">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fechar"
              className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-surface-2 text-ink transition hover:bg-line"
            >
              <X size={18} weight="bold" />
            </button>
            <p className="mb-2 pr-12 font-display text-sm font-bold text-brand lg:hidden" id="exit-title-sm">
              UBlack · ofertas por tempo limitado
            </p>
            <LeadForm
              compact
              title="Garanta sua oferta UBlack agora"
              subtitle="Leva menos de 1 minuto. A conversa continua no WhatsApp."
              onSent={() => safeSet(SHOWN_KEY)}
            />
            <p className="mt-2 text-center">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-[0.9375rem] text-ink-2 underline underline-offset-4 hover:text-ink"
              >
                Agora não
              </button>
            </p>
          </div>
        </div>
      )}
    </dialog>
  )
}
