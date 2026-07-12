import type { ShallowRef } from 'vue'
import { onMounted, onUnmounted } from 'vue'
import { isDark } from '~/composables/dark'

interface MatrixColumn {
  x: number
  head: number
  speed: number
  len: number
  chars: string[]
  color: string
}

const CHARS = '01789{}[]()=+-*/;:.#_?!abcdefghijklmnopqrstuvwxyz'
const CHAR_W = 16
const CHAR_H = 18
const FS = 13

const DARK_PALETTE = ['#C792EA', '#C3E88D', '#82AAFF', '#89DDFF', '#FFCB6B', '#F78C6C', '#F07178', '#7FDBCA']
const LIGHT_PALETTE = ['#7C3AED', '#059669', '#2563EB', '#0891B2', '#B45309', '#EA580C', '#DC2626', '#0F766E']

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)]
}

function randomPick<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)]
}

export function useMatrixRain(canvasRef: Readonly<ShallowRef<HTMLCanvasElement | null>>) {
  let raf = 0
  let cols: MatrixColumn[] = []
  let width = 0
  let height = 0
  let rowCount = 0
  let lastTime = 0

  function buildColumns() {
    const palette = isDark.value ? DARK_PALETTE : LIGHT_PALETTE
    cols = Array.from({ length: Math.ceil(width / CHAR_W) }, (_, index) => {
      const len = 7 + Math.floor(Math.random() * 24)

      return {
        x: index * CHAR_W + CHAR_W * 0.3,
        head: -Math.floor(Math.random() * rowCount * 1.8),
        speed: 5 + Math.random() * 20,
        len,
        chars: Array.from({ length: len }, randomChar),
        color: randomPick(palette),
      }
    })
  }

  function resize() {
    const canvas = canvasRef.value
    if (!canvas)
      return

    const rect = canvas.getBoundingClientRect()
    width = rect.width
    height = rect.height
    rowCount = Math.ceil(height / CHAR_H) + 2
    canvas.width = width * devicePixelRatio
    canvas.height = height * devicePixelRatio
    buildColumns()
  }

  function draw(ts: number) {
    const canvas = canvasRef.value
    if (!canvas)
      return

    const ctx = canvas.getContext('2d')
    if (!ctx)
      return

    const dt = Math.min((ts - lastTime) / 1000, 0.05)
    lastTime = ts
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.save()
    ctx.scale(devicePixelRatio, devicePixelRatio)
    ctx.font = `${FS}px 'DM Mono', ui-monospace, monospace`

    const palette = isDark.value ? DARK_PALETTE : LIGHT_PALETTE
    const headColor = isDark.value ? '#f8fafc' : '#111827'
    const neckColor = isDark.value ? 'rgba(210,235,255,0.92)' : 'rgba(0,10,40,0.85)'

    for (const col of cols) {
      col.head += col.speed * dt

      if (Math.random() < 0.07)
        col.chars[Math.floor(Math.random() * col.len)] = randomChar()

      const headRow = Math.floor(col.head)

      for (let index = 0; index < col.len; index++) {
        const row = headRow - index
        if (row < 0 || row > rowCount)
          continue

        const fade = 1 - index / col.len
        ctx.globalAlpha = index === 0 ? 0.96 : fade * fade * 0.82
        ctx.fillStyle = index === 0 ? headColor : index === 1 ? neckColor : col.color
        ctx.fillText(col.chars[index % col.len], col.x, row * CHAR_H + FS)
      }

      if (headRow - col.len > rowCount) {
        col.head = -Math.floor(Math.random() * rowCount * 0.6)
        col.speed = 5 + Math.random() * 20
        col.len = 7 + Math.floor(Math.random() * 24)
        col.chars = Array.from({ length: col.len }, randomChar)
        col.color = randomPick(palette)
      }
    }

    ctx.restore()
    raf = requestAnimationFrame(draw)
  }

  onMounted(() => {
    resize()
    lastTime = performance.now()
    raf = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)
  })

  onUnmounted(() => {
    cancelAnimationFrame(raf)
    window.removeEventListener('resize', resize)
    cols = []
  })
}
