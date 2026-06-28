<script setup lang="ts">
defineOptions({
  name: 'AboutPage',
})

useHead({
  title: 'О нас — Recursor.kz',
})
</script>

<template>
  <main class="min-h-[60vh] bg-background px-4 py-18 text-foreground">
    <section class="mx-auto max-w-4xl space-y-8">
      <div class="space-y-4">
        <p class="text-sm text-muted font-800 tracking-wide uppercase">
          О нас
        </p>
        <h1 class="max-w-3xl text-4xl text-main font-900 leading-tight md:text-6xl">
          Делаем строгие цифровые продукты без лишнего шума.
        </h1>
        <p class="max-w-2xl text-lg text-muted-foreground leading-8">
          Recursor.kz помогает запускать сайты, интерфейсы и продуктовые страницы, где важны скорость, аккуратная структура и понятная логика.
        </p>
      </div>

      <div class="grid gap-4 md:grid-cols-3">
        <div class="border border-border rounded-lg bg-surface p-5">
          <h2 class="text-lg font-800">
            Архитектура
          </h2>
          <p class="mt-2 text-sm text-muted-foreground leading-6">
            Компоненты, composables и стили раскладываются так, чтобы проект было легко развивать.
          </p>
        </div>
        <div class="border border-border rounded-lg bg-surface p-5">
          <h2 class="text-lg font-800">
            Интерфейсы
          </h2>
          <p class="mt-2 text-sm text-muted-foreground leading-6">
            Собираем понятные страницы, формы и навигацию на Vue, UnoCSS и headless UI.
          </p>
        </div>
        <div class="border border-border rounded-lg bg-surface p-5">
          <h2 class="text-lg font-800">
            Интеграции
          </h2>
          <p class="mt-2 text-sm text-muted-foreground leading-6">
            Готовим точки подключения для Telegram-ботов, CRM и других рабочих сервисов.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
