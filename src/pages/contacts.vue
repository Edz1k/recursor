<script setup lang="ts">
defineOptions({
  name: 'ContactsPage',
})

useHead({
  title: 'Контакты — Recursor.kz',
})
</script>

<template>
  <main class="min-h-[60vh] bg-background px-4 py-18 text-foreground">
    <section class="mx-auto max-w-4xl space-y-8">
      <div class="space-y-4">
        <p class="text-sm text-muted font-800 tracking-wide uppercase">
          Контакты
        </p>
        <h1 class="max-w-3xl text-4xl text-main font-900 leading-tight md:text-6xl">
          Напишите нам, если нужно обсудить запуск проекта.
        </h1>
        <p class="max-w-2xl text-lg text-muted-foreground leading-8">
          Сейчас основной сценарий связи — кнопка «Обсудить проект» в навигации. Форма уже подготовлена под будущую отправку в Telegram-бота.
        </p>
      </div>

      <div class="border border-border rounded-lg bg-muted-surface p-5">
        <p class="text-sm text-muted-foreground">
          Скоро здесь появятся прямые контакты, Telegram и рабочее время.
        </p>
      </div>
    </section>
  </main>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
