<script setup lang="ts">
defineOptions({
  name: 'HelpPage',
})

const items = [
  'Нажмите «Обсудить проект», чтобы оставить имя и телефон.',
  'Номер вводится в казахстанском формате +7.',
  'После подключения backend форма сможет отправлять заявку в Telegram-бота.',
]

useHead({
  title: 'Справка — Recursor.kz',
})
</script>

<template>
  <main class="min-h-[60vh] bg-background px-4 py-18 text-foreground">
    <section class="mx-auto max-w-4xl space-y-8">
      <div class="space-y-4">
        <p class="text-sm text-muted font-800 tracking-wide uppercase">
          Справка
        </p>
        <h1 class="max-w-3xl text-4xl text-main font-900 leading-tight md:text-6xl">
          Коротко о текущем сценарии заявки.
        </h1>
      </div>

      <ol class="space-y-3">
        <li
          v-for="(item, index) in items"
          :key="item"
          class="flex gap-4 border border-border rounded-lg bg-surface p-4"
        >
          <span class="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-main text-sm text-main-foreground font-800">
            {{ index + 1 }}
          </span>
          <span class="pt-1 text-muted-foreground leading-6">{{ item }}</span>
        </li>
      </ol>
    </section>
  </main>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
