<script setup lang="ts">
interface Props {
  address: string[]
  office: string
  link: string
  label: string
}

const props = defineProps<Props>()

useScrollReveal({
  selector: '[data-contact-map-reveal]',
  threshold: 0.12,
})
</script>

<template>
  <section
    class="contact-map"
    data-contact-map-reveal
    aria-labelledby="contact-map-title"
  >
    <a
      class="contact-map-preview"
      :href="props.link"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Открыть расположение Recursor Web Studio в 2GIS"
      title="Открыть расположение Recursor Web Studio в 2GIS"
    >
      <span class="contact-map-grid" aria-hidden="true" />
      <span class="contact-map-road contact-map-road-main" aria-hidden="true" />
      <span class="contact-map-road contact-map-road-cross" aria-hidden="true" />
      <span class="contact-map-marker" aria-hidden="true">
        <span class="contact-map-marker-label">{{ props.label }}</span>
        <span class="contact-map-marker-pin" />
      </span>
      <span class="contact-map-provider">2GIS</span>
    </a>

    <div class="contact-map-details">
      <div class="contact-map-copy">
        <h3 id="contact-map-title">
          Recursor Web Studio
        </h3>
        <address>
          <span v-for="line in props.address" :key="line">{{ line }}</span>
          <span>{{ props.office }}</span>
        </address>
      </div>

      <a
        class="contact-map-link"
        :href="props.link"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Открыть адрес Recursor Web Studio в 2GIS"
      >
        Открыть в 2GIS
        <svg class="contact-map-link-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M14 5h5v5M19 5l-8 8M19 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4" />
        </svg>
      </a>
    </div>
  </section>
</template>

<style scoped>
.contact-map {
  min-width: 0;
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity 520ms ease,
    transform 520ms cubic-bezier(0.16, 1, 0.3, 1);
}

.contact-map.is-revealed {
  opacity: 1;
  transform: translateY(0);
}

.contact-map-preview {
  position: relative;
  display: block;
  height: 200px;
  overflow: hidden;
  border: 1px solid var(--contacts-border);
  border-radius: 1rem;
  background: var(--contacts-input);
  color: var(--contacts-text);
  outline: none;
  isolation: isolate;
  transition:
    border-color 280ms ease,
    transform 280ms cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 280ms ease;
}

.contact-map-preview > * {
  pointer-events: none;
}

.contact-map-preview:hover,
.contact-map-preview:focus-visible {
  border-color: var(--contacts-border-strong);
  box-shadow: 0 14px 34px var(--contacts-shadow);
  transform: translateY(-2px) scale(1.008);
}

.contact-map-preview:focus-visible,
.contact-map-link:focus-visible {
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--contacts-text) 12%, transparent);
}

.contact-map-grid {
  position: absolute;
  inset: 0;
  z-index: -3;
  opacity: 0.55;
  background-image:
    linear-gradient(28deg, transparent 46%, var(--contacts-border) 47% 49%, transparent 50%),
    linear-gradient(118deg, transparent 46%, var(--contacts-border) 47% 49%, transparent 50%);
  background-size: 72px 72px;
}

.contact-map-road {
  position: absolute;
  z-index: -2;
  display: block;
  background: var(--contacts-card-hover);
  box-shadow: 0 0 0 1px var(--contacts-border);
}

.contact-map-road-main {
  top: 46%;
  right: -12%;
  left: -12%;
  height: 24px;
  transform: rotate(-12deg);
}

.contact-map-road-cross {
  top: -30%;
  bottom: -30%;
  left: 58%;
  width: 18px;
  transform: rotate(18deg);
}

.contact-map-marker {
  position: absolute;
  top: 43%;
  left: 56%;
  display: grid;
  justify-items: center;
  transform: translate(-50%, -100%);
}

.contact-map-marker-label {
  min-width: 2.25rem;
  padding: 0.28rem 0.46rem;
  border-radius: 999px;
  background: var(--contacts-text);
  color: var(--contacts-bg-center);
  font-size: 0.7rem;
  font-weight: 900;
  line-height: 1;
  text-align: center;
  box-shadow: 0 8px 22px var(--contacts-shadow);
  transition: transform 280ms cubic-bezier(0.16, 1, 0.3, 1);
}

.contact-map-preview:hover .contact-map-marker-label,
.contact-map-preview:focus-visible .contact-map-marker-label {
  transform: translateY(-2px);
}

.contact-map-marker-pin {
  width: 2px;
  height: 18px;
  background: var(--contacts-text);
}

.contact-map-provider {
  position: absolute;
  right: 0.65rem;
  bottom: 0.65rem;
  padding: 0.3rem 0.48rem;
  border: 1px solid var(--contacts-border);
  border-radius: 0.55rem;
  background: var(--contacts-card);
  color: var(--contacts-muted);
  font-size: 0.72rem;
  font-weight: 850;
  line-height: 1;
  backdrop-filter: blur(8px);
}

.contact-map-details {
  display: grid;
  gap: 1rem;
  margin-top: 1.25rem;
}

.contact-map-copy h3 {
  margin: 0;
  color: var(--contacts-text);
  font-size: 1rem;
  font-weight: 900;
}

.contact-map-copy address {
  display: grid;
  gap: 0.18rem;
  margin-top: 0.55rem;
  color: var(--contacts-muted);
  font-style: normal;
  line-height: 1.45;
}

.contact-map-link {
  display: inline-flex;
  width: fit-content;
  min-height: 2.75rem;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  border: 1px solid var(--contacts-border);
  border-radius: 999px;
  padding: 0 1rem;
  background: var(--contacts-card);
  color: var(--contacts-text);
  font-weight: 850;
  text-decoration: none;
  outline: none;
  transition:
    border-color 280ms ease,
    background-color 280ms ease,
    transform 280ms cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 280ms ease;
}

.contact-map-link-icon {
  width: 1rem;
  height: 1rem;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.8;
  transition: transform 280ms cubic-bezier(0.16, 1, 0.3, 1);
}

.contact-map-link:hover,
.contact-map-link:focus-visible {
  border-color: var(--contacts-border-strong);
  background: var(--contacts-card-hover);
  transform: translateY(-1px);
}

.contact-map-link:hover .contact-map-link-icon,
.contact-map-link:focus-visible .contact-map-link-icon {
  transform: translate(1px, -1px);
}

@media (max-width: 620px) {
  .contact-map-preview {
    height: 210px;
  }

  .contact-map-link {
    width: 100%;
    min-height: 3rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .contact-map,
  .contact-map-preview,
  .contact-map-marker-label,
  .contact-map-link,
  .contact-map-link-icon {
    transition: none;
  }

  .contact-map {
    opacity: 1;
    transform: none;
  }
}
</style>
