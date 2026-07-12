<script setup lang="ts">
import { isDark } from '~/composables/dark'
import { useProjectDiscussDialog } from '~/composables/useProjectDiscussDialog'
import { useScrollReveal } from '~/composables/useScrollReveal'

const trustPoints = [
  'Структура перед дизайном',
  'Прозрачный процесс',
  'Фокус на заявках и доверии',
] as const

const methodSteps = [
  {
    num: '01',
    title: 'Диагностика',
    text: 'Разбираем бизнес, аудиторию и цель сайта.',
  },
  {
    num: '02',
    title: 'Структура',
    text: 'Собираем путь пользователя и ключевые блоки.',
  },
  {
    num: '03',
    title: 'Визуал',
    text: 'Делаем интерфейс чистым, доверительным и живым.',
  },
  {
    num: '04',
    title: 'Запуск',
    text: 'Готовим адаптив, скорость и понятную заявку.',
  },
] as const

const checklist = ['Бриф', 'UX', 'UI', 'Разработка', 'Запуск'] as const

const { isDiscussOpen, openDiscussDialog } = useProjectDiscussDialog()

useScrollReveal()
</script>

<template>
  <main class="about-page">
    <section class="about-studio" :data-theme="isDark ? 'dark' : 'light'" aria-labelledby="about-title">
      <div class="about-bg-grid" aria-hidden="true" />

      <div class="about-container">
        <div class="about-layout">
          <div class="about-copy">
            <p class="about-kicker" data-reveal>
              О НАС
            </p>

            <h1 id="about-title" class="about-title" data-reveal style="--reveal-delay: 80ms">
              Собираем сайты как цифровые продукты
            </h1>

            <p class="about-description" data-reveal style="--reveal-delay: 160ms">
              Мы не просто рисуем страницы. Мы проектируем структуру, доверие и путь клиента от первого экрана до заявки.
            </p>

            <ul class="trust-list" data-reveal style="--reveal-delay: 220ms" aria-label="Почему нам доверяют">
              <li v-for="item in trustPoints" :key="item">
                <span class="trust-dot" aria-hidden="true" />
                {{ item }}
              </li>
            </ul>

            <button
              type="button"
              class="about-action"
              data-reveal
              style="--reveal-delay: 280ms"
              @click="openDiscussDialog"
            >
              Договориться о брифе
            </button>
          </div>

          <aside class="planner-card" data-reveal style="--reveal-delay: 180ms" aria-label="Подход Recursor">
            <div class="planner-header">
              <div>
                <p class="planner-eyebrow">
                  Метод Recursor
                </p>
                <h2>Проектная доска</h2>
                <p class="planner-description">
                  Показываем, как превращаем задачу в понятный цифровой продукт.
                </p>
              </div>
            </div>

            <div class="planner-meta" aria-label="Основа и этапы проекта">
              <div class="project-foundation">
                <span class="meta-label">Основа проекта</span>
                <strong>Структура, путь клиента и ключевое действие</strong>
              </div>

              <div class="checklist" aria-label="Этапы готовности">
                <span class="meta-label">Процесс</span>
                <div class="checklist-items">
                  <span v-for="item in checklist" :key="item">
                    {{ item }}
                  </span>
                </div>
              </div>
            </div>

            <ol class="method-list">
              <li
                v-for="(step, index) in methodSteps"
                :key="step.num"
                class="method-step"
                data-reveal
                :style="{ '--reveal-delay': `${280 + index * 90}ms` }"
              >
                <span class="method-num">{{ step.num }}</span>
                <span class="method-content">
                  <strong>{{ step.title }}</strong>
                  <span>{{ step.text }}</span>
                </span>
              </li>
            </ol>
          </aside>
        </div>
      </div>
    </section>

    <ProjectDiscussDialog v-model:open="isDiscussOpen" />
  </main>
</template>

<style scoped>
.about-page {
  min-height: 60vh;
  background: var(--color-background);
  color: var(--color-foreground);
}

