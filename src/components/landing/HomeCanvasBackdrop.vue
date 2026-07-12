<script setup lang="ts">
import { useMatrixRain } from '~/composables/useMatrixRain'

const canvasRef = useTemplateRef<HTMLCanvasElement>('canvas')

useMatrixRain(canvasRef)
</script>

<template>
  <div class="canvas-backdrop" aria-hidden="true">
    <canvas ref="canvas" class="canvas-backdrop-rain" />
    <div class="canvas-backdrop-grid" />
    <div class="canvas-backdrop-glow" />
    <div class="canvas-backdrop-vignette" />
  </div>
</template>

<style scoped>
.canvas-backdrop {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.canvas-backdrop-rain,
.canvas-backdrop-grid,
.canvas-backdrop-glow,
.canvas-backdrop-vignette {
  position: absolute;
  inset: 0;
}

.canvas-backdrop-rain {
  width: 100%;
  height: 100%;
}

.canvas-backdrop-grid {
  opacity: 0.2;
  background-image:
    linear-gradient(to right, color-mix(in srgb, var(--color-foreground) 8%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in srgb, var(--color-foreground) 8%, transparent) 1px, transparent 1px);
  background-size: 4rem 4rem;
  mask-image: radial-gradient(circle at 52% 44%, black 0%, transparent 66%);
}

.canvas-backdrop-glow {
  opacity: 0.62;
  background:
    radial-gradient(circle at 18% 26%, color-mix(in srgb, var(--color-main) 16%, transparent), transparent 30%),
    radial-gradient(circle at 72% 18%, color-mix(in srgb, var(--color-foreground) 12%, transparent), transparent 28%);
  filter: blur(18px);
}

.canvas-backdrop-vignette {
  background:
    linear-gradient(90deg, var(--color-background) 0%, transparent 32%, transparent 68%, var(--color-background) 100%),
    radial-gradient(
      ellipse 68% 82% at 50% 50%,
      var(--color-background) 0%,
      color-mix(in srgb, var(--color-background) 82%, transparent) 38%,
      transparent 100%
    );
  opacity: 0.88;
}

@media (prefers-reduced-motion: reduce) {
  .canvas-backdrop-rain {
    display: none;
  }

  .canvas-backdrop-grid {
    opacity: 0.14;
  }
}
</style>
