<script setup lang="ts">
import ContactWhatsAppPicker from '~/components/contact/ContactWhatsAppPicker.vue'
import {
  studioAddress,
  studioEmail,
  studioPhones,
  telegramOptions,
  whatsappOptions,
} from '~/data/contact'

const navigationLinks = [
  { label: 'Главная', to: '/' },
  { label: 'Кейсы', to: '/cases' },
  { label: 'О нас', to: '/about' },
  { label: 'Контакты', to: '/contacts' },
] as const

const services = [
  'Разработка сайтов',
  'UX/UI-дизайн',
  'Решения для бизнеса',
  'Поддержка и развитие',
] as const

const currentYear = new Date().getFullYear()

function scrollToTop() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
}
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
            RECURSOR.KZ
          </p>
          <h2 id="footer-cta-title" class="footer-cta-title">
            Ваш проект начинается с разговора
          </h2>
          <p class="footer-cta-text">
            Расскажите о задаче — разберёмся в целях, предложим структуру и соберём решение именно под ваш бизнес.
          </p>
          <RouterLink class="footer-primary-button" to="/contacts#contact-form">
            <span>Обсудить проект</span>
          </RouterLink>
          <p
            class="footer-trust-text"
            aria-label="Индивидуальный подход, работа по договору, поддержка после запуска"
          >
            <span>Индивидуальный подход</span>
            <span class="footer-trust-separator" aria-hidden="true">•</span>
            <span>Работа по договору</span>
            <span class="footer-trust-separator" aria-hidden="true">•</span>
            <span>Поддержка после запуска</span>
          </p>
        </div>
      </div>
    </section>

    <section class="footer-main" aria-label="Основной футер">
      <div class="footer-container">
        <div class="footer-grid">
          <div class="footer-brand footer-panel">
            <RouterLink class="footer-logo" to="/">
              Recursor.kz
            </RouterLink>
            <p class="footer-description">
              Проектируем и разрабатываем сайты как цифровые продукты — от структуры и дизайна до запуска и поддержки.
            </p>
          </div>

          <nav class="footer-column footer-panel" aria-label="Навигация">
            <h3 class="footer-column-title">
              Навигация
            </h3>
            <RouterLink
              v-for="link in navigationLinks"
              :key="link.to"
              class="footer-link"
              :to="link.to"
            >
              {{ link.label }}
            </RouterLink>
          </nav>

          <div class="footer-column footer-panel" aria-label="Услуги">
            <h3 class="footer-column-title">
              Услуги
            </h3>
            <span v-for="service in services" :key="service" class="footer-service">
              {{ service }}
            </span>
          </div>

          <address class="footer-column footer-panel footer-contacts">
            <h3 class="footer-column-title">
              Контакты
            </h3>
            <div class="footer-address">
              <span v-for="line in studioAddress" :key="line">{{ line }}</span>
            </div>
            <a
              v-for="phone in studioPhones"
              :key="phone.href"
              class="footer-link footer-contact-link"
              :href="phone.href"
            >
              {{ phone.label }}
            </a>
            <a class="footer-link footer-contact-link" :href="studioEmail.href">
              {{ studioEmail.label }}
            </a>
          </address>
        </div>

        <div class="footer-socials" aria-label="Мессенджеры">
          <ContactWhatsAppPicker
            :numbers="telegramOptions"
            label="Telegram"
            title="Кому написать в Telegram?"
            description="Выберите контакт"
            variant="social"
          />
          <ContactWhatsAppPicker
            :numbers="whatsappOptions"
            label="WhatsApp"
            title="Кому написать в WhatsApp"
            description="Выберите один из двух рабочих номеров."
            variant="social"
          />
        </div>

        <div class="footer-bottom">
          <p class="footer-copyright">
            © {{ currentYear }} Recursor Web Studio
          </p>
          <button class="footer-to-top" type="button" @click="scrollToTop">
            <span>Наверх</span>
            <span aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </section>
  </footer>
</template>
