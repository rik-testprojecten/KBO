import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CalendarDays, Clock, RefreshCw, Tag, ChevronRight, AlertCircle } from 'lucide-react'
import Breadcrumb from '@/components/layout/Breadcrumb'
import ArticleCard from '@/components/blocks/ArticleCard'
import { DUMMY_ARTIKELEN } from '@/lib/dummy-data'
import { formatDate, DOELGROEP_LABELS } from '@/lib/utils'
import type { Doelgroep } from '@/types/content'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const artikel = DUMMY_ARTIKELEN.find((a) => a.slug === params.slug)
  if (!artikel) return { title: 'Niet gevonden' }
  return {
    title: artikel.titel,
    description: artikel.samenvatting,
    openGraph: { title: artikel.titel, description: artikel.samenvatting },
  }
}

export function generateStaticParams() {
  return DUMMY_ARTIKELEN.map((a) => ({ slug: a.slug }))
}

export default function ArtikelDetailPage({ params }: Props) {
  const artikel = DUMMY_ARTIKELEN.find((a) => a.slug === params.slug)
  if (!artikel) notFound()

  const gerelateerd = DUMMY_ARTIKELEN.filter(
    (a) => a._id !== artikel._id && a.themas.some((t) => artikel.themas.map((x) => x._id).includes(t._id)),
  ).slice(0, 3)

  return (
    <>
      <Breadcrumb items={[
        { label: 'Kennisbank', href: '/kennisbank' },
        { label: artikel.titel },
      ]} />

      <div className="container-kbo py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">
          {/* Main content */}
          <article itemScope itemType="https://schema.org/Article">
            {/* Badge row */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="badge-blue">Artikel</span>
              {artikel.themas.map((t) => (
                <Link key={t._id} href={`/themas/${t.slug}`} className="badge-teal hover:opacity-80 transition-opacity">
                  {t.title}
                </Link>
              ))}
              {artikel.reviewStatus === 'ok' && (
                <span className="badge bg-green-100 text-green-700 gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
                  Actueel & gereviewed
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-kbo-blue mb-4 text-balance" itemProp="headline">
              {artikel.titel}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-kbo-gray mb-6 pb-6 border-b border-kbo-gray-border">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4" />
                <time itemProp="datePublished" dateTime={artikel.gepubliceerdOp}>
                  {formatDate(artikel.gepubliceerdOp)}
                </time>
              </span>
              {artikel.bijgewerktOp !== artikel.gepubliceerdOp && (
                <span className="flex items-center gap-1.5">
                  <RefreshCw className="w-4 h-4" />
                  Bijgewerkt: {formatDate(artikel.bijgewerktOp)}
                </span>
              )}
              {artikel.leestijd && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {artikel.leestijd} min. leestijd
                </span>
              )}
              {artikel.eigenaar && (
                <span className="text-kbo-gray/70">Door: {artikel.eigenaar}</span>
              )}
            </div>

            {/* TL;DR */}
            {artikel.tldr && (
              <div className="bg-kbo-blue-light rounded-xl p-5 mb-6" role="note" aria-label="Samenvatting">
                <p className="text-xs font-bold text-kbo-blue uppercase tracking-wide mb-1">TL;DR — Kernboodschap</p>
                <p className="text-kbo-blue font-medium">{artikel.tldr}</p>
              </div>
            )}

            {/* Summary */}
            <p className="text-lg text-kbo-gray leading-relaxed mb-8 font-medium">
              {artikel.samenvatting}
            </p>

            {/* Body (placeholder) */}
            <div className="prose-kbo space-y-4" itemProp="articleBody">
              <div className="bg-kbo-gold-light rounded-xl p-5 flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-800 mb-1">Content placeholder</p>
                  <p className="text-sm text-amber-700">
                    De volledige artikeltekst wordt hier weergegeven zodra het CMS (Sanity) is
                    gekoppeld en de content is ingevoerd. Dit is een voorbeeldpagina die de
                    structuur en layout toont.
                  </p>
                </div>
              </div>

              <h2>Achtergrond en context</h2>
              <p>
                [Placeholder] Hier verschijnt de gestructureerde artikelinhoud inclusief
                inleiding, tussenkoppen, opsommingen, kaders en verwijzingen.
              </p>

              <h2>Praktische handvatten</h2>
              <p>[Placeholder] Concrete aanbevelingen en stappen voor uw organisatie.</p>
            </div>

            {/* Tags */}
            {artikel.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-kbo-gray-border">
                <div className="flex flex-wrap items-center gap-2">
                  <Tag className="w-4 h-4 text-kbo-gray" />
                  {artikel.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/zoeken?q=${encodeURIComponent(tag)}`}
                      className="badge-gray hover:bg-kbo-blue-light hover:text-kbo-blue transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Doelgroepen */}
            {artikel.doelgroepen.length > 0 && (
              <div className="mt-4">
                <p className="text-xs text-kbo-gray mb-2">Relevant voor:</p>
                <div className="flex flex-wrap gap-2">
                  {artikel.doelgroepen.map((d) => (
                    <span key={d} className="badge-blue">
                      {DOELGROEP_LABELS[d as Doelgroep]}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Gerelateerd */}
            {gerelateerd.length > 0 && (
              <div className="card p-5">
                <h2 className="text-base font-bold text-kbo-blue mb-3">Gerelateerde publicaties</h2>
                <div className="divide-y divide-kbo-gray-border">
                  {gerelateerd.map((a) => (
                    <ArticleCard key={a._id} artikel={a} variant="compact" />
                  ))}
                </div>
              </div>
            )}

            {/* Thema's */}
            <div className="card p-5">
              <h2 className="text-base font-bold text-kbo-blue mb-3">Thema&apos;s</h2>
              <div className="flex flex-col gap-2">
                {artikel.themas.map((t) => (
                  <Link
                    key={t._id}
                    href={`/themas/${t.slug}`}
                    className="flex items-center justify-between text-sm text-kbo-teal hover:text-kbo-teal-hover font-medium"
                  >
                    {t.title}
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Back */}
            <Link href="/kennisbank" className="btn-secondary w-full justify-center text-sm">
              ← Terug naar kennisbank
            </Link>
          </aside>
        </div>
      </div>
    </>
  )
}
