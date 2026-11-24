import { useSyncExternalStore } from 'react'
import { scrollToId } from './scroll'

let selected = ''
const listeners = new Set<() => void>()

export const getSelectedOffer = () => selected

export function selectOffer(id: string) {
  if (id === selected) return
  selected = id
  listeners.forEach((l) => l())
}

const subscribe = (cb: () => void) => {
  listeners.add(cb)
  return () => {
    listeners.delete(cb)
  }
}

export function useSelectedOffer(): string {
  return useSyncExternalStore(subscribe, getSelectedOffer, () => '')
}

export function chooseOffer(id: string) {
  selectOffer(id)
  scrollToId('diagnostico')
}
