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

interface ContactOption {
  label: string
  href: string
  description?: string
}

const props = defineProps<{
  numbers: ContactOption[]
  label?: string
  title?: string
  description?: string
  variant?: 'social' | 'action'
}>()

const isMobile = useMediaQuery('(max-width: 620px)')
const isPopoverOpen = shallowRef(false)
const pickerTitleId = useId()
const route = useRoute()

watch(() => route.fullPath, () => {
  isPopoverOpen.value = false
})
</script>

<template>
  <DialogRoot v-if="isMobile">
    <DialogTrigger as-child>
      <button
        class="whatsapp-trigger"
        :class="{
          'whatsapp-trigger-action': props.variant === 'action',
          'whatsapp-trigger-social': props.variant === 'social',
        }"
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
            {{ props.title ?? 'Выберите номер' }}
          </DialogTitle>
          <DialogDescription class="whatsapp-description">
            {{ props.description ?? 'Откроем чат WhatsApp с выбранным номером.' }}
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

  <PopoverRoot v-else v-model:open="isPopoverOpen">
    <PopoverTrigger as-child>
      <button
        class="whatsapp-trigger"
        :class="{
          'whatsapp-trigger-action': props.variant === 'action',
          'whatsapp-trigger-social': props.variant === 'social',
        }"
        type="button"
      >
        {{ props.label ?? 'WhatsApp' }}
      </button>
    </PopoverTrigger>

    <Teleport to="body">
      <Transition name="whatsapp-backdrop">
        <div
          v-if="isPopoverOpen"
          class="whatsapp-popover-backdrop"
          aria-hidden="true"
          @pointerdown="isPopoverOpen = false"
        />
      </Transition>
    </Teleport>

    <PopoverPortal>
      <PopoverContent
        class="whatsapp-popover"
        role="dialog"
        :aria-labelledby="pickerTitleId"
        side="top"
        :side-offset="14"
        align="start"
        :collision-padding="24"
        :avoid-collisions="true"
      >
        <div class="whatsapp-popover-heading">
          <div>
            <p :id="pickerTitleId" class="whatsapp-popover-title">
              {{ props.title ?? 'Выберите номер' }}
            </p>
            <p v-if="props.description" class="whatsapp-popover-description">
              {{ props.description }}
            </p>
          </div>
          <button
            class="whatsapp-popover-close"
            type="button"
            aria-label="Закрыть меню"
            @click="isPopoverOpen = false"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
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
            <span class="whatsapp-option-content">
              <strong>{{ number.label }}</strong>
              <span v-if="number.description">{{ number.description }}</span>
            </span>
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
:global(:root) {
  --contact-picker-backdrop-layer: 1000;
  --contact-picker-content-layer: 1010;
  --contact-picker-surface: rgb(250 250 250 / 98%);
  --contact-picker-option: #f4f4f5;
}

:global(.dark) {
  --contact-picker-surface: rgb(24 24 27 / 98%);
  --contact-picker-option: #27272a;
}

.whatsapp-trigger {
  position: relative;
  width: fit-content;
  min-height: 2.25rem;
  border: 0;
  padding: 0;
  background: transparent;
  color: var(--contacts-muted, var(--color-muted-foreground));
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
  color: var(--contacts-text, var(--color-foreground));
  opacity: 1;
}

.whatsapp-trigger:hover::after,
.whatsapp-trigger:focus-visible::after,
.whatsapp-trigger[data-state='open']::after {
  transform: scaleX(1);
}

.whatsapp-trigger:focus-visible,
.whatsapp-trigger-action:focus-visible {
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--contacts-text, var(--color-foreground)) 12%, transparent);
}

.whatsapp-trigger-action {
  display: inline-flex;
  min-height: 3.15rem;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--contacts-border, var(--color-border));
  border-radius: 999px;
  padding: 0 1.35rem;
  background: var(--contacts-card, var(--color-muted-surface));
  color: var(--contacts-text, var(--color-foreground));
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
  border-color: var(--contacts-border-strong, var(--color-foreground));
  background: var(--contacts-card-hover, var(--color-surface-elevated));
  box-shadow: 0 18px 46px var(--contacts-shadow, rgb(0 0 0 / 18%));
  transform: translateY(-2px) scale(1.012);
}

