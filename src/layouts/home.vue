<script setup lang="ts">
import SiteFooter from '~/components/landing/SiteFooter.vue'
import SiteHeader from '~/components/landing/SiteHeader.vue'
</script>

<template>
  <div class="home-layout">
    <SiteHeader />
    <RouterView />
    <SiteFooter />
  </div>
</template>
