import type { UserModule } from '~/types'
import { ADS_CONVERSIONS, fireAdsConversion } from '~/utils/adsConversion'

/**
 * Counts a Google Ads "phone call" conversion whenever a user clicks any
 * `tel:` link on the site (header call button, contacts section, footer).
 * A single delegated listener covers every phone link, present or future.
 */
export const install: UserModule = ({ isClient }) => {
  if (!isClient)
    return

  document.addEventListener(
    'click',
    (event) => {
      const target = event.target as Element | null
      if (target?.closest('a[href^="tel:"]'))
        fireAdsConversion(ADS_CONVERSIONS.phoneCall)
    },
    { capture: true },
  )
}
