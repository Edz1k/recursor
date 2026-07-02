<script setup lang="ts">
import { Motion } from 'motion-v'
import { CASES, HERO_BADGES, PROCESS_STEPS } from '~/data/cases'

defineOptions({
  name: 'CasesPage',
})

const isDiscussOpen = shallowRef(false)

const SPRING_MEDIUM = { type: 'spring', stiffness: 110, damping: 20 } as const
const SPRING_SNAPPY = { type: 'spring', stiffness: 200, damping: 22 } as const

useHead({
  title: 'Кейсы — Recursor.kz',
})
</script>

<template>
  <main class="cases-page">
    <section class="cases-hero" aria-labelledby="cases-title">
      <div class="cases-container">
        <Motion
          class="cases-hero-inner"
          :initial="{ opacity: 0, y: 34 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="SPRING_MEDIUM"
        >
          <p class="section-kicker">
            Избранные проекты
          </p>
          <h1 id="cases-title" class="cases-title">
            Кейсы Recursor
          </h1>
          <p class="cases-subtitle">
            Показываем не просто сайты, а задачи бизнеса: что хотел клиент, как мы это упаковали и какое решение получилось.
          </p>

          <div class="hero-badges" aria-label="Направления проектов">
            <span v-for="badge in HERO_BADGES" :key="badge" class="hero-badge">
              {{ badge }}
            </span>
          </div>
        </Motion>

        <Motion
          as="article"
          class="recursor-note"
          :initial="{ opacity: 0, y: 26 }"
          :animate="{ opacity: 1, y: 0 }"
          :while-hover="{ y: -4 }"
          :transition="{ ...SPRING_MEDIUM, delay: 0.12 }"
        >
          <div>
            <p class="recursor-note-label">
              RECURSOR — тоже наш проект
            </p>
            <p class="recursor-note-text">
              Этот сайт мы спроектировали и собрали сами: от структуры и визуального стиля до блока услуг, кейсов и контактных сценариев.
            </p>
          </div>
          <span class="recursor-note-mark" aria-hidden="true">R</span>
        </Motion>
      </div>
    </section>

    <section class="cases-section" aria-labelledby="works-title">
      <div class="cases-container">
        <div class="section-heading">
          <p class="section-kicker">
            Примеры работ
          </p>
          <h2 id="works-title" class="section-title">
            Проекты из разных ниш
          </h2>
        </div>

        <div class="cases-grid">
          <Motion
            v-for="(item, index) in CASES"
            :id="item.slug"
            :key="item.slug"
            as="article"
            class="case-card"
            :initial="{ opacity: 0, y: 42 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :while-hover="{ y: -8 }"
            :transition="{ ...SPRING_MEDIUM, delay: index * 0.08 }"
            :viewport="{ once: true, margin: '-40px' }"
          >
            <div class="case-preview">
              <div class="case-browser">
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
              <div v-if="item.previewImages.length" class="case-preview-strip" :aria-label="`Дополнительные скриншоты ${item.title}`">
                <div v-for="preview in item.previewImages" :key="preview.label" class="case-mini-browser">
                  <img :src="preview.image" :alt="preview.label">
                  <span>{{ preview.label }}</span>
                </div>
              </div>
            </div>

            <div class="case-content">
              <div class="case-meta">
                <span>{{ item.category }}</span>
                <span>{{ item.niche }}</span>
              </div>
              <h3 class="case-title">
                {{ item.title }}
              </h3>
              <p class="case-story">
                {{ item.story }}
              </p>

              <div class="case-done">
                <span>Что сделали</span>
                <p>{{ item.done }}</p>
              </div>

              <div class="case-insights">
                <div>
                  <span>Задача</span>
                  <p>{{ item.task }}</p>
                </div>
                <div>
                  <span>Цель</span>
                  <p>{{ item.goal }}</p>
                </div>
              </div>

              <div class="case-tags" aria-label="Теги проекта">
                <span v-for="tag in item.tags" :key="tag" class="case-tag">{{ tag }}</span>
              </div>

              <RouterLink :to="item.route" class="case-link">
                Смотреть кейс
                <span aria-hidden="true">→</span>
              </RouterLink>
            </div>
          </Motion>
        </div>
      </div>
    </section>

    <section class="process-section" aria-labelledby="process-title">
      <div class="cases-container process-inner">
        <div>
          <p class="section-kicker">
            Подход
          </p>
          <h2 id="process-title" class="section-title">
            Как мы работаем над проектом
          </h2>
          <p class="process-text">
            Мы не начинаем с дизайна ради дизайна. Сначала разбираем нишу, задачи клиента и путь пользователя, а потом собираем сайт или систему вокруг понятного результата.
          </p>
        </div>

        <ol class="process-steps" aria-label="Этапы работы">
          <li v-for="(step, index) in PROCESS_STEPS" :key="step" class="process-step">
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
            {{ step }}
          </li>
        </ol>
      </div>
    </section>

    <section class="cases-cta" aria-labelledby="cta-title">
      <div class="cases-container">
        <div class="cta-card">
          <p class="section-kicker">
            Старт
          </p>
          <h2 id="cta-title" class="cta-title">
            Хотите похожий проект?
          </h2>
          <p class="cta-text">
            Разберём вашу задачу, предложим структуру и покажем, как упаковать проект в понятный цифровой продукт.
          </p>
          <Motion
            :while-hover="{ y: -3, scale: 1.04 }"
            :while-tap="{ scale: 0.96 }"
            :transition="SPRING_SNAPPY"
          >
            <button type="button" class="btn-primary" @click="isDiscussOpen = true">
              Обсудить проект
            </button>
          </Motion>
        </div>
      </div>
    </section>

    <ProjectDiscussDialog v-model:open="isDiscussOpen" />
  </main>
