# Requisitos da LP: Sistema de Gestão Sob Medida (Unect Jr.)

Documento de referência para a refatoração da landing page. Tudo que for construído ou alterado na LP deve atender a estas regras. Quando uma regra mudar, atualize este arquivo no mesmo commit.

- **Versão:** 1.0 (nov/2026)
- **Base:** LP atual em `landing-page/index.html` (conteúdo, marca, copy e fluxo de WhatsApp)
- **Documentos irmãos:** [`UI.md`](./UI.md) (design system e componentes) e [`CONTEUDO.md`](./CONTEUDO.md) (copy final por seção)

---

## 1. Objetivo e contexto

| Item | Definição |
|---|---|
| Produto | Sistema web de gestão sob medida (financeiro, DRE, estoque, ordens de serviço, dashboards, automações) |
| Empresa | Unect Jr., empresa júnior da UTFPR Câmpus Cornélio Procópio |
| Público | Donos, sócios e gestores de PMEs de Cornélio Procópio e região (Norte do Paraná) que hoje operam em planilhas ou num ERP genérico que não se encaixa |
| Dor principal | Planilhas que quebram com o crescimento: retrabalho, erros manuais, falta de relatório confiável |
| Diferenciais | Feito para a rotina da empresa; sem mensalidade por usuário ou por módulo; investimento de Empresa Júnior; atendimento 100% online |
| **Conversão única** | Pedido de **Diagnóstico Operacional Gratuito** pelo WhatsApp |
| Conversão secundária | Conversa direta no WhatsApp (botão flutuante e link no formulário) |

**Regra de ouro:** cada seção da página existe para levar o visitante ao formulário de diagnóstico. Se uma seção não ajuda nessa decisão, ela sai.

---

## 2. Requisitos funcionais

### RF-01 Estrutura da página (ordem obrigatória)

1. Header fixo com logo e um CTA
2. Hero: promessa, prova rápida e CTA principal
3. Faixa de logos de clientes
4. Comparativo (planilha x ERP genérico x sob medida)
5. Módulos
6. Como funciona (4 passos)
7. Cases
8. Depoimentos
9. Perguntas frequentes
10. Formulário de diagnóstico (seção de conversão)
11. Rodapé

### RF-02 CTA

- Existe **um único texto de CTA principal** em toda a página: "Quero meu diagnóstico gratuito". Variações curtas são permitidas só onde falta espaço (header e barra móvel: "Diagnóstico grátis").
- Todo CTA principal leva para `#diagnostico` com rolagem suave.
- O CTA aparece no mínimo em: header, hero, fim do comparativo, fim do "Como funciona" e barra fixa no celular.
- Abaixo do CTA do hero ficam 3 microgarantias: "Reunião 100% online", "Sem compromisso", "Proposta em até 24h".

### RF-03 Formulário de diagnóstico

- **Campos obrigatórios (4):** Nome, WhatsApp com DDD, Empresa, Maior desafio.
- **Campos opcionais (2):** Segmento, Tamanho da equipe. O e-mail sai do formulário: o contato acontece pelo WhatsApp e cada campo a mais reduz a conversão.
- Máscara de telefone `(XX) XXXXX-XXXX` / `(XX) XXXX-XXXX`; teclado numérico no celular (`inputmode="tel"`).
- Validação no `blur` e no envio, com mensagem de erro abaixo do campo, ligada por `aria-describedby`, e foco no primeiro campo inválido.
- No envio: monta a mensagem e abre `https://wa.me/554388696363?text=...` em nova aba com `rel="noopener noreferrer"`, criando o link dentro do clique do usuário (evita bloqueio de pop-up e `ERR_BLOCKED_BY_RESPONSE`).
- Depois do envio o formulário é trocado por uma tela de sucesso com um **botão de backup** "Abrir o WhatsApp" que recebe o mesmo link, para quando o navegador bloquear a abertura.
- A mensagem enviada segue o modelo:

```
Olá, equipe Unect Jr.! Quero solicitar o *Diagnóstico Operacional Gratuito*.

*Nome:* …
*Empresa:* …
*Maior desafio:* …
*Segmento:* … (se informado)
*Equipe:* … pessoas (se informado)
*WhatsApp:* …

_Origem: utm_source=… | utm_campaign=… (ou "acesso direto")_
```

### RF-04 Rastreamento

