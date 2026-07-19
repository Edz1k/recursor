import type { Config } from '@netlify/functions'
import type { ProjectLeadPayload } from '../../src/types'

const sourceLabels: Record<ProjectLeadPayload['source'], string> = {
  'navbar-discuss-project': 'Кнопка «Обсудить проект»',
  'pricing-card': 'Карточка тарифа',
  'contact-form': 'Форма в разделе контактов',
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function asText(value: unknown, maxLength = 200): string {
  if (typeof value !== 'string')
    return ''
  return value.trim().slice(0, maxLength)
}

function json(status: number, body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

export default async (req: Request) => {
  if (req.method !== 'POST')
    return json(405, { ok: false, error: 'Method Not Allowed' })

  const token = Netlify.env.get('TELEGRAM_BOT_TOKEN')
  const chatId = Netlify.env.get('TELEGRAM_CHAT_ID')

  if (!token || !chatId) {
    console.error('TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not configured')
    return json(500, { ok: false, error: 'Lead delivery is not configured' })
  }

  let body: Partial<ProjectLeadPayload>
  try {
    body = await req.json()
  }
  catch {
    return json(400, { ok: false, error: 'Invalid JSON body' })
  }

  const name = asText(body.name, 120)
  const phone = asText(body.phone, 120)

  if (!name || !phone)
    return json(400, { ok: false, error: 'Name and phone are required' })

  const source = typeof body.source === 'string' && body.source in sourceLabels
    ? sourceLabels[body.source]
    : 'Сайт'

  const lines = [
    '🆕 <b>Заявка с сайта Recursor</b>',
    '',
    `<b>Имя:</b> ${escapeHtml(name)}`,
    `<b>Контакт:</b> ${escapeHtml(phone)}`,
    `<b>Источник:</b> ${escapeHtml(source)}`,
  ]

  const projectType = asText(body.projectType)
  if (projectType)
    lines.push(`<b>Формат:</b> ${escapeHtml(projectType)}`)

  const estimatedPrice = asText(body.estimatedPrice)
  if (estimatedPrice)
    lines.push(`<b>Оценка:</b> ${escapeHtml(estimatedPrice)}`)

  const message = asText(body.message, 2000)
  if (message)
    lines.push(`<b>Задача:</b> ${escapeHtml(message)}`)

  const budget = asText(body.budget)
  if (budget)
    lines.push(`<b>Бюджет / сроки:</b> ${escapeHtml(budget)}`)

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: lines.join('\n'),
      parse_mode: 'HTML',
    }),
  })

  if (!response.ok) {
    console.error('Telegram sendMessage failed', response.status, await response.text())
    return json(502, { ok: false, error: 'Failed to deliver lead' })
  }

  return json(200, { ok: true })
}

export const config: Config = {
  path: '/api/lead',
}
