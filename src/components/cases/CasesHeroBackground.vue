<script setup lang="ts">
interface HeroPreview {
  src: string
}

interface FloatingCard {
  id: string
  previewIndex: 0 | 1 | 2 | 3
  layer: 'far' | 'middle' | 'near'
  position: string
}

const props = defineProps<{
  previews: readonly [HeroPreview, HeroPreview, HeroPreview, HeroPreview]
}>()

const floatingCards: readonly FloatingCard[] = [
  { id: 'brillex-left', previewIndex: 0, layer: 'far', position: 'top-left' },
  { id: 'kontur-right', previewIndex: 1, layer: 'middle', position: 'top-right' },
  { id: 'amo-lower', previewIndex: 2, layer: 'far', position: 'bottom-left' },
  { id: 'mega-edge', previewIndex: 3, layer: 'near', position: 'middle-right' },
  { id: 'brillex-bottom', previewIndex: 0, layer: 'middle', position: 'bottom-right' },
  { id: 'kontur-edge', previewIndex: 1, layer: 'near', position: 'middle-left' },
  { id: 'amo-top', previewIndex: 2, layer: 'far', position: 'top-middle' },
] as const
</script>

<template>
  <div class="cases-floating-background" aria-hidden="true">
    <div class="cases-floating-grid" />
    <div
      v-for="card in floatingCards"
      :key="card.id"
      class="cases-floating-card"
      :class="[
        `cases-floating-card-${card.layer}`,
        `cases-floating-card-${card.position}`,
      ]"
    >
      <div class="cases-floating-card-frame">
        <div class="cases-floating-card-bar" />
        <img
          :src="props.previews[card.previewIndex].src"
          alt=""
          decoding="async"
          fetchpriority="low"
          draggable="false"
        >
      </div>
    </div>
    <div class="cases-floating-fade" />
  </div>
</template>

<style scoped>
.cases-floating-background {
  --case-preview-border: rgb(10 10 12 / 18%);
  --case-preview-surface: rgb(255 255 255 / 86%);
  --case-preview-shadow: rgb(20 30 55 / 18%);
  --case-preview-far-opacity: 0.22;
  --case-preview-middle-opacity: 0.34;
  --case-preview-near-opacity: 0.48;

  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  user-select: none;
}

:global(html.dark) .cases-floating-background {
  --case-preview-border: rgb(255 255 255 / 12%);
  --case-preview-surface: rgb(18 20 27 / 72%);
  --case-preview-shadow: rgb(0 0 0 / 34%);
  --case-preview-far-opacity: 0.12;
  --case-preview-middle-opacity: 0.21;
  --case-preview-near-opacity: 0.32;
}

