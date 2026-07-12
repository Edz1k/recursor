import brillexPreview from '~/assets/cases/brillex/hero.png'
import konturPreview from '~/assets/cases/kontur/hero.png'
import megabetonPreview from '~/assets/cases/mega-beton/hero.png'

export const LANDING_MARQUEE = [
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
] as const

export const LANDING_SERVICES = [
  {
    num: '01',
    title: 'Разработка сайтов',
    desc: 'Лендинги, корпоративные сайты, личные бренды: с понятной структурой, анимациями и быстрой загрузкой.',
    tags: ['Лендинги', 'Корпоративные', 'Бренды'],
    preview: 'Kontur',
    previewClass: 'preview-site',
    image: konturPreview,
    imageAlt: 'Скриншот сайта Kontur с натяжными потолками',
  },
  {
    num: '02',
    title: 'Бизнес-решения',
    desc: 'Кабинеты, формы, интеграции с Telegram-ботами и CRM. Автоматизируем рутинные процессы.',
    tags: ['Формы', 'Telegram-боты', 'CRM'],
    preview: 'Brillex',
    previewClass: 'preview-business',
    image: brillexPreview,
    imageAlt: 'Скриншот сайта Brillex с CRM-системой',
  },
  {
    num: '03',
    title: 'Поддержка и развитие',
    desc: 'Не бросаем после запуска. Помогаем с доработками, обновлениями и масштабированием.',
    tags: ['Доработки', 'SEO', 'Масштабирование'],
    preview: 'Mega Beton',
    previewClass: 'preview-support',
    image: megabetonPreview,
    imageAlt: 'Скриншот сайта Mega Beton',
  },
] as const

export const LANDING_PROCESS = [
  { step: '01', label: 'Разбираем задачу', desc: 'Понимаем цели, аудиторию и что должен делать сайт.' },
  { step: '02', label: 'Проектируем', desc: 'Продумываем структуру, блоки и удобный путь клиента.' },
  { step: '03', label: 'Разрабатываем', desc: 'Собираем адаптивный сайт и подключаем нужную логику.' },
  { step: '04', label: 'Запускаем', desc: 'Проверяем, публикуем и подготавливаем сайт к рекламе.' },
] as const
