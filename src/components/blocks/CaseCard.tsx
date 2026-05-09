import Link from 'next/link'
import { Building2, ChevronRight, CalendarDays } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { Praktijkcase } from '@/types/content'

interface CaseCardProps {
  praktijkcase: Praktijkcase
}

export default function CaseCard({ praktijkcase: c }: CaseCardProps) {
  return (
    <Link href={`/praktijkcases/${c.slug}`} className="card group block p-5 hover:border-kbo-teal transition-colors">
      <div className="flex flex-wrap gap-2 mb-2">
        <span className="badge-gold">Praktijkcase</span>
        {c.themas?.slice(0, 1).map((t) => (
          <span key={t._id} className="badge-teal">{t.title}</span>
        ))}
      </div>
      <h3 className="font-bold text-kbo-blue group-hover:text-kbo-teal transition-colors mb-2 line-clamp-2 text-balance">
        {c.titel}
      </h3>
      <p className="text-sm text-kbo-gray line-clamp-3 mb-3">{c.samenvatting}</p>
      <div className="flex items-center justify-between text-xs text-kbo-gray">
        <div className="flex items-center gap-3">
          {c.organisatie && (
            <span className="flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" />
              {c.organisatie.naam}
            </span>
          )}
          <span className="flex items-center gap-1">
            <CalendarDays className="w-3.5 h-3.5" />
            {formatDate(c.gepubliceerdOp)}
          </span>
        </div>
        <span className="flex items-center gap-1 text-kbo-teal font-medium group-hover:gap-2 transition-all">
          Lees case <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  )
}
