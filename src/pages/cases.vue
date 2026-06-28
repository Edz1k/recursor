<script setup lang="ts">
defineOptions({
  name: 'CasesPage',
})

const cases = [
  {
    title: 'Лендинг продукта',
    description: 'Строгая первая страница с понятной навигацией, формой заявки и адаптивной структурой.',
  },
  {
    title: 'Кабинет сервиса',
    description: 'Интерфейс для повторяющихся рабочих сценариев: меньше декора, больше ясности.',
  },
  {
    title: 'Telegram-заявки',
    description: 'Форма с подготовленным payload под будущую отправку в Telegram-бота.',
  },
]

useHead({
  title: 'Кейсы — Recursor.kz',
})
</script>

<template>
  <main class="min-h-[60vh] bg-background px-4 py-18 text-foreground">
    <section class="mx-auto max-w-5xl space-y-8">
      <div class="space-y-4">
        <p class="text-sm text-muted font-800 tracking-wide uppercase">
          Кейсы
        </p>
        <h1 class="max-w-3xl text-4xl text-main font-900 leading-tight md:text-6xl">
          Несколько направлений, в которых мы уже закладываем основу.
        </h1>
      </div>

      <div class="grid gap-4 md:grid-cols-3">
        <article
          v-for="item in cases"
          :key="item.title"
          class="border border-border rounded-lg bg-surface p-5 transition duration-300 hover:bg-muted-surface"
        >
          <h2 class="text-xl font-800">
            {{ item.title }}
          </h2>
          <p class="mt-3 text-sm text-muted-foreground leading-6">
            {{ item.description }}
          </p>
        </article>
      </div>
    </section>
  </main>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
