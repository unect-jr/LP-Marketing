import { Moon, Sun } from '@phosphor-icons/react'
import { useSyncExternalStore } from 'react'

const THEME_KEY = 'lp_theme'

function applyTheme(dark: boolean) {
  const root = document.documentElement
  root.classList.toggle('dark', dark)
  root.dataset.theme = dark ? 'dark' : 'light'
  const meta = document.querySelector('meta[name="theme-color"]')
  meta?.setAttribute('content', dark ? '#080a16' : '#fafafc')
}

const subscribe = (cb: () => void) => {
  const mo = new MutationObserver(cb)
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  return () => mo.disconnect()
}
const isDark = () => document.documentElement.classList.contains('dark')

export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, isDark, () => false)

  const toggle = () => {
    const next = !dark
    applyTheme(next)
    try {
      localStorage.setItem(THEME_KEY, next ? 'dark' : 'light')
    } catch {
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Mudar para o tema claro' : 'Mudar para o tema escuro'}
      className="grid size-12 shrink-0 place-items-center rounded-full border border-line bg-surface text-ink transition hover:border-brand hover:text-brand active:scale-95"
    >
      {dark ? <Sun size={20} weight="bold" aria-hidden /> : <Moon size={20} weight="bold" aria-hidden />}
    </button>
  )
}
