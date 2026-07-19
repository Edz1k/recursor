<script setup lang="ts">
import type { CaseSlug } from '~/data/cases'
import { Motion } from 'motion-v'
import { useProjectDiscussDialog } from '~/composables/useProjectDiscussDialog'
import { getCaseBySlug } from '~/data/cases'

const props = defineProps<{
  slug: CaseSlug
}>()

const { isDiscussOpen, openDiscussDialog } = useProjectDiscussDialog()
const item = computed(() => getCaseBySlug(props.slug))

const SPRING_MEDIUM = { type: 'spring', stiffness: 110, damping: 20 } as const
const SPRING_SNAPPY = { type: 'spring', stiffness: 200, damping: 22 } as const

useHead(() => ({
  title: item.value ? `${item.value.title}, кейс Recursor.kz` : 'Кейс, Recursor.kz',
}))
</script>

<template>
  <main v-if="item" class="case-page">
    <section class="case-hero" aria-labelledby="case-title">
      <div class="case-container">
        <RouterLink to="/cases" class="back-link">
          <span class="i-carbon-arrow-left" aria-hidden="true" />
          Кейсы
        </RouterLink>

        <Motion
          class="case-hero-grid"
          :initial="{ opacity: 0, y: 34 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="SPRING_MEDIUM"
        >
          <div class="case-hero-copy">
            <div class="case-meta">
              <span>{{ item.category }}</span>
              <span>{{ item.detailNiche }}</span>
            </div>
            <h1 id="case-title" class="case-title">
              {{ item.title }}
            </h1>
            <p class="case-subtitle">
              {{ item.detailSubtitle }}
            </p>
            <p class="case-description">
              {{ item.detailDescription }}
            </p>
          </div>

          <div class="case-browser hero-browser">
            <div class="case-browser-bar">
              <span />
              <span />
              <span />
              <strong>{{ item.browserLabel }}</strong>
            </div>
            <div class="case-screen">
              <img class="case-screen-img" :src="item.image" :alt="item.imageAlt">
            </div>
          </div>
        </Motion>
      </div>
    </section>

    <section class="case-section">
      <div class="case-container detail-grid">
        <article class="detail-card">
          <p class="section-kicker">
            Задача клиента
          </p>
          <p class="detail-text">
            {{ item.detailTask }}
          </p>
        </article>

        <article class="detail-card">
          <p class="section-kicker">
            Цели проекта
          </p>
          <ul class="work-list">
            <li v-for="goal in item.goals" :key="goal">
              {{ goal }}
            </li>
          </ul>
        </article>

        <article class="detail-card">
          <p class="section-kicker">
            Что сделали
          </p>
          <ul class="work-list">
            <li v-for="work in item.works" :key="work">
              {{ work }}
            </li>
          </ul>
        </article>
      </div>
    </section>

    <section class="case-section case-section-alt">
      <div class="case-container">
        <div class="section-heading">
          <p class="section-kicker">
            Особенности проекта
          </p>
          <h2 class="section-title">
            Решения, которые помогли собрать проект вокруг результата
          </h2>
          <p class="section-text">
            {{ item.featureText }}
          </p>
        </div>

        <div class="feature-grid">
          <span v-for="feature in item.features" :key="feature" class="feature-pill">
            {{ feature }}
          </span>
        </div>
      </div>
    </section>

    <section class="case-section" aria-labelledby="gallery-title">
      <div class="case-container">
        <div class="section-heading">
          <p class="section-kicker">
            Галерея
          </p>
          <h2 id="gallery-title" class="section-title">
            Скриншоты проекта
          </h2>
        </div>

        <div class="gallery-grid">
          <div v-for="shot in item.gallery" :key="shot.label" class="gallery-browser case-browser">
            <div class="case-browser-bar">
              <span />
              <span />
              <span />
              <strong>{{ shot.label }}</strong>
            </div>
            <div class="gallery-screen">
              <img v-if="shot.image" class="gallery-img" :src="shot.image" :alt="shot.alt">
              <div v-else class="gallery-placeholder" role="img" :aria-label="shot.alt">
                <span>{{ shot.label }}</span>
                <p>Скриншот добавим позже</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="case-cta" aria-labelledby="case-cta-title">
      <div class="case-container">
        <div class="cta-card">
          <p class="section-kicker">
            Следующий шаг
          </p>
          <h2 id="case-cta-title" class="cta-title">
            Хотите похожий проект?
          </h2>
          <p class="cta-text">
            Разберём вашу задачу, предложим структуру и покажем, как упаковать проект в понятный цифровой продукт.
          </p>
          <div class="cta-actions">
            <a
              v-if="item.siteUrl"
              class="btn-secondary"
              :href="item.siteUrl"
              target="_blank"
              rel="noopener"
            >
              Открыть сайт
              <span class="i-carbon-arrow-right" aria-hidden="true" />
            </a>
            <span v-else class="btn-secondary btn-disabled" aria-disabled="true">
              Открыть сайт
              <span class="i-carbon-arrow-right" aria-hidden="true" />
            </span>
            <Motion
              :while-hover="{ y: -3, scale: 1.04 }"
              :while-tap="{ scale: 0.96 }"
              :transition="SPRING_SNAPPY"
            >
              <button type="button" class="btn-primary" @click="openDiscussDialog">
                Хочу похожий проект
                <span class="i-carbon-arrow-right" aria-hidden="true" />
              </button>
            </Motion>
          </div>
        </div>
      </div>
    </section>

    <ProjectDiscussDialog v-model:open="isDiscussOpen" />
  </main>