</template>

<style scoped>
.cases-page {
  min-height: 100vh;
  background: var(--color-background);
  color: var(--color-foreground);
}

.cases-container {
  width: min(1120px, calc(100% - 2rem));
  margin: 0 auto;
}

.cases-hero {
  padding: 7rem 0 3rem;
  background: radial-gradient(circle at 78% 8%, rgb(130 170 255 / 10%), transparent 28rem), var(--color-background);
}

.cases-hero-inner {
  max-width: 48rem;
}

.section-kicker {
  margin: 0 0 0.8rem;
  color: var(--color-muted);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.cases-title {
  margin: 0;
  color: var(--color-foreground);
  font-size: clamp(3rem, 7vw, 6.5rem);
  font-weight: 900;
  line-height: 0.96;
  letter-spacing: -0.04em;
}

.cases-subtitle {
  max-width: 42rem;
  margin: 1.5rem 0 0;
  color: var(--color-muted-foreground);
  font-size: clamp(1rem, 1.7vw, 1.18rem);
  line-height: 1.75;
}

.hero-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-top: 2rem;
}

.hero-badge,
.case-tag {
  display: inline-flex;
  align-items: center;
  min-height: 1.85rem;
  padding: 0 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background: var(--color-muted-surface);
  color: var(--color-muted-foreground);
  font-size: 0.78rem;
  font-weight: 800;
}

.recursor-note {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  max-width: 56rem;
  margin-top: 3.5rem;
  padding: 1.15rem 1.25rem;
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  background: linear-gradient(135deg, rgb(255 255 255 / 5%), transparent 46%), var(--color-muted-surface);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 5%);
  transition:
    border-color 220ms ease,
    box-shadow 220ms ease;
}

.recursor-note:hover {
  border-color: color-mix(in srgb, var(--color-main) 34%, var(--color-border));
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 8%),
    0 18px 48px rgb(130 170 255 / 8%);
}

.recursor-note-label {
  margin: 0;
  color: var(--color-foreground);
  font-size: 0.95rem;
  font-weight: 900;
  letter-spacing: 0.03em;
}

.recursor-note-text {
  max-width: 42rem;
  margin: 0.35rem 0 0;
  color: var(--color-muted-foreground);
  font-size: 0.92rem;
  line-height: 1.6;
}

.recursor-note-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.35rem;
  height: 2.35rem;
  border: 1px solid var(--color-border);
  border-radius: 0.7rem;
  color: var(--color-muted);
  font-family: 'DM Mono', ui-monospace, monospace;
  font-size: 0.8rem;
  font-weight: 900;
  flex-shrink: 0;
}

