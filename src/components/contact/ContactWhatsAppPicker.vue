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

interface WhatsAppNumber {
  label: string
  href: string
}

const props = defineProps<{
  numbers: WhatsAppNumber[]
  label?: string
  variant?: 'social' | 'action'
}>()

const isMobile = useMediaQuery('(max-width: 620px)')
</script>

<template>
  <DialogRoot v-if="isMobile">
    <DialogTrigger as-child>
      <button
        class="whatsapp-trigger"
        :class="{ 'whatsapp-trigger-action': props.variant === 'action' }"
        type="button"
      >
        {{ props.label ?? 'WhatsApp' }}
      </button>
    </DialogTrigger>

    <DialogPortal>
      <DialogOverlay class="whatsapp-overlay" />
      <DialogContent class="whatsapp-sheet">
        <div class="whatsapp-sheet-handle" aria-hidden="true" />
        <div class="whatsapp-heading">
          <DialogTitle class="whatsapp-title">
            Выберите номер
          </DialogTitle>
          <DialogDescription class="whatsapp-description">
            Откроем чат WhatsApp с выбранным номером.
          </DialogDescription>
        </div>

        <div class="whatsapp-options">
          <a
            v-for="number in props.numbers"
            :key="number.href"
            class="whatsapp-option"
            :href="number.href"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{{ number.label }}</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M14 5h5v5M19 5l-8 8M19 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4" />
            </svg>
          </a>
        </div>

        <DialogClose class="whatsapp-close" type="button">
          Отмена
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>

  <PopoverRoot v-else>
    <PopoverTrigger as-child>
      <button
        class="whatsapp-trigger"
        :class="{ 'whatsapp-trigger-action': props.variant === 'action' }"
        type="button"
      >
        {{ props.label ?? 'WhatsApp' }}
      </button>
    </PopoverTrigger>

    <PopoverPortal>
      <PopoverContent
        class="whatsapp-popover"
        side="top"
        :side-offset="10"
        align="start"
        :collision-padding="16"
      >
        <p class="whatsapp-popover-title">
          Выберите номер
        </p>
        <div class="whatsapp-options">
          <a
            v-for="number in props.numbers"
            :key="number.href"
            class="whatsapp-option"
            :href="number.href"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{{ number.label }}</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M14 5h5v5M19 5l-8 8M19 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4" />
            </svg>
          </a>
        </div>
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>

<style scoped>
.whatsapp-trigger {
  position: relative;
  width: fit-content;
  min-height: 2.25rem;
  border: 0;
  padding: 0;
  background: transparent;
  color: var(--contacts-muted);
  font: inherit;
  line-height: 1.45;
  text-align: left;
  cursor: pointer;
  outline: none;
  opacity: 0.82;
  transition:
    color 240ms ease,
    opacity 240ms ease;
}

.whatsapp-trigger::after {
  position: absolute;
  right: 0;
  bottom: 0.28rem;
  left: 0;
  height: 1px;
  background: currentColor;
  content: '';
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 240ms ease;
}

.whatsapp-trigger:hover,
.whatsapp-trigger:focus-visible,
.whatsapp-trigger[data-state='open'] {
  color: var(--contacts-text);
  opacity: 1;
}

.whatsapp-trigger:hover::after,
.whatsapp-trigger:focus-visible::after,
.whatsapp-trigger[data-state='open']::after {
  transform: scaleX(1);
}

.whatsapp-trigger:focus-visible,
.whatsapp-trigger-action:focus-visible {
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--contacts-text) 12%, transparent);
}

.whatsapp-trigger-action {
  display: inline-flex;
  min-height: 3.15rem;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--contacts-border);
  border-radius: 999px;
  padding: 0 1.35rem;
  background: var(--contacts-card);
  color: var(--contacts-text);
  font-weight: 850;
  opacity: 1;
  backdrop-filter: blur(10px);
  transition:
    border-color 280ms ease,
    background-color 280ms ease,
    color 280ms ease,
    transform 280ms cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 280ms ease;
}

.whatsapp-trigger-action::after {
  display: none;
}

.whatsapp-trigger-action:hover,
.whatsapp-trigger-action:focus-visible,
.whatsapp-trigger-action[data-state='open'] {
  border-color: var(--contacts-border-strong);
  background: var(--contacts-card-hover);
  box-shadow: 0 18px 46px var(--contacts-shadow);
  transform: translateY(-2px) scale(1.012);
}

