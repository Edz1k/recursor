<script setup lang="ts">
const ctaNotes = [
  'Первая консультация бесплатно',
  'Ответим в течение рабочего дня',
  'Работаем по договору',
  'Поддерживаем проект после запуска',
]

const contactLinks = [
  { label: '+7 707 485 23 28', href: 'tel:+77074852328' },
  { label: '+7 775 144 20 23', href: 'tel:+77751442023' },
  { label: 'Алматы, ул. Ораза Жандосова, 98, БЦ «Навои»', href: '#' },
  { label: 'hello@recursor.kz', href: 'mailto:hello@recursor.kz' },
]

const socialLinks = [
  { label: 'Telegram-канал', href: '#' },
  { label: 'Telegram личка', href: '#' },
  { label: 'WhatsApp', href: 'https://wa.me/77074852328' },
  { label: 'Instagram', href: '#' },
  { label: 'TikTok', href: '#' },
]
</script>

<template>
  <section
    id="contacts"
    class="contacts-section"
    :data-theme="isDark ? 'dark' : 'light'"
    aria-labelledby="contacts-title"
  >
    <div class="contacts-container">
      <div class="contacts-content">
        <p class="contacts-eyebrow">
          Recursor.kz
        </p>
        <h2 id="contacts-title" class="contacts-title">
          Давайте обсудим ваш проект
        </h2>
        <p class="contacts-subtitle">
          Расскажите о задаче — мы предложим решение, которое подойдёт вашему бизнесу, бюджету и этапу развития.
        </p>

        <div class="contacts-actions">
          <a class="contacts-primary-link" href="#contact-form">
            Договориться о брифе
          </a>
          <a class="contacts-secondary-link" href="https://wa.me/77074852328" target="_blank" rel="noreferrer">
            Написать в WhatsApp
          </a>
        </div>

        <ul class="contacts-notes" aria-label="Важные пометки">
          <li v-for="note in ctaNotes" :key="note">
            {{ note }}
          </li>
        </ul>
      </div>

      <aside class="contacts-card" aria-label="Форма заявки и контакты">
        <form id="contact-form" class="contacts-form" @submit.prevent>
          <div class="contacts-form-header">
            <h3>Заявка на проект</h3>
            <p>Оставьте контакты и пару слов о задаче.</p>
          </div>

          <label class="contacts-field">
            <span>Имя</span>
            <input name="name" type="text" autocomplete="name">
          </label>

          <label class="contacts-field">
            <span>Телефон или Telegram</span>
            <input name="contact" type="text" autocomplete="tel">
          </label>

          <label class="contacts-field">
            <span>Что нужно разработать?</span>
            <textarea name="project" rows="4" />
          </label>

          <label class="contacts-field">
            <span>Бюджет / сроки, если есть</span>
            <input name="budget" type="text">
          </label>

          <button class="contacts-submit" type="submit">
            Отправить заявку
          </button>
        </form>

        <div class="contacts-info">
          <div>
            <h3>Контакты</h3>
            <div class="contacts-link-list">
              <a
                v-for="link in contactLinks"
                :key="link.label"
                class="contacts-text-link"
                :href="link.href"
              >
                {{ link.label }}
              </a>
            </div>
          </div>

          <div>
            <h3>Соцсети и мессенджеры</h3>
            <div class="contacts-socials">
              <a
                v-for="link in socialLinks"
                :key="link.label"
                class="contacts-social-link"
                :href="link.href"
                target="_blank"
                rel="noreferrer"
              >
                {{ link.label }}
              </a>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.contacts-section {
  --contacts-bg: #f5f5f5;
  --contacts-bg-center: #fafafa;
  --contacts-bg-edge: #ececec;
  --contacts-text: #050505;
  --contacts-muted: #626262;
  --contacts-border: rgb(0 0 0 / 12%);
  --contacts-border-strong: rgb(0 0 0 / 2%);
  --contacts-card: rgb(250 250 250 / 72%);
  --contacts-card-hover: rgb(255 255 255 / 88%);
  --contacts-input: rgb(255 255 255 / 72%);
  --contacts-grid: rgb(0 0 0 / 7%);
  --contacts-shadow: rgb(0 0 0 / 9%);

  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding: clamp(5rem, 9vw, 8rem) 0;
  background:
    radial-gradient(circle at 68% 28%, var(--contacts-bg-center) 0, transparent 36%),
    radial-gradient(circle at 24% 74%, var(--contacts-bg-edge) 0, transparent 34%), var(--contacts-bg);
  color: var(--contacts-text);
  color-scheme: light;
  transition:
    background-color 300ms ease,
    color 300ms ease;
}

