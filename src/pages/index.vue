<script setup lang="ts">
import { Motion } from 'motion-v'

defineOptions({ name: 'IndexPage' })
useHead({ title: 'Recursor.kz — Web Studio' })

const isDiscussOpen = shallowRef(false)

// ── Spring presets ────────────────────────────────────────────────────────────
const SPRING_SOFT = { type: 'spring', stiffness: 80, damping: 18 } as const
const SPRING_MEDIUM = { type: 'spring', stiffness: 110, damping: 20 } as const
const SPRING_SNAPPY = { type: 'spring', stiffness: 200, damping: 22 } as const

// ── Canvas: Syntax-Coloured Matrix Rain ──────────────────────────────────────
const canvasRef = useTemplateRef<HTMLCanvasElement>('canvas')

const CHARS = '01789{}[]()=+-*/;:.#_?!abcdefghijklmnopqrstuvwxyz'
const CHAR_W = 16
const CHAR_H = 18
const FS = 13

const DARK_PAL = ['#C792EA', '#C3E88D', '#82AAFF', '#89DDFF', '#FFCB6B', '#F78C6C', '#F07178', '#7FDBCA']
const LIGHT_PAL = ['#7C3AED', '#059669', '#2563EB', '#0891B2', '#B45309', '#EA580C', '#DC2626', '#0F766E']

interface MatrixCol {
  x: number
  head: number
  speed: number
  len: number
  chars: string[]
  color: string
}

let raf = 0
let cols: MatrixCol[] = []
let W = 0
let H = 0
let numRows = 0
let lastT = 0

const rchar = () => CHARS[Math.floor(Math.random() * CHARS.length)]
function rpick<T>(a: T[]): T {
  return a[Math.floor(Math.random() * a.length)]
}

function buildCols() {
  const pal = isDark.value ? DARK_PAL : LIGHT_PAL
  cols = Array.from({ length: Math.ceil(W / CHAR_W) }, (_, i) => {
    const len = 7 + Math.floor(Math.random() * 24)
    return {
      x: i * CHAR_W + CHAR_W * 0.3,
      head: -Math.floor(Math.random() * numRows * 1.8),
      speed: 5 + Math.random() * 20,
      len,
      chars: Array.from({ length: len }, rchar),
      color: rpick(pal),
    }
  })
}

function resize() {
  const canvas = canvasRef.value
  if (!canvas)
    return
  const r = canvas.getBoundingClientRect()
  W = r.width
  H = r.height
  numRows = Math.ceil(H / CHAR_H) + 2
  canvas.width = W * devicePixelRatio
  canvas.height = H * devicePixelRatio
  buildCols()
}

function draw(ts: number) {
  const canvas = canvasRef.value
  if (!canvas)
    return
  const ctx = canvas.getContext('2d')
  if (!ctx)
    return
  const dt = Math.min((ts - lastT) / 1000, 0.05)
  lastT = ts
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.save()
  ctx.scale(devicePixelRatio, devicePixelRatio)
  ctx.font = `${FS}px 'DM Mono', ui-monospace, monospace`
  const pal = isDark.value ? DARK_PAL : LIGHT_PAL
  const headClr = isDark.value ? '#FFFFFF' : '#000000'
  const neckClr = isDark.value ? 'rgba(210,235,255,0.92)' : 'rgba(0,10,40,0.85)'
  for (const col of cols) {
    col.head += col.speed * dt
    if (Math.random() < 0.07)
      col.chars[Math.floor(Math.random() * col.len)] = rchar()
    const headRow = Math.floor(col.head)
    for (let j = 0; j < col.len; j++) {
      const row = headRow - j
      if (row < 0 || row > numRows)
        continue
      const fade = 1 - j / col.len
      ctx.globalAlpha = j === 0 ? 0.96 : fade * fade * 0.82
      ctx.fillStyle = j === 0 ? headClr : j === 1 ? neckClr : col.color
      ctx.fillText(col.chars[j % col.len], col.x, row * CHAR_H + FS)
    }
    if (headRow - col.len > numRows) {
      col.head = -Math.floor(Math.random() * numRows * 0.6)
      col.speed = 5 + Math.random() * 20
      col.len = 7 + Math.floor(Math.random() * 24)
      col.chars = Array.from({ length: col.len }, rchar)
      col.color = rpick(pal)
    }
  }
  ctx.restore()
  raf = requestAnimationFrame(draw)
}

