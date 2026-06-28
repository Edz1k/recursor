import type { UserModule } from '~/types'
import { vMaska } from 'maska/vue'

export const install: UserModule = ({ app }) => {
  app.directive('maska', vMaska)
}
