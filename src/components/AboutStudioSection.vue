<script setup lang="ts">
import { useProjectDiscussDialog } from '~/composables/useProjectDiscussDialog'
import { useScrollReveal } from '~/composables/useScrollReveal'
import { ABOUT_FOCUS, ABOUT_PRINCIPLES, ABOUT_STACK, ABOUT_STATS, ABOUT_TIMELINE } from '~/data/about'

const { isDiscussOpen, openDiscussDialog } = useProjectDiscussDialog()

useScrollReveal()
</script>

<template>
  <main class="about-page">
    <section class="about-studio" aria-labelledby="about-title">
      <div class="about-grid" aria-hidden="true" />
      <div class="about-glow about-glow-one" aria-hidden="true" />
      <div class="about-glow about-glow-two" aria-hidden="true" />

      <div class="about-container">
        <div class="about-hero">
          <div class="about-copy">
            <p class="about-kicker" data-reveal>
              О нас
            </p>
            <h1 id="about-title" class="about-title" data-reveal style="--reveal-delay: 80ms">
              Собираем сайты, которые выглядят дорого и работают понятно.
            </h1>
            <p class="about-description" data-reveal style="--reveal-delay: 160ms">
              Recursor.kz делает лендинги, сайты и интерфейсы для бизнеса. Мы соединяем структуру, визуальный стиль и разработку так, чтобы каждый экран вел к действию.
            </p>

            <div class="about-focus" data-reveal style="--reveal-delay: 220ms" aria-label="Что делаем">
              <span v-for="item in ABOUT_FOCUS" :key="item">{{ item }}</span>
            </div>
          </div>

          <aside class="approach-card" data-reveal style="--reveal-delay: 260ms" aria-label="Подход Recursor">
            <div class="approach-card-head">
              <p class="approach-label">
                Recursor method
              </p>
              <span class="approach-chip">product view</span>
            </div>
            <h2>Не просто сайт, а цифровая точка входа в бизнес.</h2>
            <p>
              Смотрим на проект как на продукт: первый экран, доверие, заявка, скорость и дальнейшее развитие.
            </p>

            <div class="approach-stack" aria-label="Из чего состоит подход">
              <div v-for="(item, index) in ABOUT_STACK" :key="item.title" class="approach-stack-item">
                <span>0{{ index + 1 }}</span>
                <div>
                  <strong>{{ item.title }}</strong>
                  <p>{{ item.text }}</p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div class="stats-row" aria-label="Технологические акценты">
          <div
            v-for="(stat, index) in ABOUT_STATS"
            :key="stat.value"
            class="stat-card"
            data-reveal
            :style="{ '--reveal-delay': `${260 + index * 90}ms` }"
          >
            <strong>{{ stat.value }}</strong>
            <span>{{ stat.label }}</span>
          </div>
        </div>

        <section class="principles-section" aria-labelledby="principles-title">
          <div class="section-heading" data-reveal>
            <p>Принципы</p>
            <h2 id="principles-title">
              Сайт должен выглядеть дорого, но работать просто.
            </h2>
          </div>

          <div class="principles-grid">
            <article
              v-for="(principle, index) in ABOUT_PRINCIPLES"
              :key="principle.title"
              class="principle-card"
              data-reveal
              :style="{ '--reveal-delay': `${index * 90}ms` }"
            >
              <span class="principle-number">0{{ index + 1 }}</span>
              <h3>{{ principle.title }}</h3>
              <p>{{ principle.text }}</p>
            </article>
          </div>
        </section>

        <section class="process-section" aria-labelledby="process-title">
          <div class="section-heading compact" data-reveal>
            <p>Процесс</p>
            <h2 id="process-title">
              Быстрый путь от идеи до релиза.
            </h2>
          </div>

          <ol class="timeline-list">
            <li
              v-for="(item, index) in ABOUT_TIMELINE"
              :key="item"
              class="timeline-item"
              data-reveal
              :style="{ '--reveal-delay': `${index * 80}ms` }"
            >
              <span class="timeline-index">0{{ index + 1 }}</span>
              <span class="timeline-dot" aria-hidden="true" />
              <span class="timeline-label">{{ item }}</span>
            </li>
          </ol>
        </section>

        <div class="about-cta" data-reveal>
          <p>
            Обсудим, как ваш сайт должен продавать?
          </p>
          <button type="button" class="about-cta-button" @click="openDiscussDialog">
            Договориться о брифе
          </button>
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
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding: clamp(4rem, 7vw, 6.5rem) 0 clamp(4.5rem, 8vw, 7rem);
  background:
    radial-gradient(circle at 18% 12%, rgb(130 170 255 / 13%), transparent 31%),
    radial-gradient(circle at 78% 22%, rgb(127 219 202 / 11%), transparent 30%),
    linear-gradient(180deg, var(--color-muted-surface), var(--color-background) 42%, var(--color-background));
}