.about-studio {
  --about-bg: #f6f7fb;
  --about-text: #10141b;
  --about-muted: #5d6675;
  --about-card: rgb(255 255 255 / 82%);
  --about-card-strong: rgb(255 255 255 / 92%);
  --about-border: rgb(15 23 42 / 10%);
  --about-border-strong: rgb(15 23 42 / 14%);
  --about-soft: rgb(15 23 42 / 5%);
  --about-soft-strong: rgb(15 23 42 / 8%);
  --about-accent: #4f7ddf;
  --about-accent-soft: rgb(79 125 223 / 16%);
  --about-shadow: 0 28px 84px rgb(25 34 52 / 14%);
  --about-card-shadow: 0 28px 86px rgb(25 34 52 / 18%), inset 0 1px 0 rgb(255 255 255 / 70%);

  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding: clamp(4.5rem, 8vw, 7rem) 0;
  background: var(--about-bg);
  color: var(--about-text);
  color-scheme: light;
}

@media (prefers-color-scheme: dark) {
  .about-studio {
    --about-bg: #09090b;
    --about-text: #f7fafc;
    --about-muted: #a7b0bf;
    --about-card: rgb(255 255 255 / 7%);
    --about-card-strong: rgb(255 255 255 / 10%);
    --about-border: rgb(255 255 255 / 11%);
    --about-border-strong: rgb(255 255 255 / 16%);
    --about-soft: rgb(255 255 255 / 5%);
    --about-soft-strong: rgb(255 255 255 / 8%);
    --about-accent: #8fb7ff;
    --about-accent-soft: rgb(143 183 255 / 13%);
    --about-shadow: 0 30px 90px rgb(0 0 0 / 32%);
    --about-card-shadow: 0 30px 92px rgb(0 0 0 / 34%), inset 0 1px 0 rgb(255 255 255 / 12%);

    color-scheme: dark;
  }
}

:global(html:not(.dark)) .about-studio,
.about-studio[data-theme='light'] {
  --about-bg: #f6f7fb;
  --about-text: #10141b;
  --about-muted: #5d6675;
  --about-card: rgb(255 255 255 / 82%);
  --about-card-strong: rgb(255 255 255 / 92%);
  --about-border: rgb(15 23 42 / 10%);
  --about-border-strong: rgb(15 23 42 / 14%);
  --about-soft: rgb(15 23 42 / 5%);
  --about-soft-strong: rgb(15 23 42 / 8%);
  --about-accent: #4f7ddf;
  --about-accent-soft: rgb(79 125 223 / 16%);
  --about-shadow: 0 28px 84px rgb(25 34 52 / 14%);
  --about-card-shadow: 0 28px 86px rgb(25 34 52 / 18%), inset 0 1px 0 rgb(255 255 255 / 70%);

  color-scheme: light;
}

:global(html:not(.dark)) .about-studio {
  color-scheme: light;
}

:global(html.dark) .about-studio,
.about-studio[data-theme='dark'] {
  --about-bg: #09090b;
  --about-text: #f7fafc;
  --about-muted: #a7b0bf;
  --about-card: rgb(255 255 255 / 7%);
  --about-card-strong: rgb(255 255 255 / 10%);
  --about-border: rgb(255 255 255 / 11%);
  --about-border-strong: rgb(255 255 255 / 16%);
  --about-soft: rgb(255 255 255 / 5%);
  --about-soft-strong: rgb(255 255 255 / 8%);
  --about-accent: #8fb7ff;
  --about-accent-soft: rgb(143 183 255 / 13%);
  --about-shadow: 0 30px 90px rgb(0 0 0 / 32%);
  --about-card-shadow: 0 30px 92px rgb(0 0 0 / 34%), inset 0 1px 0 rgb(255 255 255 / 12%);

  color-scheme: dark;
}

:global(html.dark) .about-studio {
  color-scheme: dark;
}

.about-studio::before {
  position: absolute;
  inset: 0;
  content: '';
  pointer-events: none;
}

.about-studio::before {
  z-index: -3;
  border-block: 1px solid var(--about-border);
}

