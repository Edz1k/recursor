import {
  createLocalFontProcessor,
} from '@unocss/preset-web-fonts/local'
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['btn', 'inline-block cursor-pointer rounded bg-main px-4 py-1 text-main-foreground !outline-none transition duration-200 ease-in-out hover:bg-secondary disabled:cursor-default disabled:bg-muted disabled:opacity-50'],
    ['icon-btn', 'inline-block cursor-pointer select-none text-muted transition duration-200 ease-in-out hover:text-foreground hover:opacity-100'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),

    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
      processors: createLocalFontProcessor(),
    }),
  ],
  theme: {
    colors: {
      background: 'var(--color-background)',
      foreground: 'var(--color-foreground)',
      main: {
        DEFAULT: 'var(--color-main)',
        foreground: 'var(--color-main-foreground)',
      },
      secondary: {
        DEFAULT: 'var(--color-secondary)',
        foreground: 'var(--color-secondary-foreground)',
      },
      accent: {
        DEFAULT: 'var(--color-accent)',
        foreground: 'var(--color-accent-foreground)',
      },
      muted: {
        DEFAULT: 'var(--color-muted)',
        foreground: 'var(--color-muted-foreground)',
        surface: 'var(--color-muted-surface)',
      },
      surface: {
        DEFAULT: 'var(--color-surface)',
        elevated: 'var(--color-surface-elevated)',
      },
      border: 'var(--color-border)',
      ring: 'var(--color-ring)',
    },
  },
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: 'prose prose-sm m-auto text-left'.split(' '),
})