.whatsapp-trigger-social {
  display: inline-flex;
  min-height: 2.75rem;
  align-items: center;
  justify-content: center;
  padding: 0 1.1rem;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background: var(--color-muted-surface);
  color: var(--color-foreground);
  font-weight: 800;
  opacity: 1;
  transition:
    transform 240ms ease,
    border-color 240ms ease,
    background-color 240ms ease;
}

.whatsapp-trigger-social::after {
  display: none;
}

.whatsapp-trigger-social:hover,
.whatsapp-trigger-social:focus-visible,
.whatsapp-trigger-social[data-state='open'] {
  border-color: color-mix(in srgb, var(--color-foreground) 24%, transparent);
  background: var(--color-surface-elevated);
  transform: translateY(-2px);
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

.whatsapp-popover-backdrop {
  position: fixed;
  inset: 0;
  z-index: var(--contact-picker-backdrop-layer);
  background: rgb(0 0 0 / 30%);
}

:global([data-reka-popper-content-wrapper]:has(> .whatsapp-popover)) {
  z-index: var(--contact-picker-content-layer) !important;
  pointer-events: auto;
}

.whatsapp-popover {
  z-index: var(--contact-picker-content-layer);
  width: min(21rem, calc(100vw - 3rem));
  border-color: color-mix(in srgb, var(--picker-text) 14%, transparent);
  border-radius: 1.15rem;
  padding: 1.25rem;
  background: var(--contact-picker-surface);
  box-shadow:
    0 24px 72px rgb(0 0 0 / 30%),
    0 2px 8px rgb(0 0 0 / 12%);
  backdrop-filter: blur(6px);
  transform-origin: var(--reka-popover-content-transform-origin);
  animation: whatsapp-popover-in 180ms cubic-bezier(0.16, 1, 0.3, 1);
}

.whatsapp-popover-heading {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 1rem;
  align-items: start;
  margin-bottom: 1rem;
}

.whatsapp-popover-title,
.whatsapp-title {
  margin: 0;
  font-size: 0.92rem;
  font-weight: 900;
}

.whatsapp-popover-title {
  padding: 0;
  font-size: 1rem;
  line-height: 1.35;
  text-wrap: balance;
}

.whatsapp-popover-description {
  margin: 0.35rem 0 0;
  color: var(--picker-muted);
  font-size: 0.84rem;
  line-height: 1.45;
}

.whatsapp-popover-close {
  display: inline-grid;
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid var(--picker-border);
  border-radius: 0.75rem;
  background: var(--contact-picker-option);
  color: var(--picker-muted);
  cursor: pointer;
  outline: none;
  place-items: center;
  transition:
    border-color 180ms ease,
    color 180ms ease,
    background-color 180ms ease;
}

.whatsapp-popover-close svg {
  width: 1rem;
  height: 1rem;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-width: 1.8;
}

.whatsapp-popover-close:hover,
.whatsapp-popover-close:focus-visible {
  border-color: color-mix(in srgb, var(--picker-text) 28%, transparent);
  background: var(--picker-surface);
  color: var(--picker-text);
}

.whatsapp-popover-close:focus-visible {
  box-shadow: 0 0 0 3px var(--color-ring);
}

.whatsapp-options {
  display: grid;
  gap: 0.45rem;
}

.whatsapp-popover .whatsapp-options {
  gap: 0.65rem;
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

.whatsapp-popover .whatsapp-option {
  min-height: 3.5rem;
  padding: 0.65rem 0.9rem;
  background: var(--contact-picker-option);
}

.whatsapp-option-content {
  display: grid;
  min-width: 0;
  gap: 0.15rem;
}

.whatsapp-option-content strong {
  overflow-wrap: anywhere;
  font-size: 0.9rem;
  line-height: 1.3;
}

.whatsapp-option-content > span {
  color: var(--picker-muted);
  font-size: 0.78rem;
  font-weight: 600;
  line-height: 1.35;
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

.whatsapp-backdrop-enter-active,
.whatsapp-backdrop-leave-active {
  transition: opacity 180ms ease;
}

.whatsapp-backdrop-enter-from,
.whatsapp-backdrop-leave-to {
  opacity: 0;
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
  .whatsapp-popover-backdrop,
  .whatsapp-overlay,
  .whatsapp-sheet {
    animation: none;
  }
}
</style>