.about-grid {
  position: absolute;
  inset: 0;
  z-index: -3;
  pointer-events: none;
  background-image:
    linear-gradient(rgb(255 255 255 / 5%) 1px, transparent 1px),
    linear-gradient(90deg, rgb(255 255 255 / 5%) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: radial-gradient(circle at 50% 22%, #000 0, transparent 72%);
}

:global(html:not(.dark)) .about-grid {
  background-image:
    linear-gradient(rgb(0 0 0 / 6%) 1px, transparent 1px), linear-gradient(90deg, rgb(0 0 0 / 6%) 1px, transparent 1px);
}

.about-glow {
  position: absolute;
  z-index: -2;
  width: clamp(14rem, 28vw, 28rem);
  aspect-ratio: 1;
  border-radius: 999px;
  filter: blur(42px);
  opacity: 0.34;
  pointer-events: none;
}

.about-glow-one {
  top: 6rem;
  right: -6rem;
  background: rgb(130 170 255 / 46%);
}

.about-glow-two {
  bottom: 10rem;
  left: -8rem;
  background: rgb(195 232 141 / 28%);
}

.about-container {
  width: min(1180px, calc(100% - 2rem));
  margin: 0 auto;
}

.about-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.95fr);
  gap: clamp(2rem, 5vw, 4.5rem);
  align-items: center;
}

.about-copy {
  max-width: 760px;
}

.about-kicker,
.section-heading p,
.approach-label {
  margin: 0;
  color: var(--color-muted);
  font-size: 0.75rem;
  font-weight: 850;
  letter-spacing: 0;
  text-transform: uppercase;
}

.about-kicker {
  width: fit-content;
  margin-bottom: 1.15rem;
  padding: 0.42rem 0.72rem;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background: rgb(255 255 255 / 6%);
  backdrop-filter: blur(12px);
}

:global(html:not(.dark)) .about-kicker {
  background: rgb(255 255 255 / 72%);
}

.about-title {
  max-width: 760px;
  margin: 0;
  color: var(--color-foreground);
  font-size: clamp(2.8rem, 6vw, 5.9rem);
  font-weight: 950;
  line-height: 0.98;
  letter-spacing: 0;
}

.about-description {
  max-width: 620px;
  margin: 1.35rem 0 0;
  color: var(--color-muted-foreground);
  font-size: clamp(1rem, 1.35vw, 1.12rem);
  line-height: 1.68;
}

.about-focus {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin-top: 1.5rem;
}

.about-focus span {
  display: inline-flex;
  min-height: 2rem;
  align-items: center;
  border: 1px solid color-mix(in srgb, var(--color-border) 82%, transparent);
  border-radius: 999px;
  background: color-mix(in srgb, var(--color-surface) 60%, transparent);
  color: var(--color-muted-foreground);
  font-size: 0.78rem;
  font-weight: 850;
  padding: 0 0.78rem;
  backdrop-filter: blur(12px);
}

.approach-card {
  position: relative;
  overflow: hidden;
  min-height: 0;
  padding: clamp(1.35rem, 3vw, 2rem);
  border: 1px solid color-mix(in srgb, var(--color-border) 82%, transparent);
  border-radius: 1.25rem;
  background:
    radial-gradient(circle at 18% 0%, rgb(255 255 255 / 14%), transparent 34%),
    linear-gradient(145deg, rgb(255 255 255 / 12%), rgb(255 255 255 / 3%)),
    color-mix(in srgb, var(--color-surface) 72%, transparent);
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 10%),
    0 30px 80px rgb(0 0 0 / 24%);
  backdrop-filter: blur(18px);
  transition:
    transform 320ms cubic-bezier(0.16, 1, 0.3, 1),
    border-color 320ms ease,
    box-shadow 320ms ease;
}

.approach-card::before {
  position: absolute;
  inset: 0;
  pointer-events: none;
  content: '';
  background:
    linear-gradient(90deg, rgb(255 255 255 / 5%) 1px, transparent 1px),
    linear-gradient(rgb(255 255 255 / 5%) 1px, transparent 1px);
  background-size: 3.4rem 3.4rem;
  mask-image: linear-gradient(135deg, #000, transparent 72%);
  opacity: 0.42;
}

.approach-card:hover,
.approach-card:focus-within {
  border-color: color-mix(in srgb, var(--color-main) 34%, var(--color-border));
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 14%),
    0 34px 96px rgb(0 0 0 / 30%),
    0 0 42px color-mix(in srgb, var(--color-main) 11%, transparent);
  transform: translateY(-6px);
}

