# UI da LP: design system e especificação de componentes

Este documento define como a LP se parece e se comporta. Os valores aqui são a fonte da verdade: `css/styles.css` implementa exatamente estes tokens. Para regras de negócio e critérios de aceite, veja [`REQUISITOS.md`](./REQUISITOS.md).

---

## 1. Direção visual

**Conceito: "da planilha ao painel".** A LP antiga usava fundo em degradê azul com cartões de vidro em toda a página, o que deixava tudo com o mesmo peso e prejudicava o contraste. A nova versão é clara e editorial: fundo papel levemente azulado, tinta escura, azul da marca para informação e amarelo reservado só para o CTA. O único momento "visual" forte é o hero, que mostra uma célula de planilha quebrada (`#REF!`) virando um painel limpo. Esse contraste é a tese do produto.

Princípios:

1. **Amarelo = ação.** O amarelo `--cta` aparece só em botões de conversão. Nenhum ícone, título ou destaque decorativo usa amarelo.
2. **Um cartão destacado por seção.** Borda e sombra marcam o que importa (a coluna "Sob medida", o formulário). O resto fica em superfícies planas.
3. **Hierarquia por tipografia,** não por caixas coloridas.
4. **Movimento discreto:** entrada suave das seções e hover nos botões. Nada em loop.

---

## 2. Tokens

### 2.1 Cores

| Token | Claro | Escuro | Uso |
|---|---|---|---|
| `--bg` | `#f6f7fb` | `#0c0f1d` | Fundo da página |
| `--surface` | `#ffffff` | `#141930` | Cartões, header, formulário |
| `--surface-2` | `#edf0f9` | `#1b2140` | Faixas alternadas, campos |
| `--ink` | `#12162b` | `#eef1fb` | Texto principal e títulos |
| `--ink-2` | `#4b5272` | `#a8b0cf` | Texto secundário |
| `--line` | `#dce1ef` | `#2a3157` | Bordas e divisórias |
| `--brand` | `#2962ff` | `#6b8fff` | Azul da marca: ícones, destaques, links |
| `--brand-soft` | `#e6ecff` | `#1c2654` | Fundo de selos e realces |
| `--cta` | `#ffb800` | `#ffb800` | Botão principal |
| `--cta-hover` | `#ffa000` | `#ffc940` | Hover do botão principal |
| `--cta-ink` | `#181818` | `#181818` | Texto sobre o amarelo (contraste 10,6:1) |
| `--ok` | `#00875a` | `#3ccf91` | Check, variação positiva |
| `--bad` | `#c8331b` | `#ff7a63` | Erro de campo, `#REF!`, variação negativa |
| `--wa` | `#25d366` | `#25d366` | Somente botão do WhatsApp |
| `--focus` | `#8a3ffc` | `#b58bff` | Anel de foco (roxo da marca) |

O roxo `#8a3ffc` da marca antiga vira cor de foco: continua presente e ganha uma função.

### 2.2 Tipografia

| Papel | Família | Pesos |
|---|---|---|
| Display (títulos, números, botões) | **Sora** | 600, 700, 800 |
| Texto | **Source Sans 3** | 400, 600 |

Fallback: `'Segoe UI', system-ui, sans-serif`.

| Token | Tamanho | Linha | Uso |
|---|---|---|---|
| `--t-hero` | `clamp(2.1rem, 1.4rem + 3.2vw, 3.6rem)` | 1.08 | H1 |
| `--t-h2` | `clamp(1.7rem, 1.3rem + 1.8vw, 2.6rem)` | 1.15 | Títulos de seção |
| `--t-h3` | `1.25rem` | 1.3 | Títulos de cartão |
| `--t-lead` | `clamp(1.08rem, 1rem + .4vw, 1.25rem)` | 1.55 | Subtítulo do hero e das seções |
| `--t-body` | `1.0625rem` (17px) | 1.6 | Parágrafos |
| `--t-small` | `0.9375rem` | 1.5 | Legendas, microcopy |
| `--t-eyebrow` | `0.8125rem`, caixa alta, `letter-spacing: .08em` | 1.2 | Rótulo acima do H2 |

- Títulos com `letter-spacing: -0.02em` e `text-wrap: balance`.
- Largura de leitura: `max-width: 62ch` em parágrafos.
- Números de dashboard e tabelas: `font-variant-numeric: tabular-nums`.

### 2.3 Espaço, raio e sombra

