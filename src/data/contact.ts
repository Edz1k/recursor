export interface ContactOption {
  label: string
  href: string
  description?: string
}

export const studioAddress = [
  'Алматы, ул. Ораза Жандосова, 98',
  'БЦ «Навои»',
  '7 этаж, офис 701',
] as const

export const studioPhones = [
  { label: '+7 707 485 23 28', href: 'tel:+77074852328' },
  { label: '+7 775 144 20 23', href: 'tel:+77751442023' },
] as const

export const studioEmail = {
  label: 'hello@recursor.kz',
  href: 'mailto:hello@recursor.kz',
} as const

export const messengerMessage = 'Здравствуйте! Хочу обратиться к команде Recursor по поводу разработки сайта или консультации.'

const encodedMessengerMessage = encodeURIComponent(messengerMessage)

export const whatsappOptions: ContactOption[] = [
  {
    label: '+7 707 485 23 28',
    description: 'Написать в WhatsApp',
    href: `https://wa.me/77074852328?text=${encodedMessengerMessage}`,
  },
  {
    label: '+7 775 144 20 23',
    description: 'Написать в WhatsApp',
    href: `https://wa.me/77751442023?text=${encodedMessengerMessage}`,
  },
]

export const telegramOptions: ContactOption[] = [
  {
    label: '+7 775 144 20 23',
    description: 'Личная переписка',
    href: `https://t.me/ed_1420?text=${encodedMessengerMessage}`,
  },
  {
    label: '+7 707 485 23 28',
    description: 'Личная переписка',
    href: `https://t.me/deyamt?text=${encodedMessengerMessage}`,
  },
]