.approach-card-head {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.approach-card h2 {
  position: relative;
  margin: 2.8rem 0 1rem;
  color: var(--color-foreground);
  font-size: clamp(1.55rem, 2.2vw, 2.2rem);
  font-weight: 900;
  line-height: 1.08;
  letter-spacing: 0;
}

.approach-card p:not(.approach-label) {
  position: relative;
  margin: 0;
  color: var(--color-muted-foreground);
  font-size: 0.98rem;
  line-height: 1.72;
}

.approach-chip {
  position: relative;
  display: inline-flex;
  min-height: 1.9rem;
  align-items: center;
  border: 1px solid color-mix(in srgb, var(--color-main) 18%, var(--color-border));
  border-radius: 999px;
  background: color-mix(in srgb, var(--color-main) 8%, transparent);
  color: var(--color-foreground);
  font-size: 0.72rem;
  font-weight: 850;
  padding: 0 0.7rem;
}

.approach-stack {
  position: relative;
  display: grid;
  gap: 0.65rem;
  margin-top: 1.45rem;
}

.approach-stack-item {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.75rem;
  align-items: start;
  border: 1px solid color-mix(in srgb, var(--color-border) 78%, transparent);
  border-radius: 0.8rem;
  background: color-mix(in srgb, var(--color-background) 36%, transparent);
  padding: 0.9rem;
}

.approach-stack-item > span {
  color: var(--color-muted);
  font-family: 'DM Mono', ui-monospace, monospace;
  font-size: 0.7rem;
  font-weight: 850;
}

.approach-stack-item strong {
  display: block;
  color: var(--color-foreground);
  font-size: 0.98rem;
  line-height: 1.2;
}

.approach-stack-item p {
  margin-top: 0.25rem !important;
  font-size: 0.88rem !important;
  line-height: 1.5 !important;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin-top: clamp(1.75rem, 4vw, 3.25rem);
}

.stat-card,
.principle-card,
.timeline-item {
  border: 1px solid var(--color-border);
  background:
    linear-gradient(180deg, rgb(255 255 255 / 6%), transparent 58%),
    color-mix(in srgb, var(--color-surface) 76%, transparent);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 6%);
  backdrop-filter: blur(14px);
  transition:
    transform 280ms cubic-bezier(0.16, 1, 0.3, 1),
    border-color 280ms ease,
    background-color 280ms ease,
    box-shadow 280ms ease;
}

.stat-card:hover,
.principle-card:hover,
.timeline-item:hover {
  border-color: color-mix(in srgb, var(--color-main) 30%, var(--color-border));
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 10%),
    0 20px 54px rgb(0 0 0 / 18%);
  transform: translateY(-5px);
}

.stat-card {
  display: grid;
  gap: 0.4rem;
  min-height: 6.4rem;
  align-content: center;
  border-radius: 1rem;
  padding: 1.15rem;
}

.stat-card strong {
  color: var(--color-foreground);
  font-size: clamp(1.45rem, 2.4vw, 2.25rem);
  font-weight: 950;
  line-height: 1;
}

.stat-card span {
  color: var(--color-muted-foreground);
  font-size: 0.95rem;
  line-height: 1.35;
}

.principles-section,
.process-section {
  margin-top: clamp(3.5rem, 6vw, 5.5rem);
}

.section-heading {
  display: grid;
  max-width: 760px;
  gap: 0.9rem;
  margin-bottom: clamp(1.5rem, 3vw, 2.25rem);
}

.section-heading.compact {
  max-width: 620px;
}

.section-heading h2 {
  margin: 0;
  color: var(--color-foreground);
  font-size: clamp(1.85rem, 3.6vw, 3.65rem);
  font-weight: 950;
  line-height: 1.05;
  letter-spacing: 0;
}

.principles-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
}

.principle-card {
  position: relative;
  overflow: hidden;
  min-height: 15.5rem;
  border-radius: 1rem;
  padding: 1.35rem;
}

.principle-card::before {
  position: absolute;
  top: -4rem;
  right: -4rem;
  width: 9rem;
  height: 9rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--color-main) 10%, transparent);
  content: '';
}

.principle-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border: 1px solid var(--color-border);
  border-radius: 0.7rem;
  color: var(--color-muted);
  font-family: 'DM Mono', ui-monospace, monospace;
  font-size: 0.72rem;
  font-weight: 850;
}

.principle-card h3 {
  margin: 2.25rem 0 0.75rem;
  color: var(--color-foreground);
  font-size: 1.08rem;
  font-weight: 900;
  line-height: 1.18;
}

.principle-card p {
  margin: 0;
  color: var(--color-muted-foreground);
  font-size: 0.9rem;
  line-height: 1.58;
}

