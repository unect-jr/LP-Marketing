import { describe, expect, it } from 'vitest'
import { computeRemaining } from './countdown'

describe('computeRemaining', () => {
  const end = Date.parse('2026-11-30T00:00:00Z')
  it('quebra o tempo restante em dias, horas, minutos e segundos', () => {
    const now = end - ((2 * 24 + 3) * 3600 + 4 * 60 + 5) * 1000
    expect(computeRemaining(end, now)).toEqual({ days: 2, hours: 3, minutes: 4, seconds: 5, done: false })
  })
  it('marca como encerrado e nunca fica negativo', () => {
    expect(computeRemaining(end, end + 10_000)).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0, done: true })
  })
})