</template>

<style scoped>
.case-page {
  min-height: 100vh;
  background: linear-gradient(180deg, var(--section-canvas), var(--section-canvas-deep));
  color: var(--color-foreground);
}

.case-container {
  width: min(1180px, calc(100% - 2rem));
  margin: 0 auto;
}

.case-hero {
  padding: 5rem 0 4rem;
  background: radial-gradient(circle at 78% 6%, rgb(130 170 255 / 10%), transparent 28rem), var(--color-background);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-bottom: 2rem;
  color: var(--color-muted);
  font-size: 0.9rem;
  font-weight: 900;
  text-decoration: none;
  transition:
    color 180ms ease,
    transform 180ms ease;
}

.back-link:hover {
  color: var(--color-foreground);
  transform: translateX(-2px);
}

.case-hero-grid {
  display: grid;
  gap: clamp(2rem, 5vw, 5rem);
  align-items: center;
}

.case-hero-copy {
  max-width: 47.5rem;
  min-width: 0;
}

.case-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.35rem;
}

.case-meta span,
.feature-pill {
  display: inline-flex;
  min-height: 1.8rem;
  align-items: center;
  padding: 0 0.7rem;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background: var(--color-muted-surface);
  color: var(--color-muted-foreground);
  font-size: 0.75rem;
  font-weight: 900;
}

.case-title {
  margin: 0;
  color: var(--color-foreground);
  font-size: clamp(3.5rem, 7vw, 7rem);
  font-weight: 900;
  line-height: 0.92;
  letter-spacing: -0.04em;
  overflow-wrap: anywhere;
}

.case-subtitle {
  max-width: 42rem;
  margin: 1rem 0 0;
  color: var(--color-foreground);
  font-size: clamp(1.75rem, 3vw, 3.25rem);
  font-weight: 900;
  line-height: 1.08;
  letter-spacing: -0.03em;
}

.case-description {
  max-width: 40rem;
  margin: 1rem 0 0;
  color: var(--color-muted-foreground);
  font-size: clamp(1.05rem, 1.6vw, 1.28rem);
  line-height: 1.6;
}

.case-browser {
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--color-border) 76%, transparent);
  border-radius: 1rem;
  background: radial-gradient(circle at 18% 8%, rgb(255 255 255 / 9%), transparent 32%), rgb(0 0 0 / 24%);
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 6%),
    0 22px 56px rgb(0 0 0 / 20%);
}

.hero-browser {
  width: 100%;
  max-width: 47.5rem;
  aspect-ratio: 16 / 9;
  justify-self: end;
}

.case-browser-bar {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  height: 1.9rem;
  padding: 0 0.8rem;
  border-bottom: 1px solid color-mix(in srgb, var(--color-border) 74%, transparent);
  background: rgb(255 255 255 / 4%);
}

.case-browser-bar span {
  width: 0.42rem;
  height: 0.42rem;
  border-radius: 999px;
  background: rgb(255 255 255 / 28%);
}

.case-browser-bar strong {
  margin-left: auto;
  overflow: hidden;
  color: rgb(255 255 255 / 54%);
  font-family: 'DM Mono', ui-monospace, monospace;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;
}

.case-screen,
.gallery-screen {
  display: grid;
  place-items: center;
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at 20% 10%, rgb(255 255 255 / 18%), transparent 34%),
    linear-gradient(135deg, rgb(130 170 255 / 18%), rgb(127 219 202 / 8%));
}

.case-screen {
  height: calc(100% - 1.9rem);
}

.case-screen::after,
.gallery-screen::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgb(0 0 0 / 6%), rgb(0 0 0 / 36%));
  pointer-events: none;
}

.case-screen-img,
.gallery-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: top center;
  opacity: 0.84;
  filter: brightness(0.74) saturate(0.9);
}

.case-screen-img {
  height: 100%;
}

.gallery-img {
  min-height: 0;
}

.gallery-placeholder {
  display: flex;
  min-height: 24rem;
  padding: 1.5rem;
  align-items: flex-start;
  justify-content: flex-end;
  flex-direction: column;
  background:
    linear-gradient(135deg, rgb(255 255 255 / 10%), transparent 42%),
    radial-gradient(circle at 78% 18%, rgb(130 170 255 / 18%), transparent 34%), var(--color-muted-surface);
  color: var(--color-foreground);
}