.timeline-list {
  position: relative;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 1px;
  margin: 0;
  padding: 0;
  border: 1px solid var(--color-border);
  border-radius: 1.15rem;
  background: var(--color-border);
  list-style: none;
  overflow: hidden;
}

.timeline-list::before {
  position: absolute;
  z-index: 2;
  top: 3.25rem;
  right: 2rem;
  left: 2rem;
  height: 1px;
  background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-main) 54%, transparent), transparent);
  content: '';
  pointer-events: none;
}

.timeline-item {
  position: relative;
  z-index: 1;
  display: grid;
  min-height: 8.6rem;
  gap: 0.65rem;
  align-content: start;
  border: 0;
  border-radius: 0;
  padding: 1.2rem;
}

.timeline-index {
  color: var(--color-muted);
  font-family: 'DM Mono', ui-monospace, monospace;
  font-size: 0.72rem;
  font-weight: 850;
}

.timeline-dot {
  position: relative;
  z-index: 3;
  width: 0.72rem;
  height: 0.72rem;
  border: 2px solid var(--color-background);
  border-radius: 999px;
  background: var(--color-main);
  box-shadow:
    0 0 0 1px var(--color-border),
    0 0 18px color-mix(in srgb, var(--color-main) 36%, transparent);
}

.timeline-label {
  color: var(--color-foreground);
  font-size: 1rem;
  font-weight: 850;
  line-height: 1.35;
}

.about-cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  margin-top: clamp(3rem, 6vw, 5rem);
  border: 1px solid color-mix(in srgb, var(--color-border) 86%, transparent);
  border-radius: 1.25rem;
  padding: clamp(1.2rem, 3vw, 2rem);
  background:
    radial-gradient(circle at 18% 50%, color-mix(in srgb, var(--color-main) 12%, transparent), transparent 36%),
    linear-gradient(135deg, rgb(255 255 255 / 10%), rgb(255 255 255 / 3%)),
    color-mix(in srgb, var(--color-surface) 76%, transparent);
  backdrop-filter: blur(16px);
}

.about-cta p {
  max-width: 520px;
  margin: 0;
  color: var(--color-foreground);
  font-size: clamp(1.18rem, 2.1vw, 1.8rem);
  font-weight: 900;
  line-height: 1.15;
}

.about-cta-button {
  display: inline-flex;
  min-height: 3.25rem;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1px solid color-mix(in srgb, var(--color-main) 18%, transparent);
  border-radius: 0.85rem;
  background: var(--color-main);
  color: var(--color-main-foreground);
  cursor: pointer;
  font: inherit;
  font-size: 0.98rem;
  font-weight: 850;
  padding: 0 1.35rem;
  outline: none;
  box-shadow: 0 14px 34px rgb(0 0 0 / 18%);
  transition:
    transform 260ms cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 260ms ease,
    background-color 260ms ease,
    color 260ms ease;
}

.about-cta-button:hover,
.about-cta-button:focus-visible {
  box-shadow:
    0 18px 44px rgb(0 0 0 / 22%),
    0 0 26px color-mix(in srgb, var(--color-main) 16%, transparent);
  transform: translateY(-3px);
}

.about-cta-button:focus-visible {
  box-shadow:
    0 0 0 2px var(--color-ring),
    0 18px 44px rgb(0 0 0 / 22%);
}

[data-reveal] {
  opacity: 0;
  transform: translateY(24px);
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
  .about-hero {
    grid-template-columns: 1fr;
  }

  .approach-card {
    min-height: auto;
  }

  .principles-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .timeline-list {
    grid-template-columns: 1fr;
  }

  .timeline-list::before {
    top: 1.5rem;
    right: auto;
    bottom: 1.5rem;
    left: 2rem;
    width: 1px;
    height: auto;
    background: linear-gradient(
      180deg,
      transparent,
      color-mix(in srgb, var(--color-main) 46%, transparent),
      transparent
    );
  }

  .timeline-item {
    min-height: auto;
    grid-template-columns: auto auto 1fr;
    align-items: center;
  }
}

@media (max-width: 640px) {
  .about-studio {
    padding-top: 3.75rem;
  }

  .stats-row,
  .principles-grid {
    grid-template-columns: 1fr;
  }

  .principle-card {
    min-height: auto;
  }

  .principle-card h3 {
    margin-top: 2rem;
  }

  .about-cta {
    align-items: stretch;
    flex-direction: column;
  }

  .about-cta-button {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  [data-reveal] {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .approach-card,
  .stat-card,
  .principle-card,
  .timeline-item,
  .about-cta-button {
    transition: none;
  }

  .approach-card:hover,
  .approach-card:focus-within,
  .stat-card:hover,
  .principle-card:hover,
  .timeline-item:hover,
  .about-cta-button:hover,
  .about-cta-button:focus-visible {
    transform: none;
  }
}
</style>
