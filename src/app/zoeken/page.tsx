import type { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import FilterBar from '@/components/blocks/FilterBar'
import Breadcrumb from '@/components/layout/Breadcrumb'
import { DUMMY_THEMAS, DUMMY_ARTIKELEN, DUMMY_NIEUWS, DUMMY_CASES, DUMMY_TEMPLATES } from '@/lib/dummy-data'
import { formatDate, CONTENT_TYPE_LABELS } from '@/lib/utils'
import type { ContentType } from '@/types/content'

export const metadata: Metadata = {
  title: 'Zoeken',
  description: 'Zoek in de volledige KBO kennisbank.',
  robots: { index: false },
}

const ALL_ITEMS = [
  ...DUMMY_ARTIKELEN.map((a) => ({ ...a, _type: 'artikel' as ContentType })),
  ...DUMMY_NIEUWS.map((n) => ({ ...n, _type: 'nieuws' as ContentType })),
  ...DUMMY_CASES.map((c) => ({ ...c, _type: 'praktijkcase' as ContentType })),
  ...DUMMY_TEMPLATES.map((t) => ({ ...t, _type: 'template' as ContentType })),
]

const TYPE_HREF: Record<ContentType, string> = {
  artikel:      '/kennisbank',
  nieuws:       '/nieuws',
  praktijkcase: '/praktijkcases',
  template:     '/tooling',
  event:        '/events',
}

export default function ZoekenPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Zoeken' }]} />
      <div className="bg-kbo-gray-light border-b border-kbo-gray-border">
        <div className="container-kbo py-10">
          <h1 className="text-3xl font-bold text-kbo-blue mb-2">Zoeken</h1>
          <p className="text-kbo-gray">Doorzoek de volledige KBO kennisbank op trefwoord, type en thema.</p>
        </div>
      </div>
      <div className="container-kbo py-8">
        <Suspense>
          <FilterBar themas={DUMMY_THEMAS} showTypeFilter defaultType="all" />
        </Suspense>

        <div className="mt-8 space-y-4">
          <p className="text-sm text-kbo-gray">
            <strong className="text-kbo-blue">{ALL_ITEMS.length}</strong> resultaten gevonden
          </p>
          {ALL_ITEMS.map((item) => (
            <Link
              key={item._id}
              href={`${TYPE_HREF[item._type]}/${item.slug}`}
              className="card group flex items-start justify-between gap-4 p-5 hover:border-kbo-teal transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-2 mb-1.5">
                  <span className="badge-blue">{CONTENT_TYPE_LABELS[item._type]}</span>
                  {item.themas?.slice(0, 2).map((t) => (
                    <span key={t._id} className="badge-teal">{t.title}</span>
                  ))}
                </div>
                <h2 className="font-semibold text-kbo-blue group-hover:text-kbo-teal transition-colors mb-1 text-balance">
                  {item.titel}
                </h2>
                <p className="text-sm text-kbo-gray line-clamp-2">{item.samenvatting}</p>
                <p className="text-xs text-kbo-gray/60 mt-2">{formatDate(item.gepubliceerdOp)}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-kbo-gray/40 flex-shrink-0 mt-1 group-hover:text-kbo-teal transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
