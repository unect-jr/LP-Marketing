# LP Sistemas Sob Medida · Unect Jr.

Landing page de conversão (Diagnóstico Operacional Gratuito via WhatsApp) da Unect Jr., Empresa Júnior da UTFPR Câmpus Cornélio Procópio.

**Stack:** React 19 + TypeScript, Vite, Tailwind CSS v4, Motion, Lenis, Phosphor Icons.

## Comandos

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run lint` | Lint (oxlint) |
| `npm test` | Testes (vitest) |
| `npm run build` | Checagem de tipos, build e **pré-renderização** do HTML (`scripts/prerender.mjs`) |
| `npm run preview` | Serve a pasta `dist` |

## Estrutura

- `src/lib/content.ts`: todo o texto e os dados da página (cases, FAQ, módulos...).
- `src/lib/lead.ts`: máscara, validação, UTMs, mensagem e rastreamento do formulário.
- `src/components/sections/`: uma seção por arquivo. `ui.tsx` tem os blocos reutilizáveis.
- `public/cases/<projeto>/<tela>.webp`: telas exibidas no modal de cada case (originais em `.claude/assets/cases/`).

## Como adicionar telas a um case

Coloque as imagens em `public/cases/<projeto>/` (ex.: `login.webp`) e use `shots('<projeto>', ['login', ...])` no item de `CASES`. Sem `images`, o card não mostra "Ver case" (hoje: P3 Agro).

## SEO

O HTML final já vem com todo o conteúdo (pré-renderizado), `robots.txt`, `sitemap.xml`, JSON-LD e metas sociais. O domínio atual (`https://lp-marketing-sigma.vercel.app`) aparece em `index.html` (canonical, og:*), `public/sitemap.xml`, `public/robots.txt` e no logo do JSON-LD em `src/App.tsx`. Ao trocar para um domínio próprio, atualize esses quatro lugares.

## Pendências antes de ir ao ar

- ID de conversão do Google Ads em `src/lib/lead.ts` (`TODO`).
- Revisão jurídica de `public/privacidade.html`.
