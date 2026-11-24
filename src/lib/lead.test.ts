import { describe, expect, it } from 'vitest'
import { EMPTY_LEAD, buildMessage, maskPhone, validateField, validateLead, whatsappUrl } from './lead'

describe('maskPhone', () => {
  it('aplica a máscara de celular e telefone fixo', () => {
    expect(maskPhone('43999998888')).toBe('(43) 99999-8888')
    expect(maskPhone('4333334444')).toBe('(43) 3333-4444')
    expect(maskPhone('4')).toBe('(4')
    expect(maskPhone('')).toBe('')
  })
  it('ignora letras e limita a 11 dígitos', () => {
    expect(maskPhone('abc43999998888999')).toBe('(43) 99999-8888')
  })
})

describe('validação', () => {
  it('exige DDD no WhatsApp', () => {
    expect(validateField('whatsapp', '99999-8888')).toBeDefined()
    expect(validateField('whatsapp', '(43) 99999-8888')).toBeUndefined()
  })
  it('lista só os campos obrigatórios inválidos', () => {
    expect(Object.keys(validateLead(EMPTY_LEAD)).sort()).toEqual(['desafio', 'empresa', 'nome', 'whatsapp'])
  })
})

describe('mensagem do WhatsApp', () => {
  const lead = { ...EMPTY_LEAD, nome: ' Ana ', empresa: 'Acme', desafio: 'Retrabalho manual', whatsapp: '(43) 99999-8888' }
  it('inclui origem de campanha ou acesso direto', () => {
    expect(buildMessage(lead, {}, '')).toContain('acesso direto')
    expect(buildMessage(lead, { utm_source: 'google' }, '')).toContain('utm_source=google')
  })
  it('omite campos opcionais vazios e tira espaços do nome', () => {
    const m = buildMessage(lead, {}, '')
    expect(m).toContain('*Nome:* Ana')
    expect(m).not.toContain('Segmento')
  })
  it('inclui a oferta escolhida na mensagem', () => {
    expect(buildMessage(lead, {}, 'sem-entrada')).toContain('*Oferta escolhida:* Projeto sem entrada')
    expect(buildMessage(lead, {}, '')).toContain('Ainda não escolhi')
  })
  it('sem campanha, volta ao texto do diagnóstico', () => {
    const m = buildMessage(lead, {}, null)
    expect(m).toContain('Diagnóstico Operacional Gratuito')
    expect(m).not.toContain('UBlack')
    expect(m).not.toContain('Oferta')
  })
  it('gera link wa.me codificado', () => {
    expect(whatsappUrl('a b')).toBe('https://wa.me/554388696363?text=a%20b')
  })
})
