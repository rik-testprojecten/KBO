import Link from 'next/link'
import { CalendarDays, ChevronRight } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { Nieuwsbericht } from '@/types/content'

interface NewsCardProps {
  nieuws: Nieuwsbericht
  variant?: 'default' | 'compact'
}

export default function NewsCard({ nieuws, variant = 'default' }: NewsCardProps) {
  const href = `/nieuws/${nieuws.slug}`

  if (variant === 'compact') {
    return (
      <Link href={href} className="group flex items-start gap-2 py-3 border-b border-kbo-gray-border last:border-0">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-kbo-blue group-hover:text-kbo-teal transition-colors line-clamp-2">
            {nieuws.titel}
          </p>
          <p className="text-xs text-kbo-gray mt-0.5">{formatDate(nieuws.gepubliceerdOp)}</p>
        </div>
        <ChevronRight className="w-4 h-4 text-kbo-gray/40 flex-shrink-0 mt-0.5 group-hover:text-kbo-teal transition-colors" />
      </Link>
    )
  }

  return (
    <Link href={href} className="card group block p-5 hover:border-kbo-teal transition-colors">
      <div className="flex flex-wrap gap-2 mb-2">
        <span className="badge-gray">Nieuws</span>
        {nieuws.themas?.slice(0, 1).map((t) => (
          <span key={t._id} className="badge-teal">{t.title}</span>
        ))}
      </div>
      <h3 className="font-bold text-kbo-blue group-hover:text-kbo-teal transition-colors mb-2 line-clamp-2 text-balance">
        {nieuws.titel}
      </h3>
      <p className="text-sm text-kbo-gray line-clamp-2 mb-3">{nieuws.samenvatting}</p>
      <div className="flex items-center justify-between text-xs text-kbo-gray">
        <span className="flex items-center gap-1">
          <CalendarDays className="w-3.5 h-3.5" />
          {formatDate(nieuws.gepubliceerdOp)}
        </span>
        <span className="flex items-center gap-1 text-kbo-teal font-medium group-hover:gap-2 transition-all">
          Lees meer <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  )
}