| Token | Valor |
|---|---|
| Escala de espaço | `4, 8, 12, 16, 24, 32, 48, 64, 96` px (`--s-1` a `--s-9`) |
| `--section-y` | `clamp(64px, 9vw, 112px)` |
| `--radius-sm` | `8px` (campos, selos) |
| `--radius` | `14px` (cartões) |
| `--radius-lg` | `22px` (painel do hero, formulário) |
| `--shadow-1` | `0 1px 2px rgb(18 22 43 / .06), 0 4px 16px rgb(18 22 43 / .06)` |
| `--shadow-2` | `0 2px 6px rgb(18 22 43 / .08), 0 18px 48px rgb(41 98 255 / .14)` |

### 2.4 Grid

- Container `--container: 1160px`, centralizado.
- Gutter `padding-inline: max(16px, env(safe-area-inset-left/right))`; em ≥ 960px, 32px.
- Grids com `gap`, nunca margens entre irmãos.
- Breakpoints: `640px` (2 colunas), `960px` (layout desktop), `1200px` (respiro extra).

---

## 3. Componentes

### Botão principal `.btn.btn--cta`
- Fundo `--cta`, texto `--cta-ink`, Sora 700, 1rem, `padding: 16px 28px`, `min-height: 52px`, raio `--radius-sm`.
- Seta `→` à direita que desliza 3px no hover.
- Hover: `--cta-hover` e `translateY(-1px)`. Ativo: sem translate.
- Foco: `outline: 3px solid var(--focus); outline-offset: 3px`.
- Celular (< 640px): largura total.

### Botão secundário `.btn.btn--ghost`
- Transparente, borda 1.5px `--line`, texto `--ink`. Hover: borda `--brand`.

### Botão WhatsApp `.btn--wa` e `.wa-float`
- Fundo `--wa`, ícone branco. Flutuante: 56px, `bottom/right: 24px + safe-area`, pulso de 3 ciclos só na carga.

### Selo `.chip`
- Fundo `--brand-soft`, texto `--brand`, Sora 600 0.8125rem, raio 999px, `padding: 6px 12px`.

### Eyebrow `.eyebrow`
- Texto `--brand`, caixa alta, `--t-eyebrow`. Sempre acima de um H2.

### Cabeçalho de seção `.section-head`
- Eyebrow + H2 + lead. Alinhado à esquerda (não centralizado), `max-width: 720px`, `gap: 16px`.

### Cartão `.card`
- Fundo `--surface`, borda 1px `--line`, raio `--radius`, `padding: 28px` (24px no celular). Sem sombra por padrão.
- `.card--featured`: borda 2px `--brand` + `--shadow-2`. Só um por seção.

### Cartão de módulo
- Ícone 40px (traço `--brand`, fundo `--brand-soft`), H3, descrição, lista "inclui" com 3 itens (check `--ok`), e linha final de resultado em Sora 600 `--ink`, separada por divisória.

### Comparativo
- Desktop: `<table>` com 3 colunas de opção. Coluna "Sob medida" é `.is-featured` (fundo `--surface`, borda `--brand`, selo "Recomendado").
- Ícones de status: `✓` `--ok`, `~` `--ink-2`, `✕` `--bad`, sempre com texto ao lado (cor nunca é a única pista).
- Celular: cada opção vira um cartão com os 6 critérios listados. O cartão "Sob medida" vem **primeiro**.

### Passos (Como funciona)
- 4 itens numerados (a numeração é real: é uma sequência). Número em Sora 800 `--brand`, prazo em `.chip`, título H3, descrição.
- Desktop: 4 colunas ligadas por uma linha fina `--line`. Celular: lista vertical com a linha à esquerda.

### Cartão de case
- Selo de tipo, nome em H3, uma frase. Link "Ver case →" só quando a página existir.

### Depoimento
- `<figure>` com `<blockquote>` em `--t-lead`, aspas desenhadas em `--brand`, `<figcaption>` com avatar 48px (logo ou iniciais), nome e projeto.

### FAQ
- `<details>` com borda inferior `--line`; `<summary>` em Sora 600 com ícone `+` que gira 45° quando aberto.

### Formulário `.lead-form`
- Cartão `--surface`, raio `--radius-lg`, `--shadow-2`, `padding: 32px` (20px no celular).
- Campo: label acima (Source Sans 600, `--ink`), input 52px de altura, fundo `--surface-2`, borda 1.5px `--line`, raio `--radius-sm`, 16px de fonte (evita zoom no iOS).
- Foco do campo: borda `--brand` + anel `0 0 0 3px var(--brand-soft)`.
- Erro: borda `--bad`, mensagem `--t-small` `--bad` abaixo, ícone `!`.
- Opcional marcado com "(opcional)" em `--ink-2` no label. Obrigatórios não levam asterisco: a maioria é obrigatória, então só se marca a exceção.
- Grid de 2 colunas em ≥ 640px; Nome e Maior desafio ocupam a linha inteira.
- Estado de sucesso: ícone de check em círculo `--ok`, título, texto e botão de backup do WhatsApp.

