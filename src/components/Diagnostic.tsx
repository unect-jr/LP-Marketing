import { CheckCircle, WarningCircle, WhatsappLogo, ArrowRight } from '@phosphor-icons/react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useId, useMemo, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { CHALLENGES, DELIVERABLES, SEGMENTS, TEAM_SIZES } from '../lib/content'
import {
  EMPTY_LEAD,
  buildMessage,
  captureUtms,
  maskPhone,
  trackLead,
  trackWhatsappClick,
  validateField,
  validateLead,
  whatsappUrl,
  type LeadErrors,
  type LeadValues,
} from '../lib/lead'
import { Reveal, SectionHead } from './ui'

const fieldCls =
  'h-14 w-full rounded-xl border-[1.5px] bg-surface-2 px-3.5 text-base text-ink outline-none transition-[border-color,box-shadow] placeholder:text-ink-2/70 focus:border-brand focus:shadow-[0_0_0_3px_var(--brand-soft)]'

function Field({
  label,
  optional,
  error,
  id,
  className = '',
  children,
}: {
  label: string
  optional?: boolean
  error?: string
  id: string
  className?: string
  children: ReactNode
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="font-semibold text-ink">
        {label} {optional && <span className="font-normal text-ink-2">(opcional)</span>}
      </label>
      {children}
      <p id={`${id}-err`} aria-live="polite" className="min-h-0 text-[0.9375rem] text-bad">
        {error && (
          <span className="flex items-center gap-1.5">
            <WarningCircle weight="fill" size={16} aria-hidden /> {error}
          </span>
        )}
      </p>
    </div>
  )
}

