import { CLIENTS } from '../../lib/content'
import { Marquee } from '../ui'

export function Logos() {
  return (
    <section aria-label="Clientes atendidos" className="border-y border-line py-10">
      <p className="mb-6 text-center text-[0.9375rem] text-ink-2">Empresas que já confiaram na Unect Jr.</p>
      <div className="[mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <Marquee speed={90} repeat={2}>
          <ul className="flex items-center gap-6 pr-6 sm:gap-10 sm:pr-10" aria-label={CLIENTS.map((c) => c.name).join(', ')}>
            {CLIENTS.map((c) => (
              <li
                key={c.name}
                className="flex h-16 shrink-0 items-center rounded-xl bg-white px-4 opacity-75 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
              >
                <img src={c.src} alt={c.name} width={c.w} height={c.h} loading="lazy" className="h-10 w-auto" />
              </li>
            ))}
          </ul>
        </Marquee>
      </div>
    </section>
  )
}
