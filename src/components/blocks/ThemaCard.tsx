import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Thema } from '@/types/content'

interface ThemaCardProps {
  thema: Thema
}

export default function ThemaCard({ thema }: ThemaCardProps) {
  return (
    <Link
      href={`/themas/${thema.slug}`}
      className="group card block p-5 hover:border-kbo-teal transition-colors"
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 text-white text-lg font-bold"
        style={{ backgroundColor: thema.kleur ?? '#154273' }}
        aria-hidden
      >
        {thema.icoon ?? thema.title.charAt(0)}
      </div>
      <h3 className="font-semibold text-kbo-blue group-hover:text-kbo-teal transition-colors mb-1.5 text-balance">
        {thema.title}
      </h3>
      {thema.beschrijving && (
        <p className="text-xs text-kbo-gray line-clamp-2 mb-3">{thema.beschrijving}</p>
      )}
      <div className="flex items-center justify-between text-xs">
        {thema.artikelCount !== undefined && (
          <span className="text-kbo-gray">{thema.artikelCount} publicaties</span>
        )}
        <span className="flex items-center gap-1 text-kbo-teal font-medium group-hover:gap-2 transition-all ml-auto">
          Bekijk <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  )
}
