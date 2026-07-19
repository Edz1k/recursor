<script setup lang="ts">
import { Motion } from 'motion-v'
import { LANDING_PROCESS } from '~/data/landing'
import { SPRING_MEDIUM } from '~/data/motion'
</script>

<template>
  <section class="section section-alt" aria-labelledby="process-title">
    <div class="container">
      <Motion
        class="section-header"
        :initial="{ opacity: 0, y: 36 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="SPRING_MEDIUM"
        :viewport="{ once: true, margin: '-60px' }"
      >
        <p class="section-kicker">
          Процесс
        </p>
        <h2 id="process-title" class="section-title">
          Как мы работаем
        </h2>
      </Motion>

      <ol class="process-list">
        <Motion
          v-for="(processItem, index) in LANDING_PROCESS"
          :key="processItem.step"
          as="li"
          class="process-item"
          :initial="{ opacity: 0, x: -40 }"
          :while-in-view="{ opacity: 1, x: 0 }"
          :while-hover="{ y: -4 }"
          :while-tap="{ scale: 0.99, y: -2 }"
          :transition="{ ...SPRING_MEDIUM, delay: index * 0.11 }"
          :viewport="{ once: true, margin: '-40px' }"
        >
          <Motion
            as="span"
            class="process-step"
            :while-in-view="{ opacity: 1 }"
            :initial="{ opacity: 0.35 }"
            :transition="{ duration: 0.4, delay: index * 0.11 + 0.3 }"
            :viewport="{ once: true }"
          >
            {{ processItem.step }}
          </Motion>
          <span class="process-label">{{ processItem.label }}</span>
          <p class="process-desc">
            {{ processItem.desc }}
          </p>
        </Motion>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.section {
  padding: 7rem 0;
  background:
    radial-gradient(ellipse 68% 52% at 88% 18%, var(--section-glow), transparent 70%),
    linear-gradient(180deg, var(--section-canvas), var(--section-canvas-deep));
}

.section-alt {
  background:
    radial-gradient(ellipse 68% 52% at 88% 18%, var(--section-glow), transparent 70%),
    linear-gradient(145deg, var(--section-canvas-muted), var(--section-canvas-deep));
}

.container {
  width: min(1120px, calc(100% - 2rem));
  margin: 0 auto;
}

.section-header {
  margin-bottom: 3.5rem;
}

.section-kicker {
  margin: 0 0 0.75rem;
  color: var(--color-muted);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.section-title {
  margin: 0;
  color: var(--color-foreground);
  font-size: clamp(2rem, 4vw, 3.25rem);
  font-weight: 900;
  letter-spacing: -0.03em;
  line-height: 1.06;
}

.process-list {
  position: relative;
  display: grid;
  gap: 1px;
  overflow: hidden;
  margin: 0;
  padding: 0;
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  background: var(--color-border);
  isolation: isolate;
  list-style: none;
}

.process-item {
  position: relative;
  z-index: 1;
  display: flex;
  gap: 0.625rem;
  padding: 2rem;
  background: var(--color-muted-surface);
  box-shadow: inset 0 0 0 1px transparent;
  flex-direction: column;
  transition:
    background-color 260ms ease,
    box-shadow 260ms ease;
  will-change: transform;
}

.process-item:hover,
.process-item:focus-within {
  background: var(--color-background);
  box-shadow:
    inset 0 0 0 1px color-mix(in srgb, var(--color-main) 28%, transparent),
    0 18px 42px rgb(0 0 0 / 12%);
}

.process-step {
  position: relative;
  z-index: 3;
  align-self: flex-start;
  padding-right: 0.625rem;
  background: inherit;
  color: var(--color-muted);
  font-family: 'DM Mono', ui-monospace, monospace;
  font-size: 0.6875rem;
  font-weight: 800;
  letter-spacing: 0.06em;
}

.process-label {
  color: var(--color-foreground);
  font-size: 1.0625rem;
  font-weight: 800;
  line-height: 1.25;
}

.process-desc {
  margin: 0;
  color: var(--color-muted-foreground);
  font-size: 0.9375rem;
  line-height: 1.65;
}

@media (min-width: 640px) {
  .process-list {
    grid-template-columns: repeat(4, 1fr);
  }

  .process-list::before {
    position: absolute;
    z-index: 2;
    top: 3rem;
    right: 2rem;
    left: 2rem;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--color-main), transparent);
    content: '';
    opacity: 0.32;
    pointer-events: none;
  }
}

@media (max-width: 640px) {
  .section {
    padding: 5rem 0;
  }

  .process-item {
    padding: 1.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .process-item {
    transition: none;
  }
}
</style>
