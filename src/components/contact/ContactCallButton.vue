<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger,
} from 'reka-ui'
import { studioPhones } from '~/data/contact'

withDefaults(defineProps<{
  /** `header` renders a compact icon button; `menu` a full-width labelled row. */
  variant?: 'header' | 'menu'
}>(), { variant: 'header' })

const isMobile = useMediaQuery('(max-width: 620px)')
const isOpen = shallowRef(false)
const titleId = useId()
const route = useRoute()

// Close the picker on navigation so it never lingers between pages.
watch(() => route.fullPath, () => {
  isOpen.value = false
})
</script>

<template>
  <!-- Mobile: bottom sheet -->
  <DialogRoot v-if="isMobile" v-model:open="isOpen">
    <DialogTrigger as-child>
      <button
        type="button"
        class="call-trigger"
        :class="`call-trigger-${variant}`"
        aria-label="Позвонить"
      >
        <span class="i-carbon-phone call-icon" aria-hidden="true" />
        <template v-if="variant === 'menu'">
          <span class="call-label">Позвонить</span>
          <span class="i-carbon-chevron-right call-chevron" aria-hidden="true" />
        </template>
      </button>
    </DialogTrigger>

    <DialogPortal>
      <DialogOverlay class="call-overlay" />
      <DialogContent class="call-sheet">
        <div class="call-sheet-handle" aria-hidden="true" />
        <DialogTitle class="call-sheet-title">
          Выберите номер для звонка
        </DialogTitle>
        <DialogDescription class="call-sheet-description">
          Позвоним прямо сейчас — выберите удобный номер.
        </DialogDescription>

        <div class="call-options">
          <a
            v-for="phone in studioPhones"
            :key="phone.href"
            class="call-option"
            :href="phone.href"
          >
            <span class="i-carbon-phone call-option-icon" aria-hidden="true" />
            <span>{{ phone.label }}</span>
          </a>
        </div>

        <DialogClose class="call-close" type="button">
          Отмена
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>

  <!-- Desktop: popover -->
  <PopoverRoot v-else v-model:open="isOpen">
    <PopoverTrigger as-child>
      <button
        type="button"
        class="call-trigger"
        :class="`call-trigger-${variant}`"
        aria-label="Позвонить"
        title="Позвонить"
      >
        <span class="i-carbon-phone call-icon" aria-hidden="true" />
        <template v-if="variant === 'menu'">
          <span class="call-label">Позвонить</span>
          <span class="i-carbon-chevron-right call-chevron" aria-hidden="true" />
        </template>
      </button>
    </PopoverTrigger>

    <PopoverPortal>
      <PopoverContent
        class="call-popover"
        role="dialog"
        :aria-labelledby="titleId"
        side="bottom"
        :side-offset="12"
        align="end"
        :collision-padding="16"
      >
        <p :id="titleId" class="call-popover-title">
          Позвонить в Recursor
        </p>
        <div class="call-options">
          <a
            v-for="phone in studioPhones"
            :key="phone.href"
            class="call-option"
            :href="phone.href"
          >
            <span class="i-carbon-phone call-option-icon" aria-hidden="true" />
            <span>{{ phone.label }}</span>
          </a>
        </div>
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>

<style scoped>
.call-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border);
  background: var(--color-background);
  color: var(--color-foreground);
  cursor: pointer;
  outline: none;
  transition:
    border-color 260ms ease,
    background-color 260ms ease,
    color 260ms ease,
    transform 260ms cubic-bezier(0.16, 1, 0.3, 1);
}

.call-icon {
  font-size: 1.125rem;
}

/* Header: compact icon button matching the theme toggle. */
.call-trigger-header {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.625rem;
  box-shadow: 0 1px 2px rgb(0 0 0 / 6%);
}

.call-trigger-header:hover,
.call-trigger-header:focus-visible,
.call-trigger-header[data-state='open'] {
  background: var(--color-muted-surface);
  border-color: var(--color-foreground);
  transform: translateY(-1px);
}

.call-trigger-header:focus-visible {
  box-shadow: 0 0 0 2px var(--color-ring);
}

