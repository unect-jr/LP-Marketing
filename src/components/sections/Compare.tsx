import { Check, Minus, X, type Icon } from '@phosphor-icons/react'
import { COMPARE_COLS, COMPARE_ROWS, type Cell, type Mark } from '../../lib/content'
import { CtaButton, Reveal, SectionHead } from '../ui'

const MARK: Record<Mark, { Icon: Icon; cls: string; sr: string }> = {
  ok: { Icon: Check, cls: 'text-ok', sr: 'Bom: ' },
  mid: { Icon: Minus, cls: 'text-ink-2', sr: 'Regular: ' },
  bad: { Icon: X, cls: 'text-bad', sr: 'Ruim: ' },
}

function Mk({ cell }: { cell: Cell }) {
  const { Icon: I, cls, sr } = MARK[cell.mark]
  return (
    <span className="flex items-start gap-2.5">
      <I weight="bold" size={18} className={`mt-1 shrink-0 ${cls}`} aria-hidden />
      <span>
        <span className="sr-only">{sr}</span>
        {cell.text}
      </span>
    </span>
  )
}

export function Compare() {
  return (
    <section id="comparativo" aria-labelledby="comparativo-title" className="night section-y">
      <div className="container-lp flex flex-col gap-16">
        <SectionHead
          id="comparativo-title"
          n={1}
          label="Comparativo"
          title="Planilha, ERP genérico ou sob medida?"
          lead="Toda empresa em crescimento chega a esse ponto. Veja o que cada opção entrega na prática."
        />

        <Reveal className="hidden lg:block">
          <table className="w-full border-separate border-spacing-0 text-left">
            <caption className="sr-only">Comparação entre planilhas, ERP genérico e sistema sob medida da Unect</caption>
            <thead>
              <tr>
                <th scope="col" className="w-[19%] p-5 text-sm font-semibold text-ink-2">
                  Critério
                </th>
                {COMPARE_COLS.map((c, i) => (
                  <th
                    key={c}
                    scope="col"
                    className={`p-5 font-display text-lg ${
                      i === 2 ? 'rounded-t-3xl border-x border-t border-brand bg-brand/10 pt-7 text-ink' : 'text-ink-2'
                    }`}
                  >
                    {i === 2 && (
                      <span className="mb-2 block w-fit rounded-full bg-cta px-3 py-0.5 text-[0.7rem] font-bold uppercase tracking-wider text-cta-ink">
                        Recomendado
                      </span>
                    )}
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map((r, ri) => (
                <tr key={r.criterion}>
                  <th scope="row" className="border-t border-line p-5 align-top font-display text-sm font-semibold">
                    {r.criterion}
                  </th>
                  {r.cells.map((c, ci) => (
                    <td
                      key={ci}
                      className={`border-t border-line p-5 align-top text-[0.97rem] ${
                        ci === 2
                          ? `border-x border-x-brand bg-brand/10 ${ri === COMPARE_ROWS.length - 1 ? 'rounded-b-3xl border-b border-b-brand' : ''}`
                          : 'text-ink-2'
                      }`}
                    >
                      <Mk cell={c} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <div className="flex flex-col gap-4 lg:hidden">
          {[2, 0, 1].map((ci) => (
            <Reveal key={ci}>
              <div
                className={`rounded-3xl p-6 ${ci === 2 ? 'border border-brand bg-brand/10' : 'border border-line bg-surface'}`}
              >
                <h3 className="mb-5 flex flex-wrap items-center gap-3 font-display text-xl font-bold">
                  {COMPARE_COLS[ci]}
                  {ci === 2 && (
                    <span className="rounded-full bg-cta px-3 py-0.5 text-[0.7rem] font-bold uppercase tracking-wider text-cta-ink">
                      Recomendado
                    </span>
                  )}
                </h3>
                <dl className="flex flex-col gap-4">
                  {COMPARE_ROWS.map((r) => (
                    <div key={r.criterion}>
                      <dt className="text-sm font-semibold text-ink-2">{r.criterion}</dt>
                      <dd className="mt-1">
                        <Mk cell={r.cells[ci]} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <CtaButton />
        </Reveal>
      </div>
    </section>
  )
}
