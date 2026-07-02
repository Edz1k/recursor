<script setup lang="ts">
import { Motion } from 'motion-v'
import amoLogisticsPreview from '~/assets/services/amo-logistics-preview.png'
import brillexPreview from '~/assets/services/brillex-preview.png'
import konturPreview from '~/assets/services/kontur-preview.png'
import megabetonPreview from '~/assets/services/megabeton-preview.png'

defineOptions({
  name: 'CasesPage',
})

const isDiscussOpen = shallowRef(false)

const SPRING_MEDIUM = { type: 'spring', stiffness: 110, damping: 20 } as const
const SPRING_SNAPPY = { type: 'spring', stiffness: 200, damping: 22 } as const

const HERO_BADGES = [
  'Сайты под заявки',
  'CRM и автоматизация',
  'B2B-проекты',
  'Поддержка после запуска',
]

const CASES = [
  {
    id: 'kontur',
    title: 'KONTUR',
    category: 'Лендинг + заявки',
    niche: 'Натяжные потолки',
    story: 'Клиенту нужен был современный сайт для услуги в Алматы: чтобы человек быстро понял виды потолков, увидел преимущества, смог рассчитать примерную стоимость и оставить заявку.',
    done: 'Собрали структуру лендинга, каталог потолков, калькулятор, кнопки связи, формы заявок и подготовку под рекламу.',
    tags: ['Лендинг', 'Калькулятор', 'Telegram-заявки', 'SEO'],
    image: konturPreview,
    imageAlt: 'Скриншот сайта KONTUR',
    browserLabel: 'kontur.kz',
  },
  {
    id: 'brillex',
    title: 'BRILLEX',
    category: 'Бизнес-решение',
    niche: 'Бренд одежды',
    story: 'Задача была сложнее обычного сайта: нужен был не только внешний сайт для клиентов, но и внутренняя система для работы с заказами.',
    done: 'Собрали сайт с каталогом и портфолио, а также CRM-систему для обработки заявок и управления процессами.',
    tags: ['Сайт', 'CRM', 'Каталог', 'Админ-панель'],
    image: brillexPreview,
    imageAlt: 'Скриншот сайта BRILLEX',
    browserLabel: 'brillex.kz',
  },
  {
    id: 'megabeton',
    title: 'MEGA BETON',
    category: 'Поддержка и развитие',
    niche: 'Бетон и строительные материалы',
    story: 'Клиенту нужен был сайт под заявки и рекламу: понятно показать бетон с доставкой, услуги, контакты и быстро доводить посетителя до обращения.',
    done: 'Собрали посадочную страницу, структуру под рекламу, формы, контактные кнопки и дальнейшие доработки проекта.',
    tags: ['Лендинг', 'Формы', 'Реклама', 'Поддержка'],
    image: megabetonPreview,
    imageAlt: 'Скриншот сайта MEGA BETON',
    browserLabel: 'megabeton.kz',
  },
  {
    id: 'amo-logistics',
    title: 'AMO Logistics',
    category: 'Корпоративный сайт',
    niche: 'Логистика и грузоперевозки',
    story: 'Клиенту нужен был корпоративный сайт, который вызывает доверие и понятно показывает услуги для B2B-клиентов.',
    done: 'Собрали структуру сайта, блоки услуг, подачу направлений перевозок, контактные сценарии и аккуратный корпоративный интерфейс.',
    tags: ['Логистика', 'B2B', 'Корпоративный сайт', 'Заявки'],
    image: amoLogisticsPreview,
    imageAlt: 'Скриншот сайта AMO Logistics',
    browserLabel: 'amo-logistics',
  },
]

