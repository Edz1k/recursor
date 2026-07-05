import { onMounted, onUnmounted } from 'vue'

interface UseScrollRevealOptions {
  selector?: string
  rootMargin?: string
  threshold?: number
}

export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const {
    selector = '[data-reveal]',
    rootMargin = '0px 0px -12% 0px',
    threshold = 0.18,
  } = options

  let observer: IntersectionObserver | undefined

  onMounted(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>(selector))

    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealElements.forEach(element => element.classList.add('is-revealed'))
      return
    }

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting)
          return

        entry.target.classList.add('is-revealed')
        observer?.unobserve(entry.target)
      })
    }, {
      rootMargin,
      threshold,
    })

    revealElements.forEach(element => observer?.observe(element))
  })

  onUnmounted(() => {
    observer?.disconnect()
  })
}
