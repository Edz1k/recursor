import type { ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void

export interface ProjectLeadForm {
  name: string
  phone: string
}

export type ProjectLeadSource = 'navbar-discuss-project' | 'pricing-card' | 'contact-form'

export interface ProjectLeadPayload extends ProjectLeadForm {
  source: ProjectLeadSource
  projectType?: string
  estimatedPrice?: string
  message?: string
  budget?: string
  submittedAt: string
}