- Capturar `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `gclid` e `fbclid` da URL em campos ocultos (máx. 200 caracteres cada) e incluir na mensagem.
- Disparar no envio válido, apenas se as bibliotecas existirem na página:
  - `gtag('event', 'generate_lead', { segmento, equipe })`
  - `gtag('event', 'conversion', { send_to: 'AW-XXXXXXXXX/XXXXXXXXXXXX' })` (preencher o ID real antes de publicar)
  - `fbq('track', 'Lead', { content_name: 'Diagnostico Gratuito' })`
- Cliques em WhatsApp direto disparam `gtag('event', 'contact', { method: 'whatsapp' })`.
- Nenhum erro de script pode acontecer quando os pixels não estão instalados.

### RF-05 WhatsApp direto

- Desktop: botão flutuante redondo no canto inferior direito, 56px, cor do WhatsApp.
- Celular: o botão do WhatsApp fica dentro da barra fixa inferior, ao lado do CTA, para não haver dois elementos flutuantes disputando o polegar.
- Animação de pulso no máximo 3 ciclos ao carregar; pulso infinito não é permitido (distrai da leitura e falha em `prefers-reduced-motion`).

### RF-06 Navegação

- Desktop: âncoras Comparativo, Módulos, Como funciona, Cases, Dúvidas + CTA.
- Celular: header mostra só logo e CTA curto. Sem menu hambúrguer: a página é curta e linear, e o menu escondido não converte.
- O header ganha fundo sólido e sombra leve após 8px de rolagem.

### RF-07 Cases

- 6 cards: AETA, P3 Agro, Ficha Trans-Operatória, Clínica Ética, Antônio Lima Advogados, Cacto Comunicação EJ.
- Cada card mostra tipo do projeto, nome, uma frase de resultado e, quando houver página, o link "Ver case". Hoje só existe `cases/aeta.html`.
- Card sem página própria não tem link (nada de `href="#"`).

### RF-08 Perguntas frequentes

- Usar `<details>/<summary>` nativo (funciona sem JS e é acessível).
- Respostas devem usar apenas informações já confirmadas (ver `CONTEUDO.md`). Preço exato não é publicado.

---

## 3. Regras de conteúdo e ética de conversão

- **Sem escassez falsa.** O aviso "Apenas 4 diagnósticos esta semana" da LP antiga só volta se houver um controle real de agenda. Contador fixo no código é proibido.
- **Pop-up de saída (RF-09).** Abre uma única vez por sessão, só em dispositivos com mouse, quando o cursor sai pelo topo da janela (depois de 8 s na página). Não abre se o lead já foi enviado ou se o formulário principal está na tela. Reaproveita o mesmo formulário (4 campos obrigatórios), com fechar por X, Esc, clique no fundo e "Agora não". Não aparece no celular.
- Números e depoimentos são sempre reais e atribuídos (nome + projeto). Métricas do dashboard ilustrativo do hero são marcadas como exemplo no `aria-label`.
- Tom: direto, em segunda pessoa ("sua empresa"), frases curtas, sem jargão técnico (falar "relatório" antes de "BI", "sistema" antes de "ERP").
- Localização: citar Cornélio Procópio e Norte do Paraná no hero (SEO local), sem repetir em todo parágrafo. A Unect Jr. é de Cornélio Procópio: não citar Londrina como sede ou foco.
- Ortografia pt-BR revisada; moeda `R$ 148 mil`, datas `nov/2026`, decimais com vírgula.

---

## 4. Requisitos não funcionais

### RNF-01 Performance (Core Web Vitals, celular 4G)

| Métrica | Meta |
|---|---|
| LCP | ≤ 2,0 s |
| CLS | ≤ 0,05 |
| INP | ≤ 150 ms |
| Peso total da página (primeira carga) | ≤ 400 KB |
| JS próprio | ≤ 10 KB minificado, sem framework |

- Imagens em WebP com `width`/`height` declarados; `loading="lazy"` abaixo da dobra; nenhuma imagem em base64 dentro do HTML (a LP antiga tinha 240 KB por causa disso).
- Fontes do Google com `display=swap` e `preconnect`; no máximo 2 famílias e 5 pesos.
- CSS e JS em arquivos próprios (`css/styles.css`, `js/main.js`). Nada de folhas "de correção" empilhadas no fim (`guia-de-estilo.css`, `mobile-refinamento.css` da versão antiga foram absorvidas no design system).

### RNF-02 Acessibilidade (WCAG 2.2 AA)

- Contraste mínimo 4,5:1 em texto e 3:1 em ícones e bordas de campo.
- Link "Pular para o conteúdo" como primeiro elemento focável.
- Foco visível em todo elemento interativo (anel de 3px na cor de foco).
- Alvos de toque ≥ 48×48px no celular.
- Um único `<h1>`; seções com `aria-labelledby` apontando para o `<h2>`.
- Respeitar `prefers-reduced-motion`: sem animação de entrada nem pulso.
- Formulário: todo campo com `<label>` visível, `autocomplete` correto, erros anunciados com `aria-live="polite"`.
- A página abre sempre no tema **claro** e tem um botão no header para trocar para o escuro. A escolha fica salva no navegador; o tema do sistema não é usado como padrão.

### RNF-03 Responsividade

- Mobile-first. Pontos de quebra: 640px, 960px, 1200px.
- Nenhuma rolagem horizontal do `body` em 320px de largura.
- Comparativo: tabela em desktop; no celular vira três blocos empilhados (um por opção), sem abas escondidas.
- Gutter lateral `max(16px, env(safe-area-inset-left))`.

### RNF-04 SEO

- `<title>`: "Gestão Sob Medida em Cornélio Procópio | Unect Jr." (≤ 60 caracteres).
- `meta description` ≤ 155 caracteres com "planilhas", "sistema de gestão" e "diagnóstico grátis".
- `canonical`: `https://unect.com.br/sistemas-sob-medida`.
- Open Graph e Twitter Card com `og-image-unect.jpg` (1200×630).
- JSON-LD: `Organization` + `LocalBusiness` (endereço de Cornélio Procópio, área atendida Cornélio Procópio e Norte do PR), `Service` e `FAQPage` espelhando o FAQ visível.
- HTML semântico: `header`, `main`, `section`, `footer`, `address`.

