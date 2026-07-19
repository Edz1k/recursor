<script setup lang="ts">
import { Motion } from 'motion-v'
import { LANDING_SERVICES } from '~/data/landing'
import { SPRING_MEDIUM } from '~/data/motion'
</script>

<template>
  <section class="section" aria-labelledby="services-title">
    <div class="container">
      <Motion
        class="section-header"
        :initial="{ opacity: 0, y: 36 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ ...SPRING_MEDIUM }"
        :viewport="{ once: true, margin: '-60px' }"
      >
        <p class="section-kicker">
          Услуги
        </p>
        <h2 id="services-title" class="section-title">
          Что мы делаем
        </h2>
      </Motion>

      <div class="services-grid">
        <Motion
          v-for="(service, index) in LANDING_SERVICES"
          :key="service.num"
          as="article"
          class="service-card"
          :initial="{ opacity: 0, y: 56 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :while-hover="{ y: -8, scale: 1.015 }"
          :while-tap="{ scale: 0.975, y: -3 }"
          :transition="{ ...SPRING_MEDIUM, delay: index * 0.13 }"
          :viewport="{ once: true, margin: '-50px' }"
        >
          <div class="service-preview" :class="service.previewClass">
            <div class="service-browser">
              <div class="service-browser-bar">
                <span />
                <span />
                <span />
              </div>
              <div class="service-screen">
                <img class="service-screen-img" :src="service.image" :alt="service.imageAlt">
                <div class="service-screen-header">
                  <span class="service-screen-label">{{ service.preview }}</span>
                  <span class="service-screen-pill" />
                </div>
              </div>
            </div>
          </div>

          <div class="service-body">
            <div class="service-heading">
              <span class="service-num">{{ service.num }}</span>
              <h3 class="service-title">
                {{ service.title }}
              </h3>
            </div>
            <p class="service-desc">
              {{ service.desc }}
            </p>
            <div class="service-tags" aria-label="Направления">
              <span v-for="tag in service.tags" :key="tag" class="service-tag">{{ tag }}</span>
            </div>
          </div>

          <RouterLink to="/cases" class="service-example" aria-label="Смотреть пример услуги">
            Смотреть пример
            <span class="i-carbon-arrow-right" aria-hidden="true" />
          </RouterLink>
        </Motion>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section {
  padding: 7rem 0;
  background:
    radial-gradient(ellipse 72% 48% at 8% 12%, var(--section-glow), transparent 68%),
    linear-gradient(180deg, var(--section-canvas), var(--section-canvas-deep));
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

.services-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.service-card {
  position: relative;
  display: flex;
  min-height: 100%;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  background: linear-gradient(180deg, rgb(255 255 255 / 4%), transparent 46%), var(--color-background);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 5%);
  cursor: default;
  transition:
    border-color 220ms ease,
    background-color 220ms ease,
    box-shadow 220ms ease;
  flex-direction: column;
  will-change: transform;
}

.service-card:hover,
.service-card:focus-within {
  border-color: color-mix(in srgb, var(--color-main) 42%, var(--color-border));
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 8%),
    0 22px 52px rgb(0 0 0 / 22%);
}

.service-preview {
  padding: 1rem 1rem 0;
}

.service-browser {
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--color-border) 76%, transparent);
  border-radius: 0.75rem;
  background: rgb(0 0 0 / 22%);
  box-shadow: 0 18px 44px rgb(0 0 0 / 16%);
}

.service-browser-bar {
  display: flex;
  height: 1.7rem;
  align-items: center;
  gap: 0.375rem;
  padding: 0 0.75rem;
  border-bottom: 1px solid color-mix(in srgb, var(--color-border) 74%, transparent);
  background: rgb(255 255 255 / 4%);
}

.service-browser-bar span {
  width: 0.42rem;
  height: 0.42rem;
  border-radius: 999px;
  background: rgb(255 255 255 / 28%);
}

