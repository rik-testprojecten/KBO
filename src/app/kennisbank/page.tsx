import type { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import ArticleCard from '@/components/blocks/ArticleCard'
import FilterBar from '@/components/blocks/FilterBar'
import Breadcrumb from '@/components/layout/Breadcrumb'
import { DUMMY_ARTIKELEN, DUMMY_THEMAS } from '@/lib/dummy-data'

export const metadata: Metadata = {
  title: 'Kennisbank',
  description: 'Handreikingen, artikelen en analyses voor professionals in bedrijfsvoering bij de overheid.',
}

export default function KennisbankPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Kennisbank' }]} />

      {/* Page header */}
      <div className="bg-kbo-blue-light border-b border-kbo-gray-border">
        <div className="container-kbo py-10">
          <h1 className="text-3xl font-bold text-kbo-blue mb-2">Kennisbank</h1>
          <p className="text-kbo-gray max-w-2xl">
            Handreikingen, artikelen, analyses en richtlijnen voor professionals in
            bedrijfsvoering bij gemeenten, provincies, waterschappen en rijksoverheid.
          </p>
        </div>
      </div>

      <div className="container-kbo py-8">
        {/* Filter bar */}
        <Suspense>
          <FilterBar themas={DUMMY_THEMAS} showTypeFilter={false} />
        </Suspense>

        {/* Results */}
        <div className="mt-6">
          <p className="text-sm text-kbo-gray mb-4">
            <strong className="text-kbo-blue">{DUMMY_ARTIKELEN.length}</strong> publicaties gevonden
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {DUMMY_ARTIKELEN.map((artikel) => (
              <ArticleCard key={artikel._id} artikel={artikel} />
            ))}
          </div>

          {/* Empty state (shown when no results) */}
          {DUMMY_ARTIKELEN.length === 0 && (
            <div className="text-center py-16">
              <p className="text-kbo-gray mb-3">Geen publicaties gevonden voor deze filters.</p>
              <Link href="/kennisbank" className="btn-ghost">Filters wissen</Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