.about-bg-grid {
  position: absolute;
  z-index: -2;
  inset: -20% -10% 0;
  pointer-events: none;
  opacity: 0.08;
  background-image:
    linear-gradient(var(--about-border-strong) 1px, transparent 1px),
    linear-gradient(90deg, var(--about-border-strong) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: linear-gradient(90deg, transparent, #000 24%, #000 78%, transparent);
  transform: perspective(900px) rotateX(58deg) scale(1.15);
  transform-origin: 50% 0;
}

.about-container {
  width: min(1180px, calc(100% - 2rem));
  margin: 0 auto;
}

.about-layout {
  display: grid;
  grid-template-columns: minmax(0, 0.82fr) minmax(28rem, 1.18fr);
  gap: clamp(2.5rem, 6vw, 5.5rem);
  align-items: center;
}

.about-copy {
  max-width: 33rem;
}

.about-kicker {
  display: inline-flex;
  min-height: 2rem;
  align-items: center;
  margin: 0 0 1.15rem;
  padding: 0 0.78rem;
  border: 1px solid var(--about-border);
  border-radius: 999px;
  background: var(--about-card);
  color: var(--about-muted);
  font-size: 0.72rem;
  font-weight: 850;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  backdrop-filter: blur(18px);
}

.about-title {
  max-width: 32rem;
  margin: 0;
  color: var(--about-text);
  font-size: clamp(2.45rem, 5vw, 5.1rem);
  font-weight: 950;
  letter-spacing: 0;
  line-height: 1;
  text-wrap: balance;
}

.about-description {
  max-width: 30rem;
  margin: 1.35rem 0 0;
  color: var(--about-muted);
  font-size: clamp(1rem, 1.25vw, 1.08rem);
  line-height: 1.72;
  text-wrap: pretty;
}

.trust-list {
  display: grid;
  gap: 0.68rem;
  margin: 1.55rem 0 0;
  padding: 0;
  color: var(--about-text);
  font-size: 0.94rem;
  font-weight: 800;
  list-style: none;
}

.trust-list li {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.trust-dot {
  width: 0.48rem;
  height: 0.48rem;
  border-radius: 999px;
  background: var(--about-accent);
  box-shadow: 0 0 18px var(--about-accent-soft);
  flex-shrink: 0;
}

.about-action {
  display: inline-flex;
  min-height: 3rem;
  align-items: center;
  justify-content: center;
  margin-top: 1.8rem;
  padding: 0 1.15rem;
  border: 1px solid var(--about-border-strong);
  border-radius: 0.85rem;
  background: var(--about-text);
  box-shadow: var(--about-shadow);
  color: var(--about-bg);
  cursor: pointer;
  font: inherit;
  font-size: 0.92rem;
  font-weight: 850;
  outline: none;
  transition:
    transform 260ms cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 260ms ease,
    opacity 260ms ease;
}

.about-action:hover,
.about-action:focus-visible {
  opacity: 0.92;
  transform: translateY(-3px);
}

.about-action:focus-visible {
  box-shadow:
    0 0 0 2px var(--about-accent),
    var(--about-shadow);
}

.planner-card {
  position: relative;
  overflow: hidden;
  padding: clamp(1.25rem, 2.2vw, 1.75rem);
  border: 1px solid var(--about-border-strong);
  border-radius: 1.35rem;
  background: linear-gradient(145deg, var(--about-card-strong), var(--about-card));
  box-shadow: var(--about-card-shadow);
  backdrop-filter: blur(18px);
}

.planner-card::before {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(135deg, rgb(255 255 255 / 5%), transparent 42%);
  content: '';
  pointer-events: none;
}

.planner-header,
.planner-meta,
.method-list {
  position: relative;
  z-index: 1;
}

.planner-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.35rem;
}

.planner-eyebrow {
  margin: 0 0 0.4rem;
  color: var(--about-muted);
  font-size: 0.7rem;
  font-weight: 850;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.planner-header h2 {
  margin: 0;
  color: var(--about-text);
  font-size: clamp(1.42rem, 2.5vw, 2.12rem);
  font-weight: 920;
  line-height: 1.08;
}

.planner-description {
  max-width: 31rem;
  margin: 0.75rem 0 0;
  color: var(--about-muted);
  font-size: 0.92rem;
  line-height: 1.55;
}

.planner-meta {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.project-foundation,
.checklist {
  border: 1px solid var(--about-border);
  border-radius: 1rem;
  background: var(--about-soft);
}

.project-foundation {
  display: grid;
  align-content: center;
  min-height: 5.2rem;
  gap: 0.5rem;
  padding: 0.9rem;
}

.meta-label {
  color: var(--about-muted);
  font-size: 0.68rem;
  font-weight: 850;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.project-foundation strong {
  color: var(--about-text);
  font-size: 0.9rem;
  font-weight: 850;
  line-height: 1.4;
}

.checklist {
  display: grid;
  align-content: center;
  min-height: 5.2rem;
  gap: 0.55rem;
  padding: 0.9rem;
}

.checklist-items {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem 0;
}

.checklist-items > span {
  display: inline-flex;
  align-items: center;
  color: var(--about-muted);
  font-size: 0.78rem;
  font-weight: 800;
}

.checklist-items > span:not(:last-child)::after {
  margin: 0 0.42rem;
  color: var(--about-border-strong);
  content: '/';
}

.method-list {
  position: relative;
  display: grid;
  gap: 0.55rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.method-list::before {
  position: absolute;
  top: 1.2rem;
  bottom: 1.2rem;
  left: 1.22rem;
  width: 1px;
  background: linear-gradient(180deg, transparent, var(--about-border-strong), transparent);
  content: '';
}

.method-step {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.76rem;
  align-items: center;
  min-height: 4.05rem;
  padding: 0.72rem 0.82rem;
  border: 1px solid var(--about-border);
  border-radius: 1rem;
  background: color-mix(in srgb, var(--about-card) 58%, transparent);
}

.method-num {
  position: relative;
  z-index: 1;
  display: inline-flex;
  width: 2.38rem;
  height: 2.38rem;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--about-border-strong);
  border-radius: 0.82rem;
  background: var(--about-card);
  color: var(--about-text);
  font-family: 'DM Mono', ui-monospace, monospace;
  font-size: 0.72rem;
  font-weight: 850;
  font-variant-numeric: tabular-nums;
}

.method-content {
  display: grid;
  gap: 0.18rem;
}

.method-content strong {
  color: var(--about-text);
  font-size: 0.98rem;
  font-weight: 900;
  line-height: 1.18;
}

.method-content span {
  color: var(--about-muted);
  font-size: 0.84rem;
  line-height: 1.45;
}

[data-reveal] {
  opacity: 0;
  transform: translateY(22px);
  transition:
    opacity 720ms ease,
    transform 720ms cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: var(--reveal-delay, 0ms);
  will-change: opacity, transform;
}

[data-reveal].is-revealed {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 980px) {
  .about-layout {
    grid-template-columns: 1fr;
  }

  .about-copy {
    max-width: 42rem;
  }

  .about-title,
  .about-description {
    max-width: 40rem;
  }

  .planner-card {
    max-width: 45rem;
  }
}

@media (max-width: 640px) {
  .about-studio {
    padding: 4rem 0;
  }

  .about-bg-grid {
    opacity: 0.055;
    background-size: 54px 54px;
    transform: perspective(760px) rotateX(48deg) scale(1.08);
  }

  .about-title {
    font-size: clamp(2.35rem, 12vw, 3.55rem);
  }

  .planner-card {
    padding: 1rem;
    border-radius: 1.1rem;
  }

  .planner-header,
  .planner-meta {
    grid-template-columns: 1fr;
  }

  .planner-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .method-step {
    min-height: auto;
    align-items: start;
    padding: 0.75rem;
  }

  .method-list::before {
    left: 1.12rem;
  }

  .method-num {
    width: 2.25rem;
    height: 2.25rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  [data-reveal] {
    opacity: 1;
    transform: none;
    transition: none;
    will-change: auto;
  }

  .about-action {
    transition: none;
  }

  .about-action:hover,
  .about-action:focus-visible {
    transform: none;
  }
}
</style>