:global(html.dark) .contacts-section,
:global(.dark) .contacts-section,
.contacts-section[data-theme='dark'] {
  --contacts-bg: #050505;
  --contacts-bg-center: #111111;
  --contacts-bg-edge: #0a0a0a;
  --contacts-text: #fafafa;
  --contacts-muted: #a1a1aa;
  --contacts-border: rgb(255 255 255 / 12%);
  --contacts-border-strong: rgb(255 255 255 / 20%);
  --contacts-card: rgb(22 22 22 / 66%);
  --contacts-card-hover: rgb(34 34 34 / 72%);
  --contacts-input: rgb(5 5 5 / 34%);
  --contacts-grid: rgb(255 255 255 / 6%);
  --contacts-shadow: rgb(0 0 0 / 34%);

  color-scheme: dark;
}

.contacts-section::before {
  position: absolute;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  content: '';
  opacity: 0.42;
  background-image:
    radial-gradient(circle at 1px 1px, var(--contacts-text) 0 0.42px, transparent 0.72px),
    linear-gradient(var(--contacts-grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--contacts-grid) 1px, transparent 1px);
  background-size:
    18px 18px,
    88px 88px,
    88px 88px;
  mask-image: radial-gradient(circle at 54% 48%, #000 0, #000 48%, transparent 78%);
}

.contacts-container {
  width: min(1120px, calc(100% - 2rem));
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(340px, 1.05fr);
  gap: clamp(2rem, 6vw, 5rem);
  align-items: center;
}

.contacts-content {
  max-width: 620px;
}

.contacts-eyebrow {
  width: fit-content;
  margin: 0 0 1rem;
  padding: 0.45rem 0.7rem;
  border: 1px solid var(--contacts-border);
  border-radius: 999px;
  background: var(--contacts-card);
  color: var(--contacts-muted);
  font-size: 0.78rem;
  font-weight: 850;
  letter-spacing: 0;
  text-transform: uppercase;
  backdrop-filter: blur(10px);
  transition:
    border-color 300ms ease,
    background-color 300ms ease,
    color 300ms ease;
}

.contacts-title {
  margin: 0;
  color: var(--contacts-text);
  font-size: clamp(3rem, 6vw, 6.6rem);
  font-weight: 950;
  letter-spacing: 0;
  line-height: 0.94;
}

.contacts-subtitle {
  margin: 1.5rem 0 0;
  color: var(--contacts-muted);
  font-size: clamp(1.05rem, 1.6vw, 1.28rem);
  line-height: 1.7;
}

.contacts-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2.25rem;
}

.contacts-primary-link,
.contacts-secondary-link,
.contacts-submit {
  display: inline-flex;
  min-height: 3.15rem;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: 0 1.35rem;
  font-weight: 850;
  text-decoration: none;
  cursor: pointer;
  outline: none;
  transition:
    transform 300ms cubic-bezier(0.16, 1, 0.3, 1),
    border-color 300ms ease,
    background-color 300ms ease,
    color 300ms ease,
    box-shadow 300ms ease;
}

.contacts-primary-link,
.contacts-submit {
  border: 1px solid var(--contacts-border-strong);
  background: var(--contacts-text);
  color: var(--contacts-bg-center);
  box-shadow: 0 14px 38px var(--contacts-shadow);
}

.contacts-secondary-link {
  border: 1px solid var(--contacts-border);
  background: var(--contacts-card);
  color: var(--contacts-text);
  backdrop-filter: blur(10px);
}

.contacts-primary-link:hover,
.contacts-primary-link:focus-visible,
.contacts-secondary-link:hover,
.contacts-secondary-link:focus-visible,
.contacts-submit:hover,
.contacts-submit:focus-visible {
  box-shadow: 0 18px 46px var(--contacts-shadow);
  transform: translateY(-2px) scale(1.012);
}

.contacts-notes {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.85rem;
  margin: 2rem 0 0;
  padding: 0;
  list-style: none;
}

.contacts-notes li {
  position: relative;
  padding-left: 1.1rem;
  color: var(--contacts-muted);
  font-size: 0.95rem;
  line-height: 1.45;
}

