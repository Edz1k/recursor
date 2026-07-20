type Gtag = (command: string, action: string, params?: Record<string, unknown>) => void

/**
 * Fires a Google Ads conversion via the global Google tag (AW-18338223921).
 * Client-side only; safely no-ops if the tag hasn't loaded yet.
 */
export function fireAdsConversion(sendTo: string, value = 1, currency = 'USD'): void {
  if (typeof window === 'undefined')
    return

  const gtag = (window as unknown as { gtag?: Gtag }).gtag
  gtag?.('event', 'conversion', {
    send_to: sendTo,
    value,
    currency,
  })
}

/** Google Ads conversion labels for the Recursor account (AW-18338223921). */
export const ADS_CONVERSIONS = {
  /** Successful project-lead form submission. */
  leadForm: 'AW-18338223921/9rLFCNGb5dMcELGurKhE',
  /** Click on a phone number (tel: link) anywhere on the site. */
  phoneCall: 'AW-18338223921/AO3ICLiMz9McELGurKhE',
} as const
