import type { ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void

export interface ProjectLeadForm {
  name: string
  phone: string
}

export interface ProjectLeadPayload extends ProjectLeadForm {
  source: 'navbar-discuss-project'
  submittedAt: string
}
