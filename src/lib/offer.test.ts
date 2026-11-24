import { describe, expect, it } from 'vitest'
import { getSelectedOffer, selectOffer } from './offer'

describe('oferta selecionada', () => {
  it('guarda a última oferta escolhida', () => {
    expect(getSelectedOffer()).toBe('')
    selectOffer('sem-entrada')
    expect(getSelectedOffer()).toBe('sem-entrada')
    selectOffer('sistema-site')
    expect(getSelectedOffer()).toBe('sistema-site')
  })
})
