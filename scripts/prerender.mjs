import { readFile, rm, writeFile } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import { build } from 'vite'

await build({ logLevel: 'warn', build: { ssr: 'src/entry-server.tsx', outDir: 'dist-ssr', emptyOutDir: true } })

const { render } = await import(pathToFileURL(new URL('../dist-ssr/entry-server.js', import.meta.url).pathname.replace(/^\/(\w:)/, '$1')).href)
const htmlPath = new URL('../dist/index.html', import.meta.url).pathname.replace(/^\/(\w:)/, '$1')
const template = await readFile(htmlPath, 'utf8')
const marker = '<div id="root"></div>'
if (!template.includes(marker)) throw new Error('Marcador do #root não encontrado em dist/index.html')

await writeFile(htmlPath, template.replace(marker, `<div id="root">${render()}</div>`))
await rm(new URL('../dist-ssr', import.meta.url).pathname.replace(/^\/(\w:)/, '$1'), { recursive: true, force: true })
console.log('✓ HTML pré-renderizado em dist/index.html')
