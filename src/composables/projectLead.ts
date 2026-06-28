export interface ProjectLeadForm {
  name: string
  phone: string
}

export interface ProjectLeadPayload extends ProjectLeadForm {
  source: 'navbar-discuss-project'
  submittedAt: string
}

export function useProjectLead() {
  const form = reactive<ProjectLeadForm>({
    name: '',
    phone: '',
  })

  const isSubmitting = ref(false)
  const isSubmitted = ref(false)
  const errorMessage = ref('')
  const lastPayload = ref<ProjectLeadPayload | null>(null)

  const canSubmit = computed(() => {
    return form.name.trim().length > 1 && form.phone.replace(/\D/g, '').length === 11
  })

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
        name: form.name.trim(),
        phone: form.phone,
        source: 'navbar-discuss-project',
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
