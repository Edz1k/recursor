<script setup lang="ts">
const navigationLinks = [
  { label: 'Главная', href: '/' },
  { label: 'О нас', href: '/#about' },
  { label: 'Как работаем', href: '/#work' },
  { label: 'Портфолио', href: '/#portfolio' },
  { label: 'Контакты', href: '/contacts' },
]

const serviceLinks = [
  { label: 'Разработка сайтов', href: '/contacts#contact-form' },
  { label: 'Решения для бизнеса с нуля', href: '/contacts#contact-form' },
  { label: 'Поддержка сайта', href: '/contacts#contact-form' },
  { label: 'Ведение и развитие проекта', href: '/contacts#contact-form' },
]

const contactLinks = [
  { label: 'Алматы, БЦ Навои', href: '#' },
  { label: '+7 XXX XXX XX XX', href: 'tel:+7XXXXXXXXXX' },
  { label: '+7 XXX XXX XX XX', href: 'tel:+7XXXXXXXXXX' },
  { label: 'hello@recursor.kz', href: 'mailto:hello@recursor.kz' },
  { label: 'Telegram', href: '#' },
  { label: 'WhatsApp', href: '#' },
]

const socialLinks = [
  { label: 'Instagram', href: '#' },
  { label: 'TikTok', href: '#' },
  { label: 'Telegram', href: '#' },
  { label: 'WhatsApp', href: '#' },
]

const legalLinks = [
  { label: 'Политика конфиденциальности', href: '#' },
  { label: 'Пользовательское соглашение', href: '#' },
]
</script>

<template>
  <footer class="site-footer">
    <div class="footer-top-line" aria-hidden="true" />
    <div class="footer-background-word" aria-hidden="true">
      RECURSOR.KZ
    </div>
    <div class="footer-glow footer-glow-one" aria-hidden="true" />
    <div class="footer-glow footer-glow-two" aria-hidden="true" />

    <section class="footer-cta" aria-labelledby="footer-cta-title">
      <div class="footer-container">
        <div class="footer-cta-card">
          <div class="footer-grid-lines" aria-hidden="true" />
          <p class="footer-cta-kicker">
            Recursor.kz
          </p>
          <h2 id="footer-cta-title" class="footer-cta-title">
            Ваш следующий проект начинается здесь.
          </h2>
          <p class="footer-cta-text">
            Расскажите нам о задаче — мы найдём решение для любого бизнеса с нуля.
          </p>
          <a class="footer-primary-button" href="/contacts#contact-form">
            <span>Обсудить проект</span>
          </a>
          <p class="footer-trust-text">
            Работаем по договору • Поддерживаем после запуска •
            <span class="footer-fast-reply">
              <span class="footer-status-dot" aria-hidden="true" />
              Отвечаем быстро
            </span>
          </p>
        </div>
      </div>
    </section>

    <section class="footer-main" aria-label="Основной футер">
      <div class="footer-container">
        <div class="footer-grid">
          <div class="footer-brand footer-panel">
            <a class="footer-logo" href="/">
              Recursor.kz
            </a>
            <p class="footer-description">
              Разрабатываем сайты под любые задачи: от идеи и первого прототипа до запуска, поддержки и дальнейшего развития проекта.
            </p>
          </div>

          <nav class="footer-column footer-panel" aria-label="Навигация">
            <h3 class="footer-column-title">
              Навигация
            </h3>
            <a
              v-for="link in navigationLinks"
              :key="link.label"
              class="footer-link"
              :href="link.href"
            >
              {{ link.label }}
            </a>
          </nav>

          <nav class="footer-column footer-panel" aria-label="Услуги">
            <h3 class="footer-column-title">
              Услуги
            </h3>
            <a
              v-for="link in serviceLinks"
              :key="link.label"
              class="footer-link"
              :href="link.href"
            >
              {{ link.label }}
            </a>
          </nav>

          <address class="footer-column footer-panel footer-contacts">
            <h3 class="footer-column-title">
              Контакты
            </h3>
            <a
              v-for="link in contactLinks"
              :key="link.label"
              class="footer-link footer-contact-link"
              :href="link.href"
            >
              {{ link.label }}
            </a>
          </address>
        </div>

        <div class="footer-socials" aria-label="Социальные сети">
          <a
            v-for="link in socialLinks"
            :key="link.label"
            class="footer-social-link"
            :href="link.href"
          >
            {{ link.label }}
          </a>
        </div>

        <div class="footer-bottom">
          <p class="footer-copyright">
            © 2026 Recursor.kz. Все права защищены.
          </p>

          <nav class="footer-legal" aria-label="Юридическая информация">
            <a
              v-for="link in legalLinks"
              :key="link.label"
              :href="link.href"
            >
              {{ link.label }}
            </a>
          </nav>

          <p class="footer-made">
            Made in Kazakhstan
          </p>
        </div>
      </div>
    </section>
  </footer>
</template>
