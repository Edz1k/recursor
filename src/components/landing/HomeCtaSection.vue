<script setup lang="ts">
import { Motion } from 'motion-v'
import { SPRING_MEDIUM, SPRING_SNAPPY, SPRING_SOFT } from '~/data/motion'

const emit = defineEmits<{
  discuss: []
}>()
</script>

<template>
  <section class="cta-section" aria-labelledby="cta-title">
    <div class="container">
      <div class="cta-inner">
        <Motion
          as="p"
          class="section-kicker"
          :initial="{ opacity: 0, y: 16 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :transition="SPRING_MEDIUM"
          :viewport="{ once: true }"
        >
          Старт
        </Motion>

        <Motion
          id="cta-title"
          as="h2"
          class="cta-title"
          :initial="{ opacity: 0, y: 40, scale: 0.94 }"
          :while-in-view="{ opacity: 1, y: 0, scale: 1 }"
          :transition="{ ...SPRING_SOFT, delay: 0.08 }"
          :viewport="{ once: true }"
        >
          Готовы начать?
        </Motion>

        <Motion
          as="p"
          class="cta-sub"
          :initial="{ opacity: 0, y: 24 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :transition="{ ...SPRING_MEDIUM, delay: 0.2 }"
          :viewport="{ once: true }"
        >
          Расскажите нам о задаче. Ответим быстро и по делу.
        </Motion>

        <Motion
          :initial="{ opacity: 0, scale: 0.88, y: 16 }"
          :while-in-view="{ opacity: 1, scale: 1, y: 0 }"
          :while-hover="{ scale: 1.06, y: -4 }"
          :while-tap="{ scale: 0.95 }"
          :transition="{ ...SPRING_SNAPPY, delay: 0.34 }"
          :viewport="{ once: true }"
        >
          <button type="button" class="btn-primary btn-lg" @click="emit('discuss')">
            Обсудить проект
          </button>
        </Motion>

        <Motion
          as="p"
          class="cta-trust"
          :initial="{ opacity: 0 }"
          :while-in-view="{ opacity: 1 }"
          :transition="{ duration: 0.5, delay: 0.55 }"
          :viewport="{ once: true }"
        >
          Работаем по договору
          <span class="cta-trust-dot" aria-hidden="true" />
          Поддерживаем после запуска
        </Motion>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-section {
  padding: 7rem 0;
  background:
    radial-gradient(ellipse 64% 58% at 50% 0%, var(--section-glow), transparent 72%),
    linear-gradient(180deg, var(--section-canvas), var(--section-canvas-deep));
}

.container {
  width: min(1120px, calc(100% - 2rem));
  margin: 0 auto;
}

.cta-inner {
  display: flex;
  align-items: center;
  gap: 0;
  text-align: center;
  flex-direction: column;
}

.section-kicker {
  margin: 0 0 1rem;
  color: var(--color-muted);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.cta-title {
  margin: 0 0 1.25rem;
  color: var(--color-foreground);
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 1;
  will-change: transform, opacity;
}

.cta-sub {
  max-width: 28rem;
  margin: 0 0 2.25rem;
  color: var(--color-muted-foreground);
  font-size: 1.0625rem;
  line-height: 1.65;
}

.cta-trust {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  margin-top: 1.25rem;
  color: var(--color-muted);
  font-size: 0.8125rem;
}

.cta-trust-dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.45;
}

.btn-primary {
  display: inline-flex;
  height: 2.875rem;
  align-items: center;
  justify-content: center;
  padding: 0 1.625rem;
  border: none;
  border-radius: 0.625rem;
  background: var(--color-main);
  box-shadow: 0 4px 18px rgb(0 0 0 / 18%);
  color: var(--color-main-foreground);
  cursor: pointer;
  font-size: 0.9375rem;
  font-weight: 800;
  outline: none;
  will-change: transform;
}

.btn-primary:focus-visible {
  box-shadow: 0 0 0 2px var(--color-ring);
}

.btn-lg {
  height: 3.25rem;
  padding: 0 2rem;
  font-size: 1rem;
}

@media (max-width: 640px) {
  .cta-section {
    padding: 5rem 0;
  }

  .btn-primary {
    width: 100%;
  }
}
</style>
