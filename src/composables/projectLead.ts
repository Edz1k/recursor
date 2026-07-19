import type { ProjectLeadForm, ProjectLeadPayload } from '~/types'

type ProjectLeadContext = Pick<ProjectLeadPayload, 'source' | 'projectType' | 'estimatedPrice'>

const defaultContext = () => ({ source: 'navbar-discuss-project' } as const)

export function useProjectLead(getContext: () => ProjectLeadContext = defaultContext) {
  const form = reactive<ProjectLeadForm>({
    name: '',
    phone: '',
  })

  const isSubmitting = shallowRef(false)
  const isSubmitted = shallowRef(false)
  const errorMessage = shallowRef('')
  const lastPayload = shallowRef<ProjectLeadPayload | null>(null)

  const canSubmit = computed(() =>
    form.name.trim().length > 1 && form.phone.replace(/\D/g, '').length === 11,
  )

  function resetForm() {
    form.name = ''
    form.phone = ''
    errorMessage.value = ''
    isSubmitted.value = false
    lastPayload.value = null
  }

  async function submitLead() {
    errorMessage.value = ''
    isSubmitted.value = false

    if (!canSubmit.value) {
      errorMessage.value = 'Заполните имя и номер телефона полностью.'
      return null
    }

    isSubmitting.value = true

    try {
      const payload: ProjectLeadPayload = {
        ...getContext(),
        name: form.name.trim(),
        phone: form.phone,
        submittedAt: new Date().toISOString(),
      }

      // Future Telegram bot integration should send this payload to the backend endpoint.
      lastPayload.value = payload
      isSubmitted.value = true

      return payload
    }
    finally {
      isSubmitting.value = false
    }
  }

  return {
    canSubmit,
    errorMessage,
    form,
    isSubmitted,
    isSubmitting,
    lastPayload,
    resetForm,
    submitLead,
  }
}
