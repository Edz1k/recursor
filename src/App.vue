<script setup lang="ts">
useHead({
  title: 'Recursor.kz',
  meta: [
    {
      name: 'description',
      content: 'Разрабатываем сайты под любые задачи — от идеи до запуска и поддержки.',
    },
    {
      name: 'theme-color',
      content: () => isDark.value ? '#09090b' : '#ffffff',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: () => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg',
    },
  ],
})
</script>

<template>
  <RouterView />
</template>