export function Diagnostic() {
  const uid = useId()
  const reduce = useReducedMotion()
  const [values, setValues] = useState<LeadValues>(EMPTY_LEAD)
  const [errors, setErrors] = useState<LeadErrors>({})
  const [sentUrl, setSentUrl] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const utms = useMemo(captureUtms, [])

  const id = (n: keyof LeadValues) => `${uid}-${n}`
  const aria = (n: keyof LeadValues) => ({
    id: id(n),
    name: n,
    'aria-invalid': errors[n] ? true : undefined,
    'aria-describedby': `${id(n)}-err`,
  })
  const border = (n: keyof LeadValues) => (errors[n] ? 'border-bad' : 'border-line')

  const onChange = (n: keyof LeadValues) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const v = n === 'whatsapp' ? maskPhone(e.target.value) : e.target.value
    setValues((s) => ({ ...s, [n]: v }))
    if (errors[n]) setErrors((s) => ({ ...s, [n]: validateField(n, v) }))
  }
  const onBlur = (n: keyof LeadValues) => () => setErrors((s) => ({ ...s, [n]: validateField(n, values[n]) }))

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const errs = validateLead(values)
    setErrors(errs)
    const firstBad = (['nome', 'whatsapp', 'empresa', 'desafio'] as const).find((k) => errs[k])
    if (firstBad) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstBad}"]`)?.focus()
      return
    }
    // O link nasce dentro do clique do usuário: evita bloqueio de pop-up.
    const url = whatsappUrl(buildMessage(values, utms))
    window.open(url, '_blank', 'noopener,noreferrer')
    trackLead(values)
    setSentUrl(url)
  }

  return (
    <section id="diagnostico" aria-labelledby="diag-title" className="night section-y">
      <div className="container-lp grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Formulário primeiro no DOM (e no celular) */}
        <Reveal className="lg:order-2">
          <div className="rounded-[28px] border border-line bg-surface p-6 sm:p-10">
            <AnimatePresence mode="wait" initial={false}>
              {sentUrl ? (
                <motion.div
                  key="ok"
                  initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-start gap-4 py-6"
                  role="status"
                >
                  <CheckCircle weight="fill" size={56} className="text-ok" aria-hidden />
                  <h3 className="font-display text-3xl font-bold">Tudo certo! Abrindo o WhatsApp…</h3>
                  <p className="text-ink-2">Sua mensagem já está pronta. É só tocar em Enviar.</p>
                  <a
                    href={sentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={trackWhatsappClick}
                    className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-wa px-8 py-4 font-display font-bold text-[#06220f] transition hover:brightness-95 active:scale-[0.98] sm:w-auto"
                  >
                    <WhatsappLogo weight="fill" size={22} aria-hidden /> Abrir o WhatsApp
                  </a>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  onSubmit={onSubmit}
                  noValidate
                  exit={{ opacity: 0, y: -8 }}
                  aria-labelledby={`${uid}-ft`}
                >
                  <h3 id={`${uid}-ft`} className="font-display text-3xl font-bold">
                    Peça seu diagnóstico
                  </h3>
                  <p className="mb-6 mt-1 text-ink-2">Leva menos de 1 minuto. A conversa continua no WhatsApp.</p>

                  <div className="grid gap-x-4 sm:grid-cols-2">
                    <Field id={id('nome')} label="Nome" error={errors.nome} className="sm:col-span-2">
                      <input {...aria('nome')} type="text" autoComplete="name" value={values.nome} onChange={onChange('nome')} onBlur={onBlur('nome')} className={`${fieldCls} ${border('nome')}`} />
                    </Field>
                    <Field id={id('whatsapp')} label="WhatsApp com DDD" error={errors.whatsapp}>
                      <input {...aria('whatsapp')} type="tel" inputMode="tel" autoComplete="tel-national" placeholder="(43) 99999-9999" value={values.whatsapp} onChange={onChange('whatsapp')} onBlur={onBlur('whatsapp')} className={`${fieldCls} ${border('whatsapp')}`} />
                    </Field>
                    <Field id={id('empresa')} label="Empresa" error={errors.empresa}>
                      <input {...aria('empresa')} type="text" autoComplete="organization" value={values.empresa} onChange={onChange('empresa')} onBlur={onBlur('empresa')} className={`${fieldCls} ${border('empresa')}`} />
                    </Field>
                    <Field id={id('desafio')} label="Maior desafio" error={errors.desafio} className="sm:col-span-2">
                      <select {...aria('desafio')} value={values.desafio} onChange={onChange('desafio')} onBlur={onBlur('desafio')} className={`${fieldCls} ${border('desafio')}`}>
                        <option value="">Selecione…</option>
                        {CHALLENGES.map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    </Field>
                    <Field id={id('segmento')} label="Segmento" optional>
                      <select {...aria('segmento')} value={values.segmento} onChange={onChange('segmento')} className={`${fieldCls} border-line`}>
                        <option value="">Selecione…</option>
                        {SEGMENTS.map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    </Field>
                    <Field id={id('equipe')} label="Tamanho da equipe" optional>
                      <select {...aria('equipe')} value={values.equipe} onChange={onChange('equipe')} className={`${fieldCls} border-line`}>
                        <option value="">Selecione…</option>
                        {TEAM_SIZES.map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  {Object.entries(utms).map(([k, v]) => (
                    <input key={k} type="hidden" name={k} value={v} />
                  ))}

                  <button
                    type="submit"
                    className="group mt-2 inline-flex min-h-[60px] w-full items-center justify-between gap-2 rounded-full bg-cta py-2 pl-8 pr-2 font-display font-bold text-cta-ink transition-[transform,background-color] duration-200 hover:bg-cta-hover active:scale-[0.98]"
                  >
                    Enviar e abrir o WhatsApp
                    <span className="grid size-11 place-items-center rounded-full bg-cta-ink text-cta transition-transform group-hover:translate-x-1">
                      <ArrowRight weight="bold" size={20} aria-hidden />
                    </span>
                  </button>
                  <p className="mt-3 text-[0.9375rem] text-ink-2">
                    Seus dados vão só na mensagem que você mesmo envia pelo WhatsApp oficial da Unect Jr.
                  </p>
                  <p className="mt-3 text-[0.9375rem]">
                    Prefere falar direto?{' '}
                    <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" onClick={trackWhatsappClick} className="font-semibold text-brand underline underline-offset-4">
                      Chame no WhatsApp
                    </a>
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>

        <div className="flex flex-col gap-8 lg:order-1 lg:pt-4">
          <SectionHead
            id="diag-title"
            n={7}
            label="Diagnóstico gratuito"
            title="Descubra quanto as planilhas custam à sua empresa"
            lead="Em uma reunião online de 30 a 45 minutos mapeamos sua operação. Você sai com um plano claro, mesmo que decida não contratar."
          />
          <Reveal>
            <p className="mb-4 font-display font-bold">O que você recebe</p>
            <ol className="flex flex-col gap-4">
              {DELIVERABLES.map(([t, d], i) => (
                <li key={t} className="flex gap-4">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-soft font-display text-sm font-bold text-brand">
                    {i + 1}
                  </span>
                  <p>
                    <strong className="font-semibold">{t}:</strong> <span className="text-ink-2">{d}</span>
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
