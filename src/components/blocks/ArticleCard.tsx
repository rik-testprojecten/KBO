import Link from 'next/link'
import { Clock, CalendarDays, ChevronRight } from 'lucide-react'
import { formatDate, CONTENT_TYPE_LABELS } from '@/lib/utils'
import type { Artikel } from '@/types/content'

interface ArticleCardProps {
  artikel: Artikel
  variant?: 'default' | 'compact' | 'featured'
}

export default function ArticleCard({ artikel, variant = 'default' }: ArticleCardProps) {
  const href = `/kennisbank/${artikel.slug}`

  if (variant === 'featured') {
    return (
      <Link href={href} className="card group block p-6 hover:border-kbo-teal transition-colors">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="badge-blue">{CONTENT_TYPE_LABELS.artikel}</span>
          {artikel.themas?.slice(0, 2).map((t) => (
            <span key={t._id} className="badge-teal">{t.title}</span>
          ))}
        </div>
        <h3 className="text-xl font-bold text-kbo-blue group-hover:text-kbo-teal transition-colors mb-2 text-balance">
          {artikel.titel}
        </h3>
        {artikel.tldr && (
          <div className="bg-kbo-blue-light rounded-lg px-3 py-2 mb-3 text-xs font-medium text-kbo-blue">
            <span className="font-bold">TL;DR —</span> {artikel.tldr}
          </div>
        )}
        <p className="text-sm text-kbo-gray leading-relaxed mb-4 line-clamp-3">
          {artikel.samenvatting}
        </p>
        <div className="flex items-center justify-between text-xs text-kbo-gray">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <CalendarDays className="w-3.5 h-3.5" />
              {formatDate(artikel.gepubliceerdOp)}
            </span>
            {artikel.leestijd && (
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {artikel.leestijd} min. leestijd
              </span>
            )}
          </div>
          <span className="flex items-center gap-1 text-kbo-teal font-medium group-hover:gap-2 transition-all">
            Lees meer <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </Link>
    )
  }

  if (variant === 'compact') {
    return (
      <Link href={href} className="group flex items-start gap-3 py-3 border-b border-kbo-gray-border last:border-0 hover:bg-kbo-gray-light -mx-2 px-2 rounded-lg transition-colors">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap gap-1.5 mb-1">
            {artikel.themas?.slice(0, 1).map((t) => (
              <span key={t._id} className="badge-teal text-[10px]">{t.title}</span>
            ))}
          </div>
          <p className="text-sm font-medium text-kbo-blue group-hover:text-kbo-teal transition-colors line-clamp-2">
            {artikel.titel}
          </p>
          <p className="text-xs text-kbo-gray mt-0.5">{formatDate(artikel.gepubliceerdOp)}</p>
        </div>
        <ChevronRight className="w-4 h-4 text-kbo-gray/50 flex-shrink-0 mt-1 group-hover:text-kbo-teal transition-colors" />
      </Link>
    )
  }

  return (
    <Link href={href} className="card group block p-5 hover:border-kbo-teal transition-colors">
      <div className="flex flex-wrap gap-2 mb-2">
        {artikel.themas?.slice(0, 2).map((t) => (
          <span key={t._id} className="badge-teal">{t.title}</span>
        ))}
      </div>
      <h3 className="font-bold text-kbo-blue group-hover:text-kbo-teal transition-colors mb-2 line-clamp-2 text-balance">
        {artikel.titel}
      </h3>
      <p className="text-sm text-kbo-gray line-clamp-2 mb-3">{artikel.samenvatting}</p>
      <div className="flex items-center gap-3 text-xs text-kbo-gray">
        <span className="flex items-center gap-1">
          <CalendarDays className="w-3.5 h-3.5" />
          {formatDate(artikel.gepubliceerdOp)}
        </span>
        {artikel.leestijd && (
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {artikel.leestijd} min.
          </span>
        )}
      </div>
    </Link>
  )
}
