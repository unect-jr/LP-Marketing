import { CTA_LABEL, CTA_LABEL_DEFAULT } from './content'
import { useCountdown } from './countdown'

export function useUBlackLive(): boolean {
  return !useCountdown()?.done
}

export function useCtaLabel(): string {
  return useUBlackLive() ? CTA_LABEL : CTA_LABEL_DEFAULT
}