.gallery-placeholder span {
  font-size: clamp(1.5rem, 3vw, 2.4rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.03em;
}

.gallery-placeholder p {
  margin: 0.7rem 0 0;
  color: var(--color-muted-foreground);
  font-size: 0.95rem;
  font-weight: 800;
}

.case-section,
.case-cta {
  padding: 4.5rem 0;
  background:
    radial-gradient(ellipse 62% 46% at 10% 12%, var(--section-glow), transparent 72%),
    linear-gradient(180deg, var(--section-canvas), var(--section-canvas-deep));
}

.case-section-alt {
  background:
    radial-gradient(ellipse 58% 52% at 88% 18%, var(--section-glow), transparent 72%),
    linear-gradient(145deg, var(--section-canvas-muted), var(--section-canvas-deep));
}

.detail-grid {
  display: grid;
  gap: 1rem;
}

.detail-card,
.cta-card {
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  background: linear-gradient(180deg, rgb(255 255 255 / 4%), transparent 48%), var(--color-background);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 5%);
}

.detail-card {
  padding: 1.5rem;
}

.section-kicker {
  margin: 0 0 0.8rem;
  color: var(--color-muted);
  font-size: 0.75rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.section-title {
  max-width: 46rem;
  margin: 0;
  color: var(--color-foreground);
  font-size: clamp(2rem, 4vw, 3.4rem);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -0.03em;
}

.section-heading {
  margin-bottom: 2rem;
}

.section-text {
  max-width: 44rem;
  margin: 1rem 0 0;
  color: var(--color-muted-foreground);
  font-size: 1rem;
  line-height: 1.75;
}

.detail-text {
  margin: 0;
  color: var(--color-muted-foreground);
  font-size: 1rem;
  line-height: 1.75;
}

.work-list {
  display: grid;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.work-list li {
  position: relative;
  padding-left: 1.1rem;
  color: var(--color-foreground);
  font-size: 0.96rem;
  line-height: 1.6;
}

.work-list li::before {
  content: '';
  position: absolute;
  top: 0.72em;
  left: 0;
  width: 0.35rem;
  height: 0.35rem;
  border-radius: 999px;
  background: var(--color-muted);
}

.feature-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.gallery-grid {
  display: grid;
  gap: 1rem;
}

.gallery-browser {
  aspect-ratio: 16 / 9;
}

.gallery-grid .gallery-browser:first-child {
  aspect-ratio: 16 / 9;
}

.cta-card {
  display: flex;
  align-items: center;
  padding: 3rem;
  text-align: center;
  flex-direction: column;
}

.cta-title {
  margin: 0;
  color: var(--color-foreground);
  font-size: clamp(2.2rem, 5vw, 4.4rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.04em;
}

.cta-text {
  max-width: 38rem;
  margin: 1.2rem 0 2rem;
  color: var(--color-muted-foreground);
  font-size: 1rem;
  line-height: 1.75;
}

.cta-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.8rem;
}

.btn-primary,
.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  min-height: 2.875rem;
  padding: 0 1.35rem;
  border-radius: 0.625rem;
  font-size: 0.9375rem;
  font-weight: 900;
  text-decoration: none;
  outline: none;
}

.btn-primary {
  border: none;
  background: var(--color-main);
  color: var(--color-main-foreground);
  cursor: pointer;
  box-shadow: 0 4px 18px rgb(0 0 0 / 18%);
}

.btn-secondary {
  border: 1px solid var(--color-border);
  background: var(--color-muted-surface);
  color: var(--color-foreground);
}

.btn-disabled {
  cursor: not-allowed;
  opacity: 0.48;
}

.btn-primary:focus-visible,
.btn-secondary:focus-visible {
  box-shadow: 0 0 0 2px var(--color-ring);
}

@media (min-width: 860px) {
  .case-hero-grid {
    grid-template-columns: minmax(0, 0.95fr) minmax(20rem, 1fr);
  }

  .detail-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .case-hero {
    padding: 4.25rem 0 3rem;
  }

  .case-container {
    width: min(100% - 2.5rem, 1180px);
  }

  .back-link {
    margin-bottom: 1.5rem;
  }

  .case-meta {
    gap: 0.45rem;
    margin-bottom: 1.1rem;
  }

  .case-meta span,
  .feature-pill {
    min-height: 1.7rem;
    padding: 0 0.62rem;
    font-size: 0.7rem;
  }

  .case-title {
    font-size: clamp(2.375rem, 13vw, 3rem);
    line-height: 0.96;
  }

  .case-subtitle {
    margin-top: 0.85rem;
    font-size: clamp(1.375rem, 7vw, 1.75rem);
    line-height: 1.12;
  }

  .case-description {
    margin-top: 0.85rem;
    font-size: 1rem;
    line-height: 1.6;
  }

  .hero-browser {
    margin-top: 0.35rem;
    aspect-ratio: 1.72 / 1;
  }

  .case-section,
  .case-cta {
    padding: 3.5rem 0;
  }

  .detail-card,
  .cta-card {
    padding: 1.25rem;
  }

  .cta-actions,
  .btn-primary,
  .btn-secondary {
    width: 100%;
  }

  .gallery-browser,
  .gallery-grid .gallery-browser:first-child {
    aspect-ratio: 1.72 / 1;
  }

  .gallery-placeholder {
    min-height: 16rem;
  }
}
</style>
