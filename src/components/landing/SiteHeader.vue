<script setup lang="ts">
import { useProjectDiscussDialog } from '~/composables/useProjectDiscussDialog'

const isMenuOpen = shallowRef(false)
const { isDiscussOpen, openDiscussDialog: openProjectDiscussDialog } = useProjectDiscussDialog()
const themeToggleLabel = computed(() => isDark.value ? 'Включить светлую тему' : 'Включить темную тему')

const navItems = [
  { name: 'Главная', path: '/' },
  { name: 'Кейсы', path: '/cases' },
  { name: 'О нас', path: '/about' },
  { name: 'Контакты', path: '/contacts' },
]

function closeMenu() {
  isMenuOpen.value = false
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function openDiscussDialog() {
  closeMenu()
  openProjectDiscussDialog()
}
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-border bg-background/92 backdrop-blur-xl">
    <div class="mx-auto max-w-7xl px-4 lg:px-8 sm:px-6">
      <nav class="h-18 flex items-center justify-between gap-6" aria-label="Основная навигация">
        <RouterLink
          to="/"
          class="brand-link group rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Recursor.kz на главную"
          @click="closeMenu"
        >
          <span class="brand-word" aria-label="Recursor.kz">
            <span class="brand-main">recursor</span><span class="brand-dot">.kz</span>
          </span>
        </RouterLink>

        <ul class="hidden items-center gap-1 md:flex">
          <li v-for="item in navItems" :key="item.path">
            <RouterLink
              :to="item.path"
              class="nav-link"
              @click="closeMenu"
            >
              <span class="nav-link-text" :data-text="item.name">
                <span>{{ item.name }}</span>
              </span>
            </RouterLink>
          </li>
        </ul>

        <div class="hidden items-center gap-3 md:flex">
          <RouterLink
            to="/help"
            class="h-10 inline-flex items-center justify-center rounded-lg px-3 text-sm text-muted-foreground font-700 outline-none transition duration-300 hover:bg-muted-surface hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
          >
            Справка
          </RouterLink>
          <button
            type="button"
            class="theme-toggle"
            :aria-label="themeToggleLabel"
            :title="themeToggleLabel"
            @click="toggleDark()"
          >
            <span v-if="isDark" class="i-carbon-moon text-lg" aria-hidden="true" />
            <span v-else class="i-carbon-sun text-lg" aria-hidden="true" />
          </button>
          <button
            type="button"
            class="h-10 inline-flex items-center justify-center rounded-lg bg-main px-4 text-sm text-main-foreground font-800 shadow-black/10 shadow-lg outline-none transition duration-300 hover:bg-secondary hover:text-secondary-foreground focus-visible:ring-2 focus-visible:ring-ring"
            @click="openDiscussDialog"
          >
            Обсудить проект
          </button>
        </div>

        <div class="flex items-center gap-2 md:hidden">
          <button
            type="button"
            class="theme-toggle"
            :aria-label="themeToggleLabel"
            :title="themeToggleLabel"
            @click="toggleDark()"
          >
            <span v-if="isDark" class="i-carbon-moon text-lg" aria-hidden="true" />
            <span v-else class="i-carbon-sun text-lg" aria-hidden="true" />
          </button>
          <button
            type="button"
            class="grid h-10 w-10 place-items-center border border-border rounded-lg bg-background text-foreground shadow-sm outline-none transition duration-300 hover:bg-muted-surface focus-visible:ring-2 focus-visible:ring-ring"
            :aria-expanded="isMenuOpen"
            aria-controls="mobile-navigation"
            aria-label="Открыть меню"
            @click="toggleMenu"
          >
            <span v-if="isMenuOpen" class="i-carbon-close text-xl" aria-hidden="true" />
            <span v-else class="i-carbon-menu text-xl" aria-hidden="true" />
          </button>
        </div>
      </nav>
    </div>

    <Transition name="mobile-menu">
      <div
        v-if="isMenuOpen"
        id="mobile-navigation"
        class="border-t border-border bg-background px-4 py-4 shadow-black/5 shadow-xl md:hidden"
      >
        <div class="mx-auto max-w-7xl space-y-2">
          <RouterLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="h-12 flex items-center justify-between rounded-lg bg-muted-surface px-4 text-sm text-foreground font-700 transition duration-300 hover:bg-surface-elevated"
            @click="closeMenu"
          >
            {{ item.name }}
            <span class="i-carbon-chevron-right" aria-hidden="true" />
          </RouterLink>

          <RouterLink
            to="/help"
            class="h-12 flex items-center justify-between rounded-lg bg-muted-surface px-4 text-sm text-foreground font-700 transition duration-300 hover:bg-surface-elevated"
            @click="closeMenu"
          >
            Справка
            <span class="i-carbon-help" aria-hidden="true" />
          </RouterLink>

          <button
            type="button"
            class="h-12 w-full rounded-lg bg-main px-4 text-sm text-main-foreground font-800 transition duration-300 hover:bg-secondary hover:text-secondary-foreground"
            @click="openDiscussDialog"
          >
            Обсудить проект
          </button>
        </div>
      </div>
    </Transition>

    <ProjectDiscussDialog v-model:open="isDiscussOpen" />
  </header>
</template>

<style scoped>
.brand-link {
  display: inline-flex;
  align-items: center;
  min-width: 9.5rem;
  transition: transform 260ms cubic-bezier(0.16, 1, 0.3, 1);
}

.brand-word {
  position: relative;
  display: inline-flex;
  align-items: baseline;
  letter-spacing: 0;
  line-height: 1;
  color: var(--color-main);
  transition:
    color 260ms ease,
    text-shadow 260ms ease;
}

.brand-link:hover,
.brand-link:focus-visible {
  transform: translateY(-1px);
}

.brand-link:hover .brand-word,
.brand-link:focus-visible .brand-word {
  color: var(--color-foreground);
  text-shadow: 0 0 14px color-mix(in srgb, var(--color-main) 26%, transparent);
}

.brand-main {
  font-size: 1.35rem;
  font-weight: 900;
}

.brand-dot {
  margin-left: 0.1rem;
  font-size: 1rem;
  font-weight: 800;
  color: var(--color-muted);
  transition:
    color 320ms ease,
    transform 320ms cubic-bezier(0.16, 1, 0.3, 1);
}

.brand-link:hover .brand-dot,
.brand-link:focus-visible .brand-dot {
  color: var(--color-foreground);
  transform: translateY(-0.08rem);
}

.nav-link {
  position: relative;
  display: inline-flex;
  height: 2.5rem;
  min-width: 5.25rem;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 0.625rem;
  padding: 0 0.85rem;
  color: var(--color-muted-foreground);
  font-size: 0.875rem;
  font-weight: 800;
  outline: none;
  transition:
    color 320ms ease,
    background-color 320ms ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  right: 0.85rem;
  bottom: 0.45rem;
  left: 0.85rem;
  height: 1px;
  background: var(--color-main);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 460ms cubic-bezier(0.16, 1, 0.3, 1);
}

.nav-link:hover,
.nav-link:focus-visible,
.nav-link.router-link-active {
  color: var(--color-foreground);
  background: var(--color-muted-surface);
}

.nav-link:hover::after,
.nav-link:focus-visible::after,
.nav-link.router-link-active::after {
  transform: scaleX(1);
  transform-origin: left;
}

.nav-link-text {
  position: relative;
  display: inline-flex;
  height: 1.25rem;
  overflow: hidden;
  line-height: 1.25rem;
}

.nav-link-text > span,
.nav-link-text::after {
  display: block;
  transition: transform 560ms cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}

.nav-link-text::after {
  content: attr(data-text);
  position: absolute;
  left: 0;
  top: 100%;
}

.nav-link:hover .nav-link-text > span,
.nav-link:focus-visible .nav-link-text > span {
  transform: translateY(-100%) rotateX(50deg);
}

.nav-link:hover .nav-link-text::after,
.nav-link:focus-visible .nav-link-text::after {
  transform: translateY(-100%) rotateX(0deg);
}

.theme-toggle {
  display: grid;
  width: 2.5rem;
  height: 2.5rem;
  place-items: center;
  border: 1px solid var(--color-border);
  border-radius: 0.625rem;
  background: var(--color-background);
  color: var(--color-foreground);
  box-shadow: 0 1px 2px rgb(0 0 0 / 6%);
  outline: none;
  transition:
    border-color 260ms ease,
    background-color 260ms ease,
    color 260ms ease,
    transform 260ms cubic-bezier(0.16, 1, 0.3, 1);
}

.theme-toggle:hover,
.theme-toggle:focus-visible {
  background: var(--color-muted-surface);
  border-color: var(--color-foreground);
  transform: translateY(-1px);
}

.theme-toggle:focus-visible {
  box-shadow: 0 0 0 2px var(--color-ring);
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition:
    opacity 220ms ease,
    transform 220ms ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-0.5rem);
}

@media (prefers-reduced-motion: reduce) {
  .brand-link,
  .brand-word,
  .brand-dot,
  .nav-link,
  .nav-link::after,
  .nav-link-text > span,
  .nav-link-text::after,
  .theme-toggle,
  .mobile-menu-enter-active,
  .mobile-menu-leave-active {
    transition: none;
  }
}
</style>