.cases-section,
.process-section,
.cases-cta {
  padding: 4.5rem 0;
}

.section-heading {
  margin-bottom: 2rem;
}

.section-title {
  max-width: 42rem;
  margin: 0;
  color: var(--color-foreground);
  font-size: clamp(2rem, 4vw, 3.4rem);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -0.03em;
}

.cases-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.1rem;
}

.case-card {
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(0, 1fr);
  gap: 1.35rem;
  min-height: 100%;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  background: linear-gradient(180deg, rgb(255 255 255 / 4%), transparent 44%), var(--color-background);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 5%);
  transition:
    border-color 220ms ease,
    box-shadow 220ms ease;
}

.case-card:hover,
.case-card:focus-within {
  border-color: color-mix(in srgb, var(--color-main) 40%, var(--color-border));
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 8%),
    0 22px 56px rgb(0 0 0 / 22%);
}

.case-preview {
  min-width: 0;
  padding: 1rem 0 1rem 1rem;
}

.case-browser {
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--color-border) 76%, transparent);
  border-radius: 0.85rem;
  background: rgb(0 0 0 / 22%);
}

.case-preview > .case-browser {
  aspect-ratio: 16 / 10;
}

.case-preview-strip {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr));
  gap: 0.6rem;
  margin-top: 0.75rem;
}

.case-mini-browser {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--color-border) 76%, transparent);
  border-radius: 0.7rem;
  background: rgb(0 0 0 / 22%);
}

.case-mini-browser::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent, rgb(0 0 0 / 52%));
  pointer-events: none;
}

.case-mini-browser img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top left;
  opacity: 0.82;
  filter: brightness(0.72) saturate(0.88);
  transform: scale(1);
  transition: transform 260ms ease;
}

.case-card:hover .case-mini-browser img,
.case-card:focus-within .case-mini-browser img {
  transform: scale(1.045);
}

.case-mini-browser span {
  position: absolute;
  z-index: 1;
  right: 0.55rem;
  bottom: 0.45rem;
  max-width: calc(100% - 1.1rem);
  min-height: 1.35rem;
  padding: 0 0.45rem;
  border: 1px solid rgb(255 255 255 / 14%);
  border-radius: 999px;
  background: rgb(4 8 18 / 72%);
  color: rgb(255 255 255 / 82%);
  font-size: 0.68rem;
  font-weight: 900;
  line-height: 1.35rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  backdrop-filter: blur(10px);
}

.case-browser-bar {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  height: 1.85rem;
  padding: 0 0.75rem;
  border-bottom: 1px solid color-mix(in srgb, var(--color-border) 74%, transparent);
  background: rgb(255 255 255 / 4%);
}

.case-browser-bar span {
  width: 0.42rem;
  height: 0.42rem;
  border-radius: 999px;
  background: rgb(255 255 255 / 28%);
  flex-shrink: 0;
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

.case-screen {
  position: relative;
  height: calc(100% - 1.85rem);
  overflow: hidden;
  background:
    radial-gradient(circle at 20% 10%, rgb(255 255 255 / 18%), transparent 34%),
    linear-gradient(135deg, rgb(130 170 255 / 18%), rgb(127 219 202 / 8%));
}

.case-screen::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgb(0 0 0 / 8%), rgb(0 0 0 / 42%));
  pointer-events: none;
}

.case-screen-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top left;
  opacity: 0.82;
  filter: brightness(0.72) saturate(0.88);
  transform: scale(1);
  transition: transform 260ms ease;
}

.case-card:hover .case-screen-img,
.case-card:focus-within .case-screen-img {
  transform: scale(1.045);
}

.case-content {
  display: flex;
  min-width: 0;
  padding: 1.35rem 1.35rem 1.35rem 0;
  flex-direction: column;
}

.case-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-bottom: 1rem;
}

