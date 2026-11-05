import { ArrowLeft, ArrowRight, X } from '@phosphor-icons/react'
import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import type { CaseItem } from '../lib/content'
import { Chip } from './ui'

export function CaseModal({ item, onClose }: { item: CaseItem | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  const reduce = useReducedMotion()
  const [pos, setPos] = useState({ name: '', i: 0 })
  const c = item
  const i = pos.name === c?.name ? pos.i : 0
  const setI = (n: number) => setPos({ name: c?.name ?? '', i: n })

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (item && !d.open) d.showModal()
    if (!item && d.open) d.close()
  }, [item])

  const imgs = c?.images ?? []
  const atStart = i === 0
  const atEnd = i >= imgs.length - 1

  return (
    <dialog
      ref={ref}
      aria-labelledby="case-title-modal"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose()
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight' && !atEnd) setI(i + 1)
        if (e.key === 'ArrowLeft' && !atStart) setI(i - 1)
      }}
      className="m-auto w-[min(920px,calc(100vw-24px))] max-h-[calc(100dvh-24px)] overflow-hidden rounded-[28px] bg-surface p-0 text-ink backdrop:bg-[#05071a]/75 backdrop:backdrop-blur-sm open:animate-[exit-in_.35s_cubic-bezier(.22,1,.36,1)]"
    >
      {c && (
        <div className="relative max-h-[calc(100dvh-24px)] overflow-y-auto p-5 [scrollbar-width:none] sm:p-8 [&::-webkit-scrollbar]:hidden">
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="absolute right-4 top-4 z-10 grid size-11 place-items-center rounded-full bg-surface-2 text-ink transition hover:bg-line"
          >
            <X size={18} weight="bold" />
          </button>

          <div className="pr-12">
            <Chip>{c.type}</Chip>
            <h3 id="case-title-modal" className="mt-3 font-display text-3xl font-bold tracking-tight">
              {c.name}
            </h3>
          </div>

          {imgs.length > 0 && (
            <>
              <div className="relative mt-5 overflow-hidden rounded-2xl border border-line bg-surface-2">
                <div
                  className={`flex ${reduce ? '' : 'transition-transform duration-500 ease-out'}`}
                  style={{ transform: `translateX(-${i * 100}%)` }}
                >
                  {imgs.map((src, n) => (
                    <div
                      key={src}
                      aria-hidden={n !== i}
                      className="h-[min(44dvh,440px)] w-full shrink-0"
                    >
                      <img
                        src={src}
                        alt={`${c.name}, tela ${n + 1} de ${imgs.length}`}
                        loading={n === 0 ? 'eager' : 'lazy'}
                        className="size-full object-contain"
                      />
                    </div>
                  ))}
                </div>

                {imgs.length > 1 &&
                  ([-1, 1] as const).map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setI(i + d)}
                      disabled={d === 1 ? atEnd : atStart}
                      aria-label={d === 1 ? 'Próxima tela' : 'Tela anterior'}
                      className={`absolute top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-ink text-bg shadow-lg transition enabled:hover:opacity-90 enabled:active:scale-95 disabled:cursor-not-allowed disabled:opacity-35 ${
                        d === 1 ? 'right-3' : 'left-3'
                      }`}
                    >
                      {d === 1 ? <ArrowRight size={18} weight="bold" /> : <ArrowLeft size={18} weight="bold" />}
                    </button>
                  ))}
              </div>

              {imgs.length > 1 && (
                <div className="mt-4 flex justify-center gap-2" role="group" aria-label="Telas do projeto">
                  {imgs.map((src, n) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setI(n)}
                      aria-label={`Ir para a tela ${n + 1}`}
                      aria-current={n === i}
                      className="grid h-6 place-items-center px-0.5"
                    >
                      <span className={`block h-2 rounded-full transition-all ${n === i ? 'w-6 bg-brand' : 'w-2 bg-line'}`} />
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          <p className="mt-5 text-ink-2">{c.details ?? c.text}</p>

          <a
            href="#diagnostico"
            onClick={onClose}
            className="mt-6 inline-flex min-h-[52px] items-center justify-center rounded-full bg-cta px-8 font-display font-bold text-cta-ink transition hover:bg-cta-hover active:scale-[0.98]"
          >
            Quero um sistema assim
          </a>
        </div>
      )}
    </dialog>
  )
}