onMounted(() => {
  resize()
  lastT = performance.now()
  raf = requestAnimationFrame(draw)
  window.addEventListener('resize', resize)
})
onUnmounted(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('resize', resize)
  cols = []
})

// ── Static data ───────────────────────────────────────────────────────────────
const MARQUEE = [
  'Vue 3',
  'TypeScript',
  'UnoCSS',
  'Vite',
  'Nuxt',
  'Telegram API',
  'от идеи',
  'до запуска',
  'Алматы',
  'PWA',
  'SSG',
  'Headless UI',
  'REST API',
  'рефакторинг',
  'Казахстан',
  'SEO',
  'адаптив',
  'анимации',
]

const SERVICES = [
  { num: '01', title: 'Разработка сайтов', desc: 'Лендинги, корпоративные сайты, личные бренды — с понятной структурой, анимациями и быстрой загрузкой.' },
  { num: '02', title: 'Бизнес-решения', desc: 'Кабинеты, формы, интеграции с Telegram-ботами и CRM — автоматизируем рутинные процессы.' },
  { num: '03', title: 'Поддержка и развитие', desc: 'Не бросаем после запуска. Помогаем с доработками, обновлениями и масштабированием.' },
]

const PROCESS = [
  { step: '01', label: 'Разбираем задачу' },
  { step: '02', label: 'Проектируем' },
  { step: '03', label: 'Разрабатываем' },
  { step: '04', label: 'Запускаем' },
]
</script>

