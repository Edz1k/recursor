<script setup lang="ts">
import { Motion } from 'motion-v'
import { LANDING_MARQUEE } from '~/data/landing'
</script>

<template>
  <Motion
    :initial="{ opacity: 0 }"
    :while-in-view="{ opacity: 1 }"
    :transition="{ duration: 0.6 }"
    :viewport="{ once: true }"
  >
    <div class="marquee-wrap" aria-hidden="true">
      <div class="marquee-track">
        <span v-for="(item, index) in [...LANDING_MARQUEE, ...LANDING_MARQUEE]" :key="index" class="marquee-item">
          {{ item }}<span class="marquee-sep" />
        </span>
      </div>
    </div>
  </Motion>
</template>

<style scoped>
.marquee-wrap {
  overflow: hidden;
  padding: 0.875rem 0;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  background: linear-gradient(
    90deg,
    var(--section-canvas-deep),
    var(--section-canvas-muted) 50%,
    var(--section-canvas-deep)
  );
  mask-image: linear-gradient(to right, transparent, #111 8%, #111 92%, transparent);
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee-scroll 28s linear infinite;
}

.marquee-item {
  display: inline-flex;
  align-items: center;
  padding: 0 0.25rem;
  color: var(--color-muted-foreground);
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  white-space: nowrap;
}

.marquee-sep {
  display: inline-block;
  width: 4px;
  height: 4px;
  margin: 0 1.25rem;
  border-radius: 50%;
  background: var(--color-border);
  flex-shrink: 0;
}

@keyframes marquee-scroll {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none;
  }
}
</style>