.cases-floating-grid {
  position: absolute;
  inset: 0;
  opacity: 0.26;
  background-image:
    linear-gradient(to right, color-mix(in srgb, var(--color-border) 46%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in srgb, var(--color-border) 38%, transparent) 1px, transparent 1px);
  background-size: 5rem 5rem;
  mask-image: radial-gradient(ellipse 76% 78% at 50% 48%, #000 10%, transparent 78%);
}

.cases-floating-card {
  position: absolute;
  width: clamp(11rem, 18vw, 18rem);
  opacity: var(--case-preview-middle-opacity);
  transform: translate3d(0, 0, 0) rotate(var(--preview-rotate, 0deg));
  animation: cases-preview-float var(--preview-duration, 16s) ease-in-out var(--preview-delay, 0s) infinite;
  will-change: transform;
}

.cases-floating-card-frame {
  overflow: hidden;
  border: 1px solid var(--case-preview-border);
  border-radius: 0.8rem;
  background: var(--case-preview-surface);
  box-shadow:
    0 1px 2px rgb(0 0 0 / 4%),
    0 1.1rem 3rem var(--case-preview-shadow);
}

.cases-floating-card-bar {
  height: 0.75rem;
  border-bottom: 1px solid var(--case-preview-border);
  background: color-mix(in srgb, var(--case-preview-surface) 88%, var(--color-background));
}

.cases-floating-card img {
  display: block;
  width: 100%;
  aspect-ratio: 2.2 / 1;
  object-fit: cover;
  filter: saturate(0.88) contrast(0.96);
}

.cases-floating-card-far {
  opacity: var(--case-preview-far-opacity);
  filter: blur(1.5px);
}

.cases-floating-card-middle {
  opacity: var(--case-preview-middle-opacity);
}

.cases-floating-card-near {
  opacity: var(--case-preview-near-opacity);
}

.cases-floating-card-top-left {
  --preview-delay: -8s;
  --preview-duration: 17s;
  --preview-rotate: -6deg;
  --preview-x: 1.8rem;
  --preview-y: 1.35rem;

  top: 7%;
  left: 1.5rem;
}

.cases-floating-card-top-right {
  --preview-delay: -15s;
  --preview-duration: 15s;
  --preview-rotate: 4deg;
  --preview-x: -1.65rem;
  --preview-y: 1.45rem;

  top: 8%;
  right: 1rem;
  width: clamp(13rem, 21vw, 20rem);
}

.cases-floating-card-bottom-left {
  --preview-delay: -19s;
  --preview-duration: 19s;
  --preview-rotate: 3deg;
  --preview-x: 1.5rem;
  --preview-y: -1.4rem;

  bottom: 0.5rem;
  left: 15%;
  width: clamp(10rem, 15vw, 14rem);
}

.cases-floating-card-middle-right {
  --preview-delay: -4s;
  --preview-duration: 13s;
  --preview-rotate: -3deg;
  --preview-x: -1.9rem;
  --preview-y: 1.2rem;

  top: 42%;
  right: 4%;
  width: clamp(12rem, 17vw, 16rem);
}

.cases-floating-card-bottom-right {
  --preview-delay: -11s;
  --preview-duration: 16s;
  --preview-rotate: 5deg;
  --preview-x: -1.55rem;
  --preview-y: -1.6rem;

  right: 14%;
  bottom: -2rem;
  width: clamp(12rem, 18vw, 17rem);
}

.cases-floating-card-middle-left {
  --preview-delay: -14s;
  --preview-duration: 14s;
  --preview-rotate: -4deg;
  --preview-x: 1.9rem;
  --preview-y: -1.25rem;

  top: 45%;
  left: 1rem;
  width: clamp(12rem, 18vw, 17rem);
}

.cases-floating-card-top-middle {
  --preview-delay: -22s;
  --preview-duration: 18s;
  --preview-rotate: 2deg;
  --preview-x: -1.4rem;
  --preview-y: 1.35rem;

  top: -1.25rem;
  right: 20%;
  width: clamp(10rem, 14vw, 13rem);
}

.cases-floating-fade {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 58% 74% at 42% 47%, var(--color-background) 0 25%, transparent 68%),
    linear-gradient(
      to bottom,
      var(--color-background) 0,
      transparent 15%,
      transparent 78%,
      var(--color-background) 100%
    );
}

@keyframes cases-preview-float {
  0%,
  100% {
    transform: translate3d(-0.25rem, 0.15rem, 0) rotate(var(--preview-rotate, 0deg)) scale(0.985);
  }

  42% {
    transform: translate3d(var(--preview-x, 1.5rem), var(--preview-y, 1.25rem), 0) rotate(var(--preview-rotate, 0deg))
      scale(1.025);
  }

  74% {
    transform: translate3d(-0.65rem, -0.45rem, 0) rotate(var(--preview-rotate, 0deg)) scale(0.995);
  }
}

@media (max-width: 900px) {
  .cases-floating-card-bottom-left,
  .cases-floating-card-top-middle {
    display: none;
  }

  .cases-floating-card {
    width: clamp(10rem, 25vw, 14rem);
  }

  .cases-floating-card-bottom-right {
    right: 8%;
  }

  .cases-floating-fade {
    background:
      radial-gradient(ellipse 72% 76% at 42% 46%, var(--color-background) 0 34%, transparent 75%),
      linear-gradient(
        to bottom,
        var(--color-background) 0,
        transparent 18%,
        transparent 76%,
        var(--color-background) 100%
      );
  }
}

@media (max-width: 640px) {
  .cases-floating-background {
    --case-preview-far-opacity: 0.14;
    --case-preview-middle-opacity: 0.2;
    --case-preview-near-opacity: 0.27;
  }

  .cases-floating-card-top-right,
  .cases-floating-card-middle-right {
    display: none;
  }

  .cases-floating-card-top-left {
    top: 8%;
    left: -4rem;
  }

  .cases-floating-card-middle-left {
    top: auto;
    bottom: 8%;
    left: -4.5rem;
  }

  .cases-floating-card-bottom-right {
    right: -4rem;
    bottom: 12%;
  }

  .cases-floating-grid {
    opacity: 0.12;
    background-size: 3.5rem 3.5rem;
  }

  .cases-floating-fade {
    background:
      radial-gradient(ellipse 90% 72% at 44% 45%, var(--color-background) 0 42%, transparent 80%),
      linear-gradient(
        to bottom,
        var(--color-background) 0,
        transparent 18%,
        transparent 72%,
        var(--color-background) 100%
      );
  }
}

@media (prefers-reduced-motion: reduce) {
  .cases-floating-card {
    animation: none;
    will-change: auto;
  }
}
</style>
