import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, formatDistanceToNow, isPast } from 'date-fns'
import { nl } from 'date-fns/locale'
import type { ContentType, Doelgroep } from '@/types/content'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string, fmt = 'd MMMM yyyy') {
  return format(new Date(date), fmt, { locale: nl })
}

export function formatDateRelative(date: string) {
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: nl })
}

export function isEventPast(date: string) {
  return isPast(new Date(date))
}

export function readingTime(body: unknown[]): number {
  const text = body
    .flatMap((b: unknown) => {
      const block = b as { children?: Array<{ text?: string }> }
      return block?.children?.map((c) => c.text ?? '') ?? []
    })
    .join(' ')
  const words = text.split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  artikel:       'Artikel',
  template:      'Template',
  praktijkcase:  'Praktijkcase',
  nieuws:        'Nieuws',
  event:         'Event',
}

export const DOELGROEP_LABELS: Record<Doelgroep, string> = {
  gemeente:              'Gemeente',
  provincie:             'Provincie',
  waterschap:            'Waterschap',
  rijksoverheid:         'Rijksoverheid',
  uitvoeringsorganisatie:'Uitvoeringsorganisatie',
  zbo:                   'ZBO',
}

export const CONTENT_TYPE_COLORS: Record<ContentType, string> = {
  artikel:       'badge-blue',
  template:      'badge-teal',
  praktijkcase:  'badge-gold',
  nieuws:        'badge-gray',
  event:         'badge-red',
}

export function truncate(str: string, max: number) {
  return str.length > max ? `${str.slice(0, max - 1)}…` : str
}

export function buildSearchUrl(params: Record<string, string | undefined>) {
  const sp = new URLSearchParams()
  for (const [k, v] of Object.entries(params)) {
    if (v) sp.set(k, v)
  }
  const qs = sp.toString()
  return qs ? `/zoeken?${qs}` : '/zoeken'
}
