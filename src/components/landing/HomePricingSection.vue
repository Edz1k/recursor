<script setup lang="ts">
const pricingItems = [
  {
    index: '01',
    title: 'Лендинг / сайт-визитка',
    price: 'от 120 000 ₸',
    description: 'Компактный сайт для презентации компании, услуги, продукта или рекламного предложения.',
    features: ['Индивидуальная структура', 'Адаптивный интерфейс', 'Форма обратной связи', 'Базовые анимации', 'Подготовка к запуску'],
    note: 'Для быстрого и выразительного запуска проекта.',
  },
  {
    index: '02',
    title: 'Многостраничный сайт',
    price: 'от 200 000 ₸',
    description: 'Полноценный сайт для бизнеса с несколькими разделами, услугами, кейсами и информацией о компании.',
    features: ['Проработка структуры страниц', 'Индивидуальный UI/UX', 'Адаптивная разработка', 'Формы и базовые интеграции', 'Базовая SEO-подготовка'],
    note: 'Для полноценного представления компании в интернете.',
  },
  {
    index: '03',
    title: 'Сложный проект',
    price: 'от 250 000 ₸',
    badge: 'Индивидуальный расчёт',
    description: 'Нестандартные сайты, каталоги, сервисы, личные кабинеты и проекты со сложной логикой.',
    features: ['Проектирование пользовательских сценариев', 'Нестандартный функционал', 'Сторонние интеграции', 'Сложные интерфейсы', 'Индивидуальная архитектура'],
    note: 'Стоимость определяется после анализа задач и необходимого функционала.',
  },
] as const

const priceFactors = ['Объём страниц', 'Сложность дизайна', 'Функционал и интеграции', 'Готовность материалов'] as const

useScrollReveal({ selector: '[data-pricing-reveal]', threshold: 0.12 })
</script>

<template>
  <section class="pricing-section" aria-labelledby="pricing-title">
    <span class="pricing-watermark" aria-hidden="true">PRICING</span>

    <div class="pricing-container">
      <header class="pricing-header" data-pricing-reveal>
        <p class="pricing-kicker">
          Стоимость разработки
        </p>
        <h2 id="pricing-title" class="pricing-title">
          Ориентиры по стоимости
        </h2>
        <p class="pricing-intro">
          Каждый проект рассчитывается индивидуально. Ниже указаны примерные стартовые суммы, чтобы вы заранее понимали порядок бюджета на разработку.
        </p>
      </header>

      <ul class="pricing-grid">
        <li
          v-for="item in pricingItems"
          :key="item.index"
          class="pricing-card"
          data-pricing-reveal
        >
          <div class="pricing-card-head">
            <span class="pricing-index">{{ item.index }}</span>
            <span v-if="'badge' in item" class="pricing-badge">{{ item.badge }}</span>
          </div>

          <h3 class="pricing-card-title">
            {{ item.title }}
          </h3>
          <p class="pricing-price">
            {{ item.price }}
          </p>
          <p class="pricing-description">
            {{ item.description }}
          </p>

          <ul class="pricing-features">
            <li v-for="feature in item.features" :key="feature">
              {{ feature }}
            </li>
          </ul>

          <p class="pricing-note">
            {{ item.note }}
          </p>
        </li>
      </ul>

      <aside class="pricing-info" data-pricing-reveal>
        <div class="pricing-info-copy">
          <p class="pricing-info-label">
            Расчёт проекта
          </p>
          <h3>От чего зависит итоговая стоимость</h3>
          <p>
            Указанные суммы являются ориентировочными. Стоимость может измениться как в меньшую, так и в большую сторону в зависимости от количества страниц, сложности дизайна, функционала, интеграций и готовности материалов.
          </p>
          <p>
            После знакомства с целями проекта и созвона команда Recursor разберёт задачу, предложит способы улучшения идеи, поможет убрать лишнее или упростить реализацию без потери результата. После этого мы сформируем точную стоимость и план разработки.
          </p>
        </div>

        <ul class="pricing-factors" aria-label="Факторы формирования стоимости">
          <li v-for="(factor, index) in priceFactors" :key="factor">
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
            {{ factor }}
          </li>
        </ul>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.pricing-section {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding: 7rem 0;
  background:
    radial-gradient(ellipse 66% 48% at 86% 12%, var(--section-glow), transparent 70%),
    radial-gradient(
      ellipse 54% 42% at 8% 86%,
      color-mix(in srgb, var(--section-glow) 72%, transparent),
      transparent 72%
    ),
    linear-gradient(150deg, var(--section-canvas-deep), var(--section-canvas-muted));
}