/* Mobile menu: full-width labelled row matching the nav rows. */
.call-trigger-menu {
  width: 100%;
  height: 3rem;
  gap: 0.625rem;
  justify-content: flex-start;
  border-color: transparent;
  border-radius: 0.5rem;
  padding: 0 1rem;
  background: var(--color-muted-surface);
  font-size: 0.875rem;
  font-weight: 700;
}

.call-trigger-menu .call-label {
  margin-right: auto;
}

.call-trigger-menu:hover,
.call-trigger-menu:focus-visible {
  background: var(--color-surface-elevated);
}

.call-chevron {
  font-size: 1rem;
  opacity: 0.7;
}

/* Shared option list */
.call-options {
  display: grid;
  gap: 0.5rem;
}

.call-option {
  display: flex;
  min-height: 3rem;
  align-items: center;
  gap: 0.65rem;
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  padding: 0 0.9rem;
  background: var(--color-muted-surface);
  color: var(--color-foreground);
  font-weight: 800;
  text-decoration: none;
  outline: none;
  transition:
    border-color 220ms ease,
    background-color 220ms ease,
    transform 220ms ease;
}

.call-option-icon {
  font-size: 1.05rem;
  color: var(--color-main);
}

.call-option:hover,
.call-option:focus-visible {
  border-color: var(--color-foreground);
  background: var(--color-surface-elevated);
  transform: translateY(-1px);
}

.call-option:focus-visible,
.call-close:focus-visible {
  box-shadow: 0 0 0 3px var(--color-ring);
}

/* Desktop popover */
.call-popover {
  z-index: 60;
  width: min(18rem, calc(100vw - 2rem));
  border: 1px solid color-mix(in srgb, var(--color-foreground) 14%, transparent);
  border-radius: 1rem;
  padding: 1rem;
  background: var(--color-surface-elevated);
  box-shadow:
    0 20px 60px rgb(0 0 0 / 26%),
    0 2px 8px rgb(0 0 0 / 12%);
  backdrop-filter: blur(14px);
  outline: none;
  transform-origin: var(--reka-popover-content-transform-origin);
  animation: call-pop-in 180ms cubic-bezier(0.16, 1, 0.3, 1);
}

.call-popover-title {
  margin: 0 0 0.75rem;
  font-size: 0.95rem;
  font-weight: 900;
}

/* Mobile sheet */
.call-overlay {
  position: fixed;
  inset: 0;
  z-index: 60;
  background: rgb(0 0 0 / 48%);
  backdrop-filter: blur(4px);
  animation: call-fade-in 180ms ease-out;
}

.call-sheet {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 61;
  width: 100%;
  border: 1px solid var(--color-border);
  border-bottom: 0;
  border-radius: 1.25rem 1.25rem 0 0;
  padding: 0.65rem 1rem max(1rem, env(safe-area-inset-bottom));
  background: var(--color-surface-elevated);
  outline: none;
  animation: call-sheet-in 240ms cubic-bezier(0.16, 1, 0.3, 1);
}

.call-sheet-handle {
  width: 2.5rem;
  height: 0.25rem;
  margin: 0 auto 1rem;
  border-radius: 999px;
  background: var(--color-border);
}

.call-sheet-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 900;
}

.call-sheet-description {
  margin: 0.35rem 0 1rem;
  color: var(--color-muted-foreground);
  font-size: 0.85rem;
  line-height: 1.45;
}

.call-close {
  width: 100%;
  min-height: 3rem;
  margin-top: 0.65rem;
  border: 1px solid var(--color-border);
  border-radius: 0.8rem;
  background: transparent;
  color: var(--color-muted-foreground);
  font: inherit;
  font-weight: 800;
  cursor: pointer;
  outline: none;
  transition:
    background-color 220ms ease,
    color 220ms ease;
}

.call-close:hover,
.call-close:focus-visible {
  background: var(--color-muted-surface);
  color: var(--color-foreground);
}

@keyframes call-pop-in {
  from {
    opacity: 0;
    transform: translateY(-5px) scale(0.98);
  }
}

@keyframes call-fade-in {
  from {
    opacity: 0;
  }
}

@keyframes call-sheet-in {
  from {
    opacity: 0;
    transform: translateY(1rem);
  }
}

@media (prefers-reduced-motion: reduce) {
  .call-trigger,
  .call-option {
    transition: none;
  }

  .call-popover,
  .call-overlay,
  .call-sheet {
    animation: none;
  }
}
</style>
