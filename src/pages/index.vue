<script setup lang="ts">
import HomeCtaSection from '~/components/landing/HomeCtaSection.vue'
import HomeHeroSection from '~/components/landing/HomeHeroSection.vue'
import HomeMarquee from '~/components/landing/HomeMarquee.vue'
import HomeProcessSection from '~/components/landing/HomeProcessSection.vue'
import HomeServicesSection from '~/components/landing/HomeServicesSection.vue'
import { useProjectDiscussDialog } from '~/composables/useProjectDiscussDialog'

defineOptions({ name: 'IndexPage' })

useHead({ title: 'Recursor.kz, Web Studio' })

const { isDiscussOpen, openDiscussDialog } = useProjectDiscussDialog()
</script>

<template>
  <HomeHeroSection @discuss="openDiscussDialog" />
  <HomeMarquee />
  <HomeServicesSection />
  <HomeProcessSection />
  <HomeCtaSection @discuss="openDiscussDialog" />

  <ProjectDiscussDialog v-model:open="isDiscussOpen" />
</template>

<route lang="yaml">
meta:
  layout: home
</route>