const PROCESS = ['Анализ', 'Структура', 'Дизайн', 'Разработка', 'Запуск', 'Поддержка']

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
            :id="item.id"
            :key="item.id"
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
                <div class="case-screen" :class="{ 'case-screen-placeholder': !item.image }">
                  <img v-if="item.image" class="case-screen-img" :src="item.image" :alt="item.imageAlt">
                  <div v-else class="case-placeholder" aria-label="Временное превью AMO Logistics">
                    <span class="case-placeholder-label">AMO</span>
                    <span class="case-placeholder-title">Logistics</span>
                    <span class="case-placeholder-line" />
                    <span class="case-placeholder-line case-placeholder-line-short" />
                  </div>
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

              <div class="case-tags" aria-label="Теги проекта">
                <span v-for="tag in item.tags" :key="tag" class="case-tag">{{ tag }}</span>
              </div>

              <RouterLink :to="`/cases#${item.id}`" class="case-link">
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
          <li v-for="(step, index) in PROCESS" :key="step" class="process-step">
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
  gap: 1rem;
}

.case-card {
  display: flex;
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
  flex: 0 0 44%;
  min-width: 0;
  padding: 1rem 0 1rem 1rem;
}

.case-browser {
  height: 100%;
  min-height: 17rem;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--color-border) 76%, transparent);
  border-radius: 0.85rem;
  background: rgb(0 0 0 / 22%);
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
  min-height: 15.15rem;
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
  object-position: left top;
  opacity: 0.82;
  filter: brightness(0.72) saturate(0.88);
  transform: scale(1);
  transition: transform 260ms ease;
}

.case-card:hover .case-screen-img,
.case-card:focus-within .case-screen-img,
.case-card:hover .case-placeholder,
.case-card:focus-within .case-placeholder {
  transform: scale(1.045);
}

.case-screen-placeholder {
  display: flex;
  align-items: stretch;
}

.case-placeholder {
  display: flex;
  width: 100%;
  padding: 1.35rem;
  flex-direction: column;
  justify-content: flex-end;
  background:
    linear-gradient(135deg, rgb(255 255 255 / 12%), transparent 42%),
    radial-gradient(circle at 78% 20%, rgb(130 170 255 / 20%), transparent 34%), var(--color-muted-surface);
  transition: transform 260ms ease;
}

.case-placeholder-label {
  color: var(--color-muted);
  font-family: 'DM Mono', ui-monospace, monospace;
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.12em;
}

.case-placeholder-title {
  margin-top: 0.45rem;
  color: var(--color-foreground);
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.04em;
}

.case-placeholder-line {
  display: block;
  width: 72%;
  height: 0.7rem;
  margin-top: 1.3rem;
  border-radius: 999px;
  background: rgb(255 255 255 / 18%);
}

.case-placeholder-line-short {
  width: 44%;
  margin-top: 0.55rem;
}

.case-content {
  display: flex;
  min-width: 0;
  padding: 1.45rem;
  flex: 1;
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
  font-size: clamp(1.55rem, 2.5vw, 2.35rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.03em;
}

.case-story {
  margin: 1rem 0 0;
  color: var(--color-muted-foreground);
  font-size: 0.94rem;
  line-height: 1.7;
}

.case-done {
  margin-top: 1.1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
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
  font-size: 0.94rem;
  line-height: 1.65;
}

.case-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 1.1rem;
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

@media (min-width: 860px) {
  .cases-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .case-card {
    flex-direction: column;
  }

  .case-preview {
    flex: none;
    padding: 1rem 1rem 0;
  }

  .case-browser {
    min-height: 16rem;
  }

  .case-card:nth-child(1),
  .case-card:nth-child(4) {
    grid-column: span 2;
    flex-direction: row;
  }

  .case-card:nth-child(1) .case-preview,
  .case-card:nth-child(4) .case-preview {
    flex: 0 0 46%;
    padding: 1rem 0 1rem 1rem;
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
    flex-direction: column;
  }

  .case-preview {
    flex: none;
    padding: 1rem 1rem 0;
  }

  .case-browser {
    min-height: 15rem;
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

  .case-content,
  .cta-card {
    padding: 1.25rem;
  }

  .case-browser {
    min-height: 13rem;
  }

  .btn-primary {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .case-screen-img,
  .case-placeholder {
    transition: none;
  }
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
