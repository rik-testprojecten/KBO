import Link from 'next/link'
import { CalendarDays, MapPin, Monitor, ExternalLink } from 'lucide-react'
import { formatDate, isEventPast } from '@/lib/utils'
import type { Event } from '@/types/content'

interface EventCardProps {
  event: Event
  variant?: 'default' | 'compact'
}

export default function EventCard({ event, variant = 'default' }: EventCardProps) {
  const href = `/events/${event.slug}`
  const past = isEventPast(event.startdatum)

  if (variant === 'compact') {
    return (
      <Link href={href} className="group flex items-start gap-3 py-3 border-b border-kbo-gray-border last:border-0">
        <div className="flex-shrink-0 w-12 text-center bg-kbo-blue-light rounded-lg py-1">
          <p className="text-lg font-bold text-kbo-blue leading-tight">
            {new Date(event.startdatum).getDate()}
          </p>
          <p className="text-[10px] text-kbo-blue/70 uppercase font-medium">
            {new Date(event.startdatum).toLocaleString('nl-NL', { month: 'short' })}
          </p>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-kbo-blue group-hover:text-kbo-teal transition-colors line-clamp-2">
            {event.titel}
          </p>
          <p className="text-xs text-kbo-gray mt-0.5 flex items-center gap-1">
            {event.online ? (
              <><Monitor className="w-3 h-3" /> Online</>
            ) : (
              <><MapPin className="w-3 h-3" /> {event.locatie}</>
            )}
          </p>
        </div>
      </Link>
    )
  }

  return (
    <div className={`card p-5 ${past ? 'opacity-70' : ''}`}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-14 text-center bg-kbo-blue rounded-xl py-2">
          <p className="text-xl font-bold text-white leading-tight">
            {new Date(event.startdatum).getDate()}
          </p>
          <p className="text-[11px] text-white/80 uppercase font-medium">
            {new Date(event.startdatum).toLocaleString('nl-NL', { month: 'short' })}
          </p>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap gap-2 mb-1.5">
            {event.online
              ? <span className="badge-teal">Online</span>
              : <span className="badge-blue">Fysiek</span>
            }
            {past && <span className="badge-gray">Verstreken</span>}
            {event.themas?.slice(0, 1).map((t) => (
              <span key={t._id} className="badge-gold">{t.title}</span>
            ))}
          </div>
          <Link href={href}>
            <h3 className="font-bold text-kbo-blue hover:text-kbo-teal transition-colors text-balance mb-1">
              {event.titel}
            </h3>
          </Link>
          <p className="text-sm text-kbo-gray line-clamp-2 mb-3">{event.samenvatting}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-kbo-gray">
            <span className="flex items-center gap-1">
              <CalendarDays className="w-3.5 h-3.5" />
              {formatDate(event.startdatum)}
              {event.starttijd && ` · ${event.starttijd}`}
              {event.eindtijd && ` – ${event.eindtijd}`}
            </span>
            <span className="flex items-center gap-1">
              {event.online
                ? <><Monitor className="w-3.5 h-3.5" /> {event.locatie}</>
                : <><MapPin className="w-3.5 h-3.5" /> {event.locatie}</>
              }
            </span>
          </div>
          {event.aanmeldUrl && !past && (
            <a
              href={event.aanmeldUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs py-1.5 px-3 mt-3 inline-flex"
            >
              Aanmelden <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
