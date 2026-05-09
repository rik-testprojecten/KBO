'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { Search, X } from 'lucide-react'
import type { ContentType, Doelgroep, Thema } from '@/types/content'
import { CONTENT_TYPE_LABELS, DOELGROEP_LABELS } from '@/lib/utils'

interface FilterBarProps {
  themas?: Thema[]
  showTypeFilter?: boolean
  defaultType?: ContentType | 'all'
}

export default function FilterBar({
  themas = [],
  showTypeFilter = true,
  defaultType = 'all',
}: FilterBarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const q         = searchParams.get('q') ?? ''
  const type      = (searchParams.get('type') ?? defaultType) as ContentType | 'all'
  const thema     = searchParams.get('thema') ?? ''
  const doelgroep = searchParams.get('doelgroep') ?? ''

  const update = useCallback(
    (key: string, value: string) => {
      const sp = new URLSearchParams(searchParams.toString())
      if (value) sp.set(key, value)
      else sp.delete(key)
      sp.delete('page')
      router.push(`${pathname}?${sp.toString()}`)
    },
    [router, pathname, searchParams],
  )

  const hasFilters = q || (type !== defaultType) || thema || doelgroep

  function clear() {
    router.push(pathname)
  }

  return (
    <div className="bg-white border border-kbo-gray-border rounded-xl p-4 shadow-card">
      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-kbo-gray/60" aria-hidden />
        <input
          type="search"
          value={q}
          onChange={(e) => update('q', e.target.value)}
          placeholder="Zoek op trefwoord…"
          className="w-full pl-9 pr-4 py-2.5 text-sm border border-kbo-gray-border rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-kbo-teal focus:border-transparent
                     placeholder:text-kbo-gray/50"
          aria-label="Zoek op trefwoord"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Type */}
        {showTypeFilter && (
          <div>
            <label className="block text-xs font-medium text-kbo-gray mb-1">Type</label>
            <select
              value={type}
              onChange={(e) => update('type', e.target.value)}
              className="w-full text-sm border border-kbo-gray-border rounded-lg px-3 py-2 bg-white
                         focus:outline-none focus:ring-2 focus:ring-kbo-teal"
              aria-label="Filter op type"
            >
              <option value="all">Alle typen</option>
              {(Object.entries(CONTENT_TYPE_LABELS) as [ContentType, string][]).map(([v, l]) => (
                <option key={v} value={v}>{l}</option>
              ))}
            </select>
          </div>
        )}

        {/* Thema */}
        {themas.length > 0 && (
          <div>
            <label className="block text-xs font-medium text-kbo-gray mb-1">Thema</label>
            <select
              value={thema}
              onChange={(e) => update('thema', e.target.value)}
              className="w-full text-sm border border-kbo-gray-border rounded-lg px-3 py-2 bg-white
                         focus:outline-none focus:ring-2 focus:ring-kbo-teal"
              aria-label="Filter op thema"
            >
              <option value="">Alle thema&apos;s</option>
              {themas.map((t) => (
                <option key={t._id} value={t.slug}>{t.title}</option>
              ))}
            </select>
          </div>
        )}

        {/* Doelgroep */}
        <div>
          <label className="block text-xs font-medium text-kbo-gray mb-1">Doelgroep</label>
          <select
            value={doelgroep}
            onChange={(e) => update('doelgroep', e.target.value)}
            className="w-full text-sm border border-kbo-gray-border rounded-lg px-3 py-2 bg-white
                       focus:outline-none focus:ring-2 focus:ring-kbo-teal"
            aria-label="Filter op doelgroep"
          >
            <option value="">Alle doelgroepen</option>
            {(Object.entries(DOELGROEP_LABELS) as [Doelgroep, string][]).map(([v, l]) => (
              <option key={v} value={v}>{l}</option>
            ))}
          </select>
        </div>

        {/* Clear */}
        {hasFilters && (
          <div className="flex items-end">
            <button
              onClick={clear}
              className="flex items-center gap-1.5 text-sm text-kbo-red hover:text-red-700 font-medium transition-colors"
              aria-label="Filters wissen"
            >
              <X className="w-4 h-4" />
              Filters wissen
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
