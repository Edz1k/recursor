<script setup lang="ts">
import { Motion } from 'motion-v'
import { SPRING_MEDIUM, SPRING_SNAPPY, SPRING_SOFT } from '~/data/motion'

const emit = defineEmits<{
  discuss: []
}>()
</script>

<template>
  <section class="hero">
    <HomeCanvasBackdrop />

    <div class="hero-inner">
      <Motion
        as="span"
        class="hero-badge"
        :initial="{ opacity: 0, y: -18 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ ...SPRING_MEDIUM, delay: 0.05 }"
      >
        <span class="hero-badge-dot" aria-hidden="true" />
        Web Studio, Алматы, Казахстан
      </Motion>

      <h1 class="hero-h1">
        <span class="line-clip">
          <Motion
            as="span"
            class="line-inner"
            :initial="{ y: '112%' }"
            :animate="{ y: '0%' }"
            :transition="{ ...SPRING_SOFT, delay: 0.14 }"
          >Строим</Motion>
        </span>
        <span class="line-clip">
          <Motion
            as="span"
            class="line-inner hero-h1-dim"
            :initial="{ y: '112%' }"
            :animate="{ y: '0%' }"
            :transition="{ ...SPRING_SOFT, delay: 0.26 }"
          >цифровые</Motion>
        </span>
        <span class="line-clip">
          <Motion
            as="span"
            class="line-inner"
            :initial="{ y: '112%' }"
            :animate="{ y: '0%' }"
            :transition="{ ...SPRING_SOFT, delay: 0.38 }"
          >продукты.</Motion>
        </span>
      </h1>

      <Motion
        as="p"
        class="hero-desc"
        :initial="{ opacity: 0, y: 28 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ ...SPRING_MEDIUM, delay: 0.58 }"
      >
        От первого экрана до боевого сервера.<br class="hero-desc-br">
        Без лишнего шума, с поддержкой после релиза.
      </Motion>

      <div class="hero-actions">
        <Motion
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :while-hover="{ scale: 1.04, y: -3 }"
          :while-tap="{ scale: 0.96 }"
          :transition="{ ...SPRING_SNAPPY, delay: 0.72 }"
        >
          <button type="button" class="btn-primary" @click="emit('discuss')">
            Обсудить проект
          </button>
        </Motion>

        <Motion
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :while-hover="{ x: 5 }"
          :while-tap="{ scale: 0.97 }"
          :transition="{ ...SPRING_SNAPPY, delay: 0.82 }"
        >
          <RouterLink to="/cases" class="btn-ghost">
            Смотреть кейсы
            <span class="i-carbon-arrow-right ml-1.5 text-base" aria-hidden="true" />
          </RouterLink>
        </Motion>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  display: flex;
  align-items: center;
  min-height: calc(100vh - 4.5rem);
  overflow: hidden;
  background: var(--color-background);
}

.hero-inner {
  position: relative;
  z-index: 1;
  display: flex;
  width: min(1120px, calc(100% - 2rem));
  margin: 0 auto;
  padding: 6rem 0 5rem;
  align-items: flex-start;
  flex-direction: column;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  padding: 0.35rem 0.85rem;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background: var(--color-muted-surface);
  color: var(--color-muted-foreground);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.hero-badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-foreground);
  animation: pulse-dot 2.4s ease-in-out infinite;
}

.hero-h1 {
  display: flex;
  margin: 0;
  color: var(--color-foreground);
  font-size: clamp(3.25rem, 8.5vw, 7.5rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 0.95;
  flex-direction: column;
}

.line-clip {
  display: block;
  overflow: hidden;
  padding-bottom: 0.06em;
}

.line-inner {
  display: block;
  will-change: transform;
}

.hero-h1-dim {
  opacity: 0.2;
}

.hero-desc {
  max-width: 32rem;
  margin: 2rem 0 0;
  color: var(--color-muted-foreground);
  font-size: clamp(1rem, 1.5vw, 1.125rem);
  line-height: 1.72;
}

.hero-desc-br {
  display: none;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.875rem;
  margin-top: 2.5rem;
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

.btn-ghost {
  display: inline-flex;
  height: 2.875rem;
  align-items: center;
  padding: 0 1.25rem;
  border: 1px solid var(--color-border);
  border-radius: 0.625rem;
  color: var(--color-foreground);
  font-size: 0.9375rem;
  font-weight: 700;
  outline: none;
  text-decoration: none;
  will-change: transform;
}

.btn-ghost:focus-visible {
  box-shadow: 0 0 0 2px var(--color-ring);
}

@keyframes pulse-dot {
  0%,
  100% {
    opacity: 0.7;
    transform: scale(0.85);
  }

  50% {
    opacity: 1;
    transform: scale(1);
  }
}

@media (min-width: 640px) {
  .hero-desc-br {
    display: inline;
  }
}

@media (max-width: 640px) {
  .hero-inner {
    padding: 4rem 0;
  }

  .hero-actions {
    width: 100%;
    flex-direction: column;
  }

  .btn-primary,
  .btn-ghost {
    width: 100%;
    justify-content: center;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-badge-dot {
    animation: none;
  }
}
</style>