### RNF-05 Privacidade (LGPD)

- Os dados do formulário não são gravados em servidor pela LP; vão apenas na mensagem do WhatsApp que o próprio usuário envia. Informar isso abaixo do botão.
- Se pixels de anúncio forem ativados, incluir aviso de cookies antes de publicar.

### RNF-06 Compatibilidade

- Últimas 2 versões de Chrome, Safari (iOS e macOS), Edge, Firefox e Samsung Internet.
- Sem dependência de build: HTML, CSS e JS puros, publicáveis em qualquer hospedagem estática.

---

## 5. Estrutura de arquivos

```
lp-nova/
├── index.html
├── css/styles.css        # tokens + componentes + seções
├── js/main.js            # header, formulário, WhatsApp, tracking
├── assets/
│   ├── favicon.svg
│   ├── og-image-unect.jpg
│   ├── clientes/*.webp
│   └── depoimentos/*.webp
├── cases/aeta.html
└── docs/
    ├── REQUISITOS.md     # este arquivo
    ├── UI.md
    └── CONTEUDO.md
```

---

## 6. Critérios de aceite (checklist de publicação)

- [ ] Ordem de seções igual ao RF-01
- [ ] Todos os CTAs principais levam a `#diagnostico`
- [ ] Formulário com 4 obrigatórios e 2 opcionais, validação e máscara funcionando
- [ ] Envio abre o WhatsApp com a mensagem completa e UTMs; botão de backup aparece
- [ ] Sem erros no console com e sem pixels instalados
- [ ] ID real de conversão do Google Ads preenchido (ou chamada removida)
- [ ] Lighthouse celular: Performance ≥ 90, Acessibilidade ≥ 95, Boas práticas ≥ 95, SEO 100
- [ ] Sem rolagem horizontal em 320px, 375px, 768px e 1440px
- [ ] Navegação completa só com teclado, com foco visível
- [ ] Testado com `prefers-reduced-motion` e tema escuro
- [ ] JSON-LD validado no Rich Results Test
- [ ] Nenhum texto de escassez ou número não comprovado

---

## 7. Fora do escopo desta versão

- Páginas de case além da AETA (cards já preparados para receber o link).
- Agenda real de horários de diagnóstico (pré-requisito para qualquer aviso de vagas).
- Testes A/B. Primeiro candidato sugerido: título do hero com foco em dor ("Pare de gerir em planilhas") x foco em ganho ("Tenha o DRE pronto todo mês").
