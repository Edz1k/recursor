<script setup lang="ts">
import AboutStudioSection from '~/components/AboutStudioSection.vue'

defineOptions({
  name: 'AboutPage',
})

useHead({
  title: 'О нас — Recursor.kz',
})
</script>

<template>
  <AboutStudioSection />
</template>

<route lang="yaml">
meta:
  layout: home
</route>
