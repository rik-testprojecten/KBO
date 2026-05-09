import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, Download, Briefcase, Calendar, ChevronRight } from 'lucide-react'
import ArticleCard from '@/components/blocks/ArticleCard'
import NewsCard from '@/components/blocks/NewsCard'
import EventCard from '@/components/blocks/EventCard'
import ThemaCard from '@/components/blocks/ThemaCard'
import NewsletterCTA from '@/components/blocks/NewsletterCTA'
import {
  DUMMY_THEMAS,
  DUMMY_ARTIKELEN,
  DUMMY_NIEUWS,
  DUMMY_EVENTS,
} from '@/lib/dummy-data'

export const metadata: Metadata = {
  title: 'KBO – Kenniscentrum Bedrijfsvoering Overheid',
  description: 'Hét platform voor kennis, tooling en praktijkcases op het gebied van bedrijfsvoering bij de Nederlandse overheid.',
  openGraph: {
    title: 'KBO – Kenniscentrum Bedrijfsvoering Overheid',
    description: 'Hét platform voor kennis, tooling en praktijkcases op het gebied van bedrijfsvoering bij de Nederlandse overheid.',
  },
}

const STATS = [
  { label: 'Publicaties',    value: '240+', icon: BookOpen },
  { label: 'Templates',      value: '80+',  icon: Download },
  { label: 'Praktijkcases',  value: '60+',  icon: Briefcase },
  { label: 'Events per jaar',value: '30+',  icon: Calendar },
]

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        className="bg-gradient-to-br from-kbo-blue via-kbo-blue to-[#1d5491] text-white py-16 lg:py-24"
        aria-labelledby="hero-heading"
      >
        <div className="container-kbo">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 text-sm mb-6">
              <span className="w-2 h-2 bg-kbo-gold rounded-full"></span>
              Hét kennisplatform voor de overheid
            </div>
            <h1 id="hero-heading" className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 text-balance">
              Kennis voor betere{' '}
              <span className="text-kbo-gold">bedrijfsvoering</span>{' '}
              bij de overheid
            </h1>
            <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-2xl text-balance">
              KBO is het centrale platform voor professionals in bedrijfsvoering bij gemeenten,
              provincies, waterschappen en rijksoverheid. Vind artikelen, tools, praktijkcases en
              events op uw vakgebied.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/kennisbank" className="btn-primary bg-white text-kbo-blue hover:bg-kbo-blue-light">
                Kennisbank verkennen
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/zoeken" className="btn-secondary border-white text-white hover:bg-white/10">
                Zoeken
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────── */}
      <section className="bg-kbo-blue-light border-b border-kbo-gray-border" aria-label="Statistieken">
        <div className="container-kbo py-8">
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map(({ label, value, icon: Icon }) => (
              <div key={label} className="text-center">
                <div className="w-10 h-10 bg-kbo-blue rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Icon className="w-5 h-5 text-white" aria-hidden />
                </div>
                <dt className="text-3xl font-bold text-kbo-blue">{value}</dt>
                <dd className="text-sm text-kbo-gray">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Thema's ───────────────────────────────────────────────────── */}
      <section className="container-kbo py-14" aria-labelledby="themas-heading">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 id="themas-heading" className="section-title">Thema&apos;s</h2>
            <p className="section-subtitle mb-0">Verken kennis per vakgebied</p>
          </div>
          <Link href="/themas" className="btn-ghost hidden sm:inline-flex">
            Alle thema&apos;s <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {DUMMY_THEMAS.map((thema) => (
            <ThemaCard key={thema._id} thema={thema} />
          ))}
        </div>
        <Link href="/themas" className="btn-ghost sm:hidden mt-4 inline-flex">
          Alle thema&apos;s <ChevronRight className="w-4 h-4" />
        </Link>
      </section>

      {/* ── Uitgelichte artikelen ─────────────────────────────────────── */}
      <section className="bg-kbo-gray-light py-14" aria-labelledby="artikelen-heading">
        <div className="container-kbo">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 id="artikelen-heading" className="section-title">Recente publicaties</h2>
              <p className="section-subtitle mb-0">Handreikingen, analyses en richtlijnen</p>
            </div>
            <Link href="/kennisbank" className="btn-ghost hidden sm:inline-flex">
              Kennisbank <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {DUMMY_ARTIKELEN.map((artikel, i) => (
              <ArticleCard key={artikel._id} artikel={artikel} variant={i === 0 ? 'featured' : 'default'} />
            ))}
          </div>
          <Link href="/kennisbank" className="btn-ghost sm:hidden mt-4 inline-flex">
            Naar kennisbank <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── Nieuws + Events (2-koloms) ────────────────────────────────── */}
      <section className="container-kbo py-14" aria-label="Nieuws en events">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Nieuws */}
          <div>
            <div className="flex items-end justify-between mb-5">
              <h2 className="section-title mb-0">Nieuws & Updates</h2>
              <Link href="/nieuws" className="btn-ghost text-sm">
                Meer nieuws <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              {DUMMY_NIEUWS.map((n) => (
                <NewsCard key={n._id} nieuws={n} />
              ))}
            </div>
          </div>

          {/* Events */}
          <div>
            <div className="flex items-end justify-between mb-5">
              <h2 className="section-title mb-0">Aankomende Events</h2>
              <Link href="/events" className="btn-ghost text-sm">
                Alle events <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              {DUMMY_EVENTS.map((e) => (
                <EventCard key={e._id} event={e} variant="compact" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Newsletter CTA ────────────────────────────────────────────── */}
      <section className="container-kbo pb-14">
        <NewsletterCTA />
      </section>
    </>
  )
}