.service-screen {
  position: relative;
  min-height: 9rem;
  overflow: hidden;
  padding: 1rem;
  aspect-ratio: 16 / 9;
  background:
    radial-gradient(circle at 20% 10%, rgb(255 255 255 / 18%), transparent 34%),
    linear-gradient(135deg, rgb(255 255 255 / 10%), rgb(255 255 255 / 2%));
  transform: scale(1);
  transform-origin: center;
  transition: transform 260ms ease;
}

.service-card:hover .service-screen,
.service-card:focus-within .service-screen {
  transform: scale(1.045);
}

.service-screen::after {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 0%, rgb(0 0 0 / 30%) 100%);
  content: '';
  pointer-events: none;
}

.service-screen-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: left top;
  opacity: 0.82;
  filter: brightness(0.72) saturate(0.9);
}

.preview-business .service-screen-img {
  object-position: center top;
}

.preview-site .service-screen {
  background:
    radial-gradient(circle at 20% 10%, rgb(137 221 255 / 24%), transparent 34%),
    linear-gradient(135deg, rgb(130 170 255 / 28%), rgb(195 232 141 / 10%));
}

.preview-business .service-screen {
  background:
    radial-gradient(circle at 22% 12%, rgb(255 203 107 / 24%), transparent 34%),
    linear-gradient(135deg, rgb(137 221 255 / 20%), rgb(199 146 234 / 14%));
}

.preview-support .service-screen {
  background:
    radial-gradient(circle at 20% 10%, rgb(127 219 202 / 22%), transparent 34%),
    linear-gradient(135deg, rgb(195 232 141 / 18%), rgb(130 170 255 / 12%));
}

.service-screen-header,
.service-screen-pill {
  position: relative;
  z-index: 1;
}

.service-screen-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.service-screen-label {
  color: rgb(255 255 255 / 82%);
  font-family: 'DM Mono', ui-monospace, monospace;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.service-screen-pill {
  width: 2.5rem;
  height: 0.5rem;
  border-radius: 999px;
  background: rgb(255 255 255 / 24%);
}

.service-body {
  display: flex;
  flex: 1;
  gap: 0.875rem;
  padding: 1.5rem 1.5rem 0;
  flex-direction: column;
}

.service-heading {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 0.875rem;
}

.service-num {
  display: inline-flex;
  width: 2rem;
  height: 2rem;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  color: var(--color-muted);
  font-family: 'DM Mono', ui-monospace, monospace;
  font-size: 0.6875rem;
  font-weight: 800;
  flex-shrink: 0;
}

.service-title {
  margin: 0;
  color: var(--color-foreground);
  font-size: 1.1875rem;
  font-weight: 800;
  line-height: 1.25;
}

.service-desc {
  flex: 1;
  margin: 0;
  color: var(--color-muted-foreground);
  font-size: 0.9375rem;
  line-height: 1.7;
}

.service-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.service-tag {
  display: inline-flex;
  min-height: 1.65rem;
  align-items: center;
  padding: 0 0.65rem;
  border: 1px solid color-mix(in srgb, var(--color-border) 76%, transparent);
  border-radius: 999px;
  background: var(--color-muted-surface);
  color: var(--color-muted-foreground);
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1;
}

.service-example {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  width: fit-content;
  margin: 1.25rem 1.5rem 1.5rem;
  color: var(--color-muted);
  font-size: 0.875rem;
  font-weight: 800;
  opacity: 0.72;
  text-decoration: none;
  transition:
    color 220ms ease,
    opacity 220ms ease,
    transform 220ms ease;
}

.service-card:hover .service-example,
.service-card:focus-within .service-example {
  color: var(--color-foreground);
  opacity: 1;
  transform: translateX(2px);
}

@media (min-width: 720px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1040px) {
  .services-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 640px) {
  .section {
    padding: 5rem 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .service-screen,
  .service-example {
    transition: none;
  }
}
</style>