<template>
  <!-- ── HERO ───────────────────────────────────────────────────────────────── -->
  <section class="hero">
    <canvas ref="canvas" class="hero-canvas" aria-hidden="true" />
    <div class="hero-vignette" aria-hidden="true" />

    <div class="hero-inner">
      <!-- Badge -->
      <Motion
        as="span"
        class="hero-badge"
        :initial="{ opacity: 0, y: -18 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ ...SPRING_MEDIUM, delay: 0.05 }"
      >
        <span class="hero-badge-dot" aria-hidden="true" />
        Web Studio · Алматы, Казахстан
      </Motion>

      <!-- H1 — curtain reveal per line -->
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

      <!-- Description -->
      <Motion
        as="p"
        class="hero-desc"
        :initial="{ opacity: 0, y: 28 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ ...SPRING_MEDIUM, delay: 0.58 }"
      >
        От первого экрана до боевого сервера —<br class="hero-desc-br">
        без лишнего шума, с поддержкой после релиза.
      </Motion>

      <!-- Buttons -->
      <div class="hero-actions">
        <Motion
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :while-hover="{ scale: 1.04, y: -3 }"
          :while-tap="{ scale: 0.96 }"
          :transition="{ ...SPRING_SNAPPY, delay: 0.72 }"
        >
          <button type="button" class="btn-primary" @click="isDiscussOpen = true">
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

  <!-- ── MARQUEE ────────────────────────────────────────────────────────────── -->
  <Motion
    :initial="{ opacity: 0 }"
    :while-in-view="{ opacity: 1 }"
    :transition="{ duration: 0.6 }"
    :viewport="{ once: true }"
  >
    <div class="marquee-wrap" aria-hidden="true">
      <div class="marquee-track">
        <span v-for="(item, i) in [...MARQUEE, ...MARQUEE]" :key="i" class="marquee-item">
          {{ item }}<span class="marquee-sep" />
        </span>
      </div>
    </div>
  </Motion>

  <!-- ── SERVICES ───────────────────────────────────────────────────────────── -->
  <section class="section" aria-labelledby="services-title">
    <div class="container">
      <!-- Header -->
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

      <!-- Cards grid -->
      <div class="services-grid">
        <Motion
          v-for="(s, i) in SERVICES"
          :key="s.num"
          as="article"
          class="service-card"
          :initial="{ opacity: 0, y: 56 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :while-hover="{ y: -8, scale: 1.015 }"
          :while-tap="{ scale: 0.975, y: -3 }"
          :transition="{ ...SPRING_MEDIUM, delay: i * 0.13 }"
          :viewport="{ once: true, margin: '-50px' }"
        >
          <span class="service-num">{{ s.num }}</span>
          <h3 class="service-title">
            {{ s.title }}
          </h3>
          <p class="service-desc">
            {{ s.desc }}
          </p>
          <Motion
            as="span"
            class="service-arrow i-carbon-arrow-up-right"
            aria-hidden="true"
            :initial="{ opacity: 0, x: -6, y: 6 }"
            :while-in-view="{ opacity: 0 }"
            :while-hover="{ opacity: 1, x: 0, y: 0 }"
            :transition="SPRING_SNAPPY"
          />
        </Motion>
      </div>
    </div>
  </section>

  <!-- ── PROCESS ────────────────────────────────────────────────────────────── -->
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
          v-for="(p, i) in PROCESS"
          :key="p.step"
          as="li"
          class="process-item"
          :initial="{ opacity: 0, x: -40 }"
          :while-in-view="{ opacity: 1, x: 0 }"
          :while-hover="{ x: 6 }"
          :transition="{ ...SPRING_MEDIUM, delay: i * 0.11 }"
          :viewport="{ once: true, margin: '-40px' }"
        >
          <Motion
            as="span"
            class="process-step"
            :while-in-view="{ opacity: 1 }"
            :initial="{ opacity: 0.35 }"
            :transition="{ duration: 0.4, delay: i * 0.11 + 0.3 }"
            :viewport="{ once: true }"
          >
            {{ p.step }}
          </Motion>
          <span class="process-label">{{ p.label }}</span>
        </Motion>
      </ol>
    </div>
  </section>

  <!-- ── CTA ────────────────────────────────────────────────────────────────── -->
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
          Расскажите нам о задаче — ответим быстро, без воды.
        </Motion>

        <Motion
          :initial="{ opacity: 0, scale: 0.88, y: 16 }"
          :while-in-view="{ opacity: 1, scale: 1, y: 0 }"
          :while-hover="{ scale: 1.06, y: -4 }"
          :while-tap="{ scale: 0.95 }"
          :transition="{ ...SPRING_SNAPPY, delay: 0.34 }"
          :viewport="{ once: true }"
        >
          <button type="button" class="btn-primary btn-lg" @click="isDiscussOpen = true">
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

  <ProjectDiscussDialog v-model:open="isDiscussOpen" />
</template>

<style scoped>
/* ── Hero ──────────────────────────────────────────────────────────────────── */
.hero {
  position: relative;
  display: flex;
  align-items: center;
  min-height: calc(100vh - 4.5rem);
  overflow: hidden;
  background: var(--color-background);
}

.hero-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.hero-vignette {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(ellipse 65% 85% at 50% 50%, var(--color-background) 0%, transparent 100%);
  opacity: 0.84;
}

