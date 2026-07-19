<script setup lang="ts">
import type { ProjectLeadPayload } from '~/types'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
} from 'reka-ui'
import { useProjectLead } from '~/composables/projectLead'

interface Props {
  source?: ProjectLeadPayload['source']
  projectType?: string
  estimatedPrice?: string
}

const props = withDefaults(defineProps<Props>(), {
  source: 'navbar-discuss-project',
})

const open = defineModel<boolean>('open', { default: false })

const {
  canSubmit,
  errorMessage,
  form,
  isSubmitted,
  isSubmitting,
  lastPayload,
  resetForm,
  submitLead,
} = useProjectLead(() => ({
  source: props.source,
  projectType: props.projectType,
  estimatedPrice: props.estimatedPrice,
}))

watch(open, (value) => {
  if (value)
    resetForm()
})

async function handleSubmit() {
  const payload = await submitLead()

  if (payload) {
    window.setTimeout(() => {
      open.value = false
    }, 900)
  }
}
</script>

<template>
  <DialogRoot v-model:open="open">
    <DialogPortal>
      <DialogOverlay class="project-dialog-overlay" />
      <DialogContent
        class="project-dialog-content max-w-md w-[calc(100%-2rem)] border border-border rounded-lg bg-surface p-6 text-foreground shadow-2xl shadow-black/20 outline-none"
      >
        <div class="pr-10 space-y-2">
          <DialogTitle class="text-2xl text-main font-800">
            Обсудить проект
          </DialogTitle>
          <DialogDescription class="text-sm text-muted-foreground leading-6">
            Оставьте имя и номер телефона, чтобы команда могла связаться с вами и уточнить детали проекта.
          </DialogDescription>
        </div>

        <div v-if="props.projectType" class="mt-5 border border-border rounded-lg bg-muted-surface px-4 py-3">
          <span class="block text-xs text-muted font-800 tracking-wide uppercase">Выбранный формат</span>
          <strong class="mt-1 block text-sm text-foreground font-800">{{ props.projectType }}</strong>
          <span v-if="props.estimatedPrice" class="mt-1 block text-sm text-muted-foreground">{{ props.estimatedPrice }}</span>
        </div>

        <form class="mt-6 space-y-4" @submit.prevent="handleSubmit">
          <label class="block space-y-2">
            <span class="text-sm text-foreground font-700">Имя</span>
            <input
              v-model="form.name"
              type="text"
              autocomplete="name"
              class="h-11 w-full border border-border rounded-lg bg-background px-3 text-sm text-foreground outline-none transition duration-200 focus:border-main placeholder:text-muted focus:ring-2 focus:ring-ring/15"
              placeholder="Например, Эдуард"
            >
          </label>

          <label class="block space-y-2">
            <span class="text-sm text-foreground font-700">Телефон</span>
            <input
              v-model="form.phone"
              v-maska="'+7 (###) ###-##-##'"
              type="tel"
              inputmode="tel"
              autocomplete="tel"
              class="h-11 w-full border border-border rounded-lg bg-background px-3 text-sm text-foreground outline-none transition duration-200 focus:border-main placeholder:text-muted focus:ring-2 focus:ring-ring/15"
              placeholder="+7 (___) ___-__-__"
            >
          </label>

          <p v-if="errorMessage" class="text-sm text-foreground">
            {{ errorMessage }}
          </p>

          <p v-if="isSubmitted && lastPayload" class="border border-border rounded-lg bg-muted-surface px-3 py-2 text-sm text-muted-foreground">
            Заявка отправлена: {{ lastPayload.name }}, {{ lastPayload.phone }}{{ lastPayload.projectType ? `, ${lastPayload.projectType}` : '' }}. Мы скоро свяжемся с вами.
          </p>

          <div class="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <DialogClose
              class="h-11 border border-border rounded-lg bg-background px-4 text-sm text-foreground font-700 outline-none transition duration-200 hover:bg-muted-surface focus-visible:ring-2 focus-visible:ring-ring"
              type="button"
            >
              Отмена
            </DialogClose>
            <button
              type="submit"
              class="h-11 rounded-lg bg-main px-5 text-sm text-main-foreground font-700 shadow-black/10 shadow-lg outline-none transition duration-200 disabled:cursor-not-allowed hover:bg-secondary hover:text-secondary-foreground disabled:opacity-45 focus-visible:ring-2 focus-visible:ring-ring"
              :disabled="!canSubmit || isSubmitting"
            >
              {{ isSubmitting ? 'Отправляем...' : 'Отправить' }}
            </button>
          </div>
        </form>

        <DialogClose
          class="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-lg text-muted outline-none transition duration-200 hover:bg-muted-surface hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Закрыть"
        >
          <span class="i-carbon-close text-lg" aria-hidden="true" />
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style scoped>
.project-dialog-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgb(0 0 0 / 55%);
  backdrop-filter: blur(6px);
  animation-duration: 120ms;
  animation-timing-function: ease-out;
}

.project-dialog-overlay[data-state='open'] {
  animation-name: dialog-overlay-in;
}

.project-dialog-overlay[data-state='closed'] {
  animation-name: dialog-overlay-out;
}

.project-dialog-content {
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 51;
  transform: translate(-50%, -50%);
  animation-duration: 150ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
}

.project-dialog-content[data-state='open'] {
  animation-name: dialog-content-in;
}

.project-dialog-content[data-state='closed'] {
  animation-name: dialog-content-out;
}

@keyframes dialog-overlay-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes dialog-overlay-out {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

@keyframes dialog-content-in {
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.98);
  }

  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

@keyframes dialog-content-out {
  from {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }

  to {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.98);
  }
}

@media (prefers-reduced-motion: reduce) {
  .project-dialog-overlay,
  .project-dialog-content {
    animation: none;
  }
}
</style>
