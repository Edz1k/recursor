<script setup lang="ts">
const router = useRouter()

useHead({
  title: 'Страница не найдена — Recursor.kz',
})
</script>

<template>
  <main class="grid min-h-screen place-items-center bg-background px-4 text-center text-foreground">
    <div class="space-y-6">
      <p class="text-6xl text-main font-900">
        404
      </p>
      <h1 class="text-2xl font-800">
        Страница не найдена
      </h1>
      <p class="text-muted-foreground">
        Такой страницы не существует или она была удалена.
      </p>
      <div class="flex justify-center gap-3">
        <RouterLink
          to="/"
          class="h-10 inline-flex items-center rounded-lg bg-main px-4 text-sm text-main-foreground font-700 outline-none transition duration-200 hover:bg-secondary hover:text-secondary-foreground focus-visible:ring-2 focus-visible:ring-ring"
        >
          На главную
        </RouterLink>
        <button
          type="button"
          class="h-10 inline-flex items-center border border-border rounded-lg bg-background px-4 text-sm text-foreground font-700 outline-none transition duration-200 hover:bg-muted-surface focus-visible:ring-2 focus-visible:ring-ring"
          @click="router.back()"
        >
          Назад
        </button>
      </div>
    </div>
  </main>
</template>