.pricing-section::before {
  position: absolute;
  inset: 0;
  z-index: -2;
  background-image: radial-gradient(
    circle at 1px 1px,
    color-mix(in srgb, var(--color-foreground) 10%, transparent) 0.7px,
    transparent 0.9px
  );
  background-size: 22px 22px;
  content: '';
  mask-image: radial-gradient(ellipse 62% 62% at 54% 46%, #000 4%, transparent 76%);
  opacity: 0.28;
  pointer-events: none;
}

.pricing-watermark {
  position: absolute;
  top: clamp(2rem, 5vw, 4rem);
  left: 50%;
  z-index: -1;
  color: var(--color-foreground);
  font-size: clamp(6rem, 18vw, 15rem);
  font-weight: 950;
  letter-spacing: -0.07em;
  line-height: 0.8;
  mask-image: linear-gradient(90deg, transparent, #000 18%, #000 82%, transparent);
  opacity: 0.025;
  pointer-events: none;
  transform: translateX(-50%);
  white-space: nowrap;
}

.pricing-container {
  width: min(1120px, calc(100% - 2rem));
  margin: 0 auto;
}

.pricing-header {
  max-width: 46rem;
  margin-bottom: 3.5rem;
}

.pricing-kicker,
.pricing-info-label {
  margin: 0 0 0.75rem;
  color: var(--color-muted);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.pricing-title {
  margin: 0;
  color: var(--color-foreground);
  font-size: clamp(2rem, 4vw, 3.25rem);
  font-weight: 900;
  letter-spacing: -0.03em;
  line-height: 1.06;
}

.pricing-intro {
  max-width: 42rem;
  margin: 1.25rem 0 0;
  color: var(--color-muted-foreground);
  font-size: clamp(1rem, 1.5vw, 1.125rem);
  line-height: 1.7;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.pricing-card {
  position: relative;
  display: flex;
  min-width: 0;
  overflow: hidden;
  padding: 1.5rem;
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  background:
    linear-gradient(155deg, color-mix(in srgb, var(--color-foreground) 4%, transparent), transparent 46%),
    color-mix(in srgb, var(--color-background) 88%, transparent);
  box-shadow: inset 0 1px 0 color-mix(in srgb, var(--color-foreground) 7%, transparent);
  flex-direction: column;
  transition:
    border-color 260ms ease,
    box-shadow 260ms ease,
    transform 260ms ease;
}

.pricing-card:last-child {
  background:
    radial-gradient(circle at 86% 8%, var(--section-glow), transparent 42%),
    linear-gradient(155deg, color-mix(in srgb, var(--color-foreground) 5%, transparent), transparent 48%),
    color-mix(in srgb, var(--color-background) 90%, transparent);
}

.pricing-card:hover {
  border-color: color-mix(in srgb, var(--color-main) 34%, var(--color-border));
  box-shadow:
    inset 0 1px 0 color-mix(in srgb, var(--color-foreground) 10%, transparent),
    0 20px 48px rgb(0 0 0 / 16%);
  transform: translateY(-3px);
}

.pricing-card-head {
  display: flex;
  min-height: 1.75rem;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
}

.pricing-index {
  color: var(--color-muted);
  font-family: 'DM Mono', ui-monospace, monospace;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.pricing-badge {
  padding: 0.35rem 0.55rem;
  border: 1px solid color-mix(in srgb, var(--color-border) 84%, transparent);
  border-radius: 999px;
  background: color-mix(in srgb, var(--color-muted-surface) 70%, transparent);
  color: var(--color-muted-foreground);
  font-size: 0.68rem;
  font-weight: 800;
  line-height: 1;
  text-align: center;
}

.pricing-card-title {
  min-height: 2.8rem;
  margin: 1.2rem 0 0;
  color: var(--color-foreground);
  font-size: 1.2rem;
  font-weight: 850;
  line-height: 1.25;
}

.pricing-price {
  margin: 0.75rem 0 0;
  color: var(--color-foreground);
  font-family: 'DM Mono', ui-monospace, monospace;
  font-size: clamp(1.55rem, 2.5vw, 2rem);
  font-variant-numeric: tabular-nums;
  font-weight: 800;
  letter-spacing: -0.045em;
  line-height: 1.1;
}

.pricing-description {
  min-height: 5.1rem;
  margin: 1.25rem 0 0;
  color: var(--color-muted-foreground);
  font-size: 0.92rem;
  line-height: 1.65;
}

.pricing-features {
  display: grid;
  gap: 0.7rem;
  margin: 1.5rem 0 0;
  padding: 1.4rem 0 0;
  border-top: 1px solid var(--color-border);
  list-style: none;
}

.pricing-features li {
  position: relative;
  padding-left: 1rem;
  color: var(--color-foreground);
  font-size: 0.88rem;
  line-height: 1.45;
}

.pricing-features li::before {
  position: absolute;
  top: 0.58em;
  left: 0;
  width: 0.3rem;
  height: 0.3rem;
  border-radius: 50%;
  background: var(--color-muted);
  content: '';
  opacity: 0.7;
}

.pricing-note {
  margin: auto 0 0;
  padding-top: 1.5rem;
  color: var(--color-muted);
  font-size: 0.78rem;
  line-height: 1.55;
}

.pricing-info {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(16rem, 0.65fr);
  gap: clamp(1.5rem, 4vw, 3.5rem);
  margin-top: 1rem;
  padding: clamp(1.5rem, 3vw, 2.25rem);
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  background:
    radial-gradient(circle at 92% 10%, var(--section-glow), transparent 38%),
    color-mix(in srgb, var(--color-muted-surface) 74%, transparent);
  box-shadow: inset 0 1px 0 color-mix(in srgb, var(--color-foreground) 7%, transparent);
}

.pricing-info h3 {
  margin: 0;
  color: var(--color-foreground);
  font-size: clamp(1.35rem, 2.5vw, 2rem);
  font-weight: 900;
  letter-spacing: -0.025em;
  line-height: 1.15;
}

.pricing-info-copy > p:not(.pricing-info-label) {
  max-width: 48rem;
  margin: 1rem 0 0;
  color: var(--color-muted-foreground);
  font-size: 0.92rem;
  line-height: 1.7;
}

.pricing-factors {
  display: grid;
  gap: 0.6rem;
  margin: 0;
  padding: 0;
  align-content: center;
  list-style: none;
}

.pricing-factors li {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-foreground);
  font-size: 0.86rem;
  font-weight: 750;
}

.pricing-factors li:last-child {
  border-bottom: 0;
}

.pricing-factors span {
  color: var(--color-muted);
  font-family: 'DM Mono', ui-monospace, monospace;
  font-size: 0.68rem;
}

[data-pricing-reveal] {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 620ms ease,
    transform 620ms cubic-bezier(0.16, 1, 0.3, 1),
    border-color 260ms ease,
    box-shadow 260ms ease;
}

[data-pricing-reveal].is-revealed {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 1039px) {
  .pricing-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .pricing-card:last-child {
    grid-column: 1 / -1;
  }

  .pricing-card-title,
  .pricing-description {
    min-height: 0;
  }
}

@media (max-width: 719px) {
  .pricing-section {
    padding: 5rem 0;
  }

  .pricing-watermark {
    top: 2.5rem;
    font-size: clamp(4rem, 24vw, 7rem);
  }

  .pricing-header {
    margin-bottom: 2.5rem;
  }

  .pricing-grid,
  .pricing-info {
    grid-template-columns: 1fr;
  }

  .pricing-card:last-child {
    grid-column: auto;
  }

  .pricing-card,
  .pricing-info {
    padding: 1.25rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  [data-pricing-reveal],
  [data-pricing-reveal].is-revealed,
  .pricing-card {
    transition: none;
    transform: none;
  }
}
</style>