.contacts-notes li::before {
  position: absolute;
  top: 0.6em;
  left: 0;
  width: 0.38rem;
  height: 0.38rem;
  border-radius: 50%;
  background: var(--contacts-text);
  content: '';
  opacity: 0.64;
}

.contacts-card {
  display: grid;
  gap: 1.5rem;
  padding: clamp(1rem, 2.5vw, 1.5rem);
  border: 1px solid var(--contacts-border);
  border-radius: 1.5rem;
  background: var(--contacts-card);
  box-shadow: 0 28px 80px var(--contacts-shadow);
  backdrop-filter: blur(16px);
  transition:
    transform 300ms ease,
    border-color 300ms ease,
    background-color 300ms ease,
    color 300ms ease,
    box-shadow 300ms ease;
}

.contacts-card:hover {
  border-color: var(--contacts-border-strong);
  background: var(--contacts-card-hover);
  box-shadow: 0 34px 92px var(--contacts-shadow);
  transform: translateY(-2px);
}

.contacts-form {
  display: grid;
  gap: 1rem;
}

.contacts-form-header h3,
.contacts-info h3 {
  margin: 0;
  color: var(--contacts-text);
  font-size: 1rem;
  font-weight: 900;
}

.contacts-form-header p {
  margin: 0.35rem 0 0;
  color: var(--contacts-muted);
  line-height: 1.55;
}

.contacts-field {
  display: grid;
  gap: 0.45rem;
}

.contacts-field span {
  color: var(--contacts-text);
  font-size: 0.9rem;
  font-weight: 800;
}

.contacts-field input,
.contacts-field textarea {
  width: 100%;
  border: 1px solid var(--contacts-border);
  border-radius: 0.9rem;
  background: var(--contacts-input);
  color: var(--contacts-text);
  color-scheme: inherit;
  font: inherit;
  padding: 0.85rem 0.95rem;
  outline: none;
  transition:
    border-color 280ms ease,
    background-color 280ms ease,
    color 280ms ease,
    box-shadow 280ms ease;
}

.contacts-field textarea {
  resize: vertical;
}

.contacts-field input:focus,
.contacts-field textarea:focus {
  border-color: var(--contacts-border-strong);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--contacts-text) 9%, transparent);
}

.contacts-submit {
  width: 100%;
  margin-top: 0.25rem;
}

.contacts-info {
  display: grid;
  gap: 1.35rem;
  padding-top: 1.35rem;
  border-top: 1px solid var(--contacts-border);
}

.contacts-link-list,
.contacts-socials {
  display: grid;
  gap: 0.65rem;
  margin-top: 0.8rem;
}

.contacts-socials {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.contacts-text-link,
.contacts-social-link {
  position: relative;
  width: fit-content;
  color: var(--contacts-muted);
  line-height: 1.45;
  text-decoration: none;
  transition:
    color 300ms ease,
    text-shadow 300ms ease,
    transform 300ms ease;
}

.contacts-text-link::after,
.contacts-social-link::after {
  position: absolute;
  right: 0;
  bottom: -0.2rem;
  left: 0;
  height: 1px;
  background: currentColor;
  content: '';
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 300ms ease;
}

.contacts-text-link:hover,
.contacts-text-link:focus-visible,
.contacts-social-link:hover,
.contacts-social-link:focus-visible {
  color: var(--contacts-text);
  text-shadow: 0 0 14px color-mix(in srgb, var(--contacts-text) 12%, transparent);
  transform: translateX(3px);
}

.contacts-text-link:hover::after,
.contacts-text-link:focus-visible::after,
.contacts-social-link:hover::after,
.contacts-social-link:focus-visible::after {
  transform: scaleX(1);
}

@media (max-width: 920px) {
  .contacts-container {
    grid-template-columns: 1fr;
    align-items: start;
  }

  .contacts-content {
    max-width: none;
  }
}

@media (max-width: 620px) {
  .contacts-section {
    padding: 4rem 0;
  }

  .contacts-actions,
  .contacts-primary-link,
  .contacts-secondary-link {
    width: 100%;
  }

  .contacts-notes,
  .contacts-socials {
    grid-template-columns: 1fr;
  }

  .contacts-card {
    border-radius: 1.1rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .contacts-card,
  .contacts-primary-link,
  .contacts-secondary-link,
  .contacts-submit,
  .contacts-field input,
  .contacts-field textarea,
  .contacts-eyebrow,
  .contacts-text-link,
  .contacts-text-link::after,
  .contacts-social-link,
  .contacts-social-link::after {
    transition: none;
  }
}
</style>