### Header
- Altura 68px, `position: sticky; top: env(safe-area-inset-top)`. Transparente sobre `--bg`; com rolagem > 8px ganha `--surface` com 92% de opacidade, `backdrop-filter: blur(10px)` e borda inferior `--line`.

### Barra fixa do celular `.mobile-bar`
- Só < 960px. Fundo `--surface`, borda superior `--line`, `padding-bottom: 12px + safe-area`. Contém CTA (flex 1) + botão WhatsApp quadrado 52px. Some quando a seção `#diagnostico` está visível (o formulário já está na tela).

### Rodapé
- Fundo `--ink` no tema claro (inverte), texto `--bg`. 4 colunas em desktop (marca, navegação, contato, endereço), 1 coluna no celular, alinhado à esquerda.

---

## 4. Especificação das seções

| # | Seção | Layout desktop | Layout celular | CTA |
|---|---|---|---|---|
| 1 | Header | logo · âncoras · CTA curto | logo · CTA curto | sim |
| 2 | Hero | 2 colunas 1.1fr / .9fr: texto à esquerda, painel "planilha → dashboard" à direita | texto, depois painel | sim + microgarantias |
| 3 | Logos | 6 logos em linha, cinza com 70% de opacidade, cor no hover | grade 3×2 | não |
| 4 | Comparativo | tabela | 3 cartões, sob medida primeiro | sim |
| 5 | Módulos | grade 3×2 | 1 coluna | não |
| 6 | Como funciona | 4 colunas | lista vertical | sim + nota "100% gratuito" |
| 7 | Cases | grade 3×2 | 1 coluna | não |
| 8 | Depoimentos | 3 colunas | 1 coluna | não |
| 9 | FAQ | 2 colunas: título à esquerda (sticky), perguntas à direita | 1 coluna | não |
| 10 | Diagnóstico | 2 colunas: o que você recebe / formulário | formulário primeiro, entregáveis depois | formulário |
| 11 | Rodapé | 4 colunas | 1 coluna | não |

Fundo alternado: seções 4, 6 e 9 usam `--surface-2` para separar blocos sem linhas extras.

### Painel do hero (detalhe)
- Topo: um "recorte" de planilha com 3 linhas (`Metalúrgica S. · #REF!`, `Dist. Norte · #N/D`, `TOTAL · #######`) em tabular-nums, células com erro em `--bad`, levemente inclinado (-2°) e com opacidade 0.9.
- Embaixo, sobreposto, o cartão "Painel de Gestão · Outubro" com 3 KPIs (Faturamento R$ 148 mil ▲ 12,4%, OS em aberto 23, Margem 31,2%) e um gráfico de barras de 7 meses (Abr a Out) desenhado em CSS com alturas proporcionais.
- `role="img"` com `aria-label` descrevendo que é um exemplo ilustrativo.

---

## 5. Movimento

| Elemento | Efeito | Duração |
|---|---|---|
| Seções | `opacity .6 → 1` e `translateY(16px → 0)` ao entrar na tela | 500ms ease-out |
| Barras do gráfico do hero | crescem de 0 à altura final na carga | 700ms, atraso escalonado de 60ms |
| Botões | hover com translate de 1px | 150ms |
| WhatsApp flutuante | pulso 3× na carga | 2s cada |

- O estado inicial das seções nunca é `opacity: 0`: sem JS ou com movimento reduzido, tudo aparece normalmente.
- `@media (prefers-reduced-motion: reduce)`: todas as animações e transições são desligadas.

---

## 6. Ícones

- Traço de 1.75px, 24×24, `stroke="currentColor"`, cantos arredondados. Desenhados inline em SVG.
- Emojis não são usados como ícone (a LP antiga usava ⚡ 💡 ⏱ 💻 🎯): renderizam diferente em cada sistema e não herdam a cor.

---

## 7. Acessibilidade aplicada à UI

- Todos os pares de cor de texto acima passam AA nos dois temas (texto principal ≥ 12:1, secundário ≥ 5,5:1).
- Status nunca só por cor: ícones do comparativo têm texto, erros têm mensagem.
- Alvos de toque ≥ 48px; espaço de 8px entre alvos vizinhos.
- Ordem de foco segue a ordem visual; no celular o formulário vem antes dos entregáveis tanto visualmente quanto no DOM.
