<script setup lang="ts">
import ContactsSection from '~/components/landing/ContactsSection.vue'

defineOptions({
  name: 'ContactsPage',
})

useHead({
  title: 'Контакты — Recursor.kz',
})
</script>

<template>
  <main>
    <ContactsSection />
  </main>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
