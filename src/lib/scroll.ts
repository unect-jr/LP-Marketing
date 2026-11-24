interface Scroller {
  scrollTo: (target: HTMLElement, opts?: { duration?: number }) => void
}

let scroller: Scroller | null = null

export function registerScroller(s: Scroller | null) {
  scroller = s
}

export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (scroller) scroller.scrollTo(el, { duration: 1.6 })
  else el.scrollIntoView({ block: 'start' })
}