.case-meta span {
  display: inline-flex;
  min-height: 1.6rem;
  align-items: center;
  padding: 0 0.6rem;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  color: var(--color-muted);
  font-size: 0.68rem;
  font-weight: 900;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.case-title {
  margin: 0;
  color: var(--color-foreground);
  font-size: clamp(1.55rem, 2.2vw, 2.15rem);
  font-weight: 900;
  line-height: 1.02;
  letter-spacing: -0.03em;
}

.case-story {
  margin: 1rem 0 0;
  color: var(--color-muted-foreground);
  font-size: 0.94rem;
  line-height: 1.7;
}

.case-done {
  margin-top: 1rem;
  padding: 0.9rem;
  border: 1px solid var(--color-border);
  border-radius: 0.8rem;
  background: rgb(255 255 255 / 3%);
}

.case-done span {
  color: var(--color-muted);
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.case-done p {
  margin: 0.45rem 0 0;
  color: var(--color-foreground);
  font-size: 0.9rem;
  line-height: 1.58;
}

.case-insights {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.7rem;
  margin-top: 0.7rem;
}

.case-insights div {
  min-width: 0;
  padding: 0.85rem;
  border: 1px solid var(--color-border);
  border-radius: 0.8rem;
  background: var(--color-muted-surface);
}

.case-insights span {
  color: var(--color-muted);
  font-size: 0.68rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.case-insights p {
  display: -webkit-box;
  margin: 0.35rem 0 0;
  overflow: hidden;
  color: var(--color-muted-foreground);
  font-size: 0.84rem;
  line-height: 1.55;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.case-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 1rem;
}

.case-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  width: fit-content;
  margin-top: auto;
  padding-top: 1.25rem;
  color: var(--color-muted);
  font-size: 0.9rem;
  font-weight: 900;
  text-decoration: none;
  opacity: 0.74;
  transition:
    color 220ms ease,
    opacity 220ms ease,
    transform 220ms ease;
}

.case-card:hover .case-link,
.case-card:focus-within .case-link {
  color: var(--color-foreground);
  opacity: 1;
  transform: translateX(2px);
}

.process-section {
  background: var(--color-muted-surface);
}

.process-inner {
  display: grid;
  gap: 2rem;
}

.process-text {
  max-width: 43rem;
  margin: 1.2rem 0 0;
  color: var(--color-muted-foreground);
  font-size: 1rem;
  line-height: 1.75;
}

.process-steps {
  display: grid;
  gap: 1px;
  margin: 0;
  padding: 0;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  background: var(--color-border);
  list-style: none;
}

.process-step {
  display: flex;
  min-height: 4.2rem;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--color-background);
  color: var(--color-foreground);
  font-weight: 900;
}

.process-step span {
  color: var(--color-muted);
  font-family: 'DM Mono', ui-monospace, monospace;
  font-size: 0.72rem;
}

.cta-card {
  display: flex;
  align-items: center;
  padding: 3rem;
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  background:
    radial-gradient(circle at 80% 10%, rgb(127 219 202 / 10%), transparent 24rem),
    linear-gradient(135deg, rgb(255 255 255 / 5%), transparent 48%), var(--color-background);
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

.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 2.875rem;
  padding: 0 1.625rem;
  border: none;
  border-radius: 0.625rem;
  background: var(--color-main);
  color: var(--color-main-foreground);
  font-size: 0.9375rem;
  font-weight: 800;
  cursor: pointer;
  outline: none;
  box-shadow: 0 4px 18px rgb(0 0 0 / 18%);
  will-change: transform;
}

.btn-primary:focus-visible {
  box-shadow: 0 0 0 2px var(--color-ring);
}

@media (min-width: 760px) {
  .process-steps {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1080px) {
  .process-inner {
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    align-items: center;
  }

  .process-steps {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 859px) {
  .case-card {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .case-preview {
    padding: 1rem 1rem 0;
  }

  .case-content {
    padding: 1.25rem;
  }

  .case-insights {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .cases-hero {
    padding: 5rem 0 2.5rem;
  }

  .cases-section,
  .process-section,
  .cases-cta {
    padding: 3.5rem 0;
  }

  .recursor-note {
    align-items: flex-start;
    flex-direction: column;
  }

  .case-preview-strip {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .btn-primary {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .case-screen-img,
  .case-mini-browser img {
    transition: none;
  }
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