.hero-inner {
  position: relative;
  z-index: 1;
  width: min(1120px, calc(100% - 2rem));
  margin: 0 auto;
  padding: 6rem 0 5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

/* Badge */
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

/* H1 curtain reveal */
.hero-h1 {
  margin: 0;
  color: var(--color-foreground);
  font-size: clamp(3.25rem, 8.5vw, 7.5rem);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.04em;
  display: flex;
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

/* Description */
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
@media (min-width: 640px) {
  .hero-desc-br {
    display: inline;
  }
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.875rem;
  margin-top: 2.5rem;
}

/* ── Buttons ───────────────────────────────────────────────────────────────── */
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
.btn-lg {
  height: 3.25rem;
  padding: 0 2rem;
  font-size: 1rem;
}

.btn-ghost {
  display: inline-flex;
  align-items: center;
  height: 2.875rem;
  padding: 0 1.25rem;
  border: 1px solid var(--color-border);
  border-radius: 0.625rem;
  color: var(--color-foreground);
  font-size: 0.9375rem;
  font-weight: 700;
  text-decoration: none;
  outline: none;
  will-change: transform;
}
.btn-ghost:focus-visible {
  box-shadow: 0 0 0 2px var(--color-ring);
}

/* ── Marquee ───────────────────────────────────────────────────────────────── */
.marquee-wrap {
  overflow: hidden;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  background: var(--color-muted-surface);
  padding: 0.875rem 0;
  mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee-scroll 28s linear infinite;
}

.marquee-item {
  display: inline-flex;
  align-items: center;
  padding: 0 0.25rem;
  color: var(--color-muted-foreground);
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  white-space: nowrap;
}

.marquee-sep {
  display: inline-block;
  width: 4px;
  height: 4px;
  margin: 0 1.25rem;
  border-radius: 50%;
  background: var(--color-border);
  flex-shrink: 0;
}

/* ── Shared section ────────────────────────────────────────────────────────── */
.section {
  padding: 7rem 0;
  background: var(--color-background);
}
.section-alt {
  background: var(--color-muted-surface);
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
  line-height: 1.06;
  letter-spacing: -0.03em;
}

/* ── Services ──────────────────────────────────────────────────────────────── */
.services-grid {
  display: grid;
  gap: 1px;
  background: var(--color-border);
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  overflow: hidden;
}
@media (min-width: 768px) {
  .services-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.service-card {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  padding: 2rem;
  background: var(--color-background);
  cursor: default;
  will-change: transform;
}

.service-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  color: var(--color-muted);
  font-size: 0.6875rem;
  font-weight: 800;
  font-family: 'DM Mono', ui-monospace, monospace;
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

.service-arrow {
  align-self: flex-end;
  font-size: 1.125rem;
  will-change: transform, opacity;
}

/* ── Process ───────────────────────────────────────────────────────────────── */
.process-list {
  display: grid;
  gap: 1px;
  background: var(--color-border);
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  overflow: hidden;
  list-style: none;
  margin: 0;
  padding: 0;
}
@media (min-width: 640px) {
  .process-list {
    grid-template-columns: repeat(4, 1fr);
  }
}

.process-item {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  padding: 2rem;
  background: var(--color-muted-surface);
  will-change: transform;
}

.process-step {
  color: var(--color-muted);
  font-size: 0.6875rem;
  font-weight: 800;
  font-family: 'DM Mono', ui-monospace, monospace;
  letter-spacing: 0.06em;
}

.process-label {
  color: var(--color-foreground);
  font-size: 1.0625rem;
  font-weight: 800;
}

/* ── CTA ───────────────────────────────────────────────────────────────────── */
.cta-section {
  padding: 7rem 0;
  background: var(--color-background);
}

.cta-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0;
}

.cta-inner .section-kicker {
  margin-bottom: 1rem;
}

.cta-title {
  margin: 0 0 1.25rem;
  color: var(--color-foreground);
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.04em;
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

/* ── Animations ────────────────────────────────────────────────────────────── */
@keyframes marquee-scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
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

/* ── Mobile ────────────────────────────────────────────────────────────────── */
@media (max-width: 640px) {
  .hero-inner {
    padding: 4rem 0;
  }
  .hero-actions {
    flex-direction: column;
    width: 100%;
  }
  .btn-primary,
  .btn-ghost {
    width: 100%;
    justify-content: center;
  }
  .section,
  .cta-section {
    padding: 5rem 0;
  }
}

/* ── Reduced motion ────────────────────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .hero-canvas {
    display: none;
  }
  .marquee-track {
    animation: none;
  }
  .hero-badge-dot {
    animation: none;
  }
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