.whatsapp-popover,
.whatsapp-sheet {
  --picker-border: var(--color-border);
  --picker-surface: var(--color-surface-elevated);
  --picker-surface-muted: var(--color-muted-surface);
  --picker-text: var(--color-foreground);
  --picker-muted: var(--color-muted-foreground);

  border: 1px solid var(--picker-border);
  background: var(--picker-surface);
  color: var(--picker-text);
  box-shadow: 0 18px 52px rgb(0 0 0 / 24%);
  backdrop-filter: blur(18px);
  outline: none;
}

.whatsapp-popover {
  z-index: 60;
  width: min(18rem, calc(100vw - 2rem));
  border-radius: 1rem;
  padding: 0.8rem;
  transform-origin: var(--reka-popover-content-transform-origin);
  animation: whatsapp-popover-in 180ms cubic-bezier(0.16, 1, 0.3, 1);
}

.whatsapp-popover-title,
.whatsapp-title {
  margin: 0;
  font-size: 0.92rem;
  font-weight: 900;
}

.whatsapp-popover-title {
  padding: 0.15rem 0.2rem 0.65rem;
}

.whatsapp-options {
  display: grid;
  gap: 0.45rem;
}

.whatsapp-option {
  display: flex;
  min-height: 2.8rem;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border: 1px solid var(--picker-border);
  border-radius: 0.75rem;
  padding: 0 0.85rem;
  background: var(--picker-surface-muted);
  color: var(--picker-text);
  font-weight: 800;
  text-decoration: none;
  outline: none;
  transition:
    border-color 220ms ease,
    background-color 220ms ease,
    opacity 220ms ease;
}

.whatsapp-option svg {
  width: 1rem;
  height: 1rem;
  flex: 0 0 auto;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.8;
  opacity: 0.58;
}

.whatsapp-option:hover,
.whatsapp-option:focus-visible {
  border-color: var(--picker-text);
  background: var(--picker-surface);
}

.whatsapp-option:focus-visible,
.whatsapp-close:focus-visible {
  box-shadow: 0 0 0 3px var(--color-ring);
}

.whatsapp-option:hover svg,
.whatsapp-option:focus-visible svg {
  opacity: 1;
}

.whatsapp-overlay {
  position: fixed;
  inset: 0;
  z-index: 60;
  background: rgb(0 0 0 / 48%);
  backdrop-filter: blur(4px);
  animation: whatsapp-overlay-in 180ms ease-out;
}

.whatsapp-sheet {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 61;
  width: 100%;
  max-height: calc(100dvh - 1rem);
  overflow-y: auto;
  border-width: 1px 1px 0;
  border-radius: 1.25rem 1.25rem 0 0;
  padding: 0.65rem 1rem max(1rem, env(safe-area-inset-bottom));
  animation: whatsapp-sheet-in 240ms cubic-bezier(0.16, 1, 0.3, 1);
}

.whatsapp-sheet-handle {
  width: 2.5rem;
  height: 0.25rem;
  margin: 0 auto 1rem;
  border-radius: 999px;
  background: var(--contacts-border-strong);
}

.whatsapp-heading {
  margin-bottom: 1rem;
}

.whatsapp-description {
  margin: 0.35rem 0 0;
  color: var(--picker-muted);
  font-size: 0.88rem;
  line-height: 1.45;
}

.whatsapp-sheet .whatsapp-option {
  min-height: 3.25rem;
}

.whatsapp-close {
  width: 100%;
  min-height: 3rem;
  margin-top: 0.65rem;
  border: 1px solid var(--picker-border);
  border-radius: 0.8rem;
  background: transparent;
  color: var(--picker-muted);
  font: inherit;
  font-weight: 800;
  cursor: pointer;
  outline: none;
  transition:
    background-color 220ms ease,
    color 220ms ease;
}

.whatsapp-close:hover,
.whatsapp-close:focus-visible {
  background: var(--picker-surface-muted);
  color: var(--picker-text);
}

@media (max-width: 620px) {
  .whatsapp-trigger-action {
    width: 100%;
  }
}

@keyframes whatsapp-popover-in {
  from {
    opacity: 0;
    transform: translateY(5px) scale(0.98);
  }
}

@keyframes whatsapp-overlay-in {
  from {
    opacity: 0;
  }
}

@keyframes whatsapp-sheet-in {
  from {
    opacity: 0;
    transform: translateY(1rem);
  }
}

@media (prefers-reduced-motion: reduce) {
  .whatsapp-trigger,
  .whatsapp-trigger::after,
  .whatsapp-option,
  .whatsapp-close {
    transition: none;
  }

  .whatsapp-popover,
  .whatsapp-overlay,
  .whatsapp-sheet {
    animation: none;
  }
}
</style>
