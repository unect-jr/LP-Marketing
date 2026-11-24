import { useSyncExternalStore } from 'react'
import { UBLACK_ENDS_AT } from './content'

export interface Remaining {
  days: number
  hours: number
  minutes: number
  seconds: number
  done: boolean
}

export function computeRemaining(end: number, now: number): Remaining {
  const total = Math.floor(Math.max(0, end - now) / 1000)
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
    done: total === 0,
  }
}

const end = new Date(UBLACK_ENDS_AT).getTime()
const listeners = new Set<() => void>()
let snapshot: Remaining | null = null
let timer: ReturnType<typeof setInterval> | undefined

function tick() {
  snapshot = computeRemaining(end, Date.now())
  listeners.forEach((l) => l())
}

function subscribe(cb: () => void) {
  listeners.add(cb)
  if (listeners.size === 1) {
    tick()
    timer = setInterval(tick, 1000)
  }
  return () => {
    listeners.delete(cb)
    if (listeners.size === 0) clearInterval(timer)
  }
}

export function useCountdown(): Remaining | null {
  return useSyncExternalStore(subscribe, () => snapshot, () => null)
}
