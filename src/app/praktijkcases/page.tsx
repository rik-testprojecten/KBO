import type { Metadata } from 'next'
import { Suspense } from 'react'
import CaseCard from '@/components/blocks/CaseCard'
import FilterBar from '@/components/blocks/FilterBar'
import Breadcrumb from '@/components/layout/Breadcrumb'
import { DUMMY_CASES, DUMMY_THEMAS } from '@/lib/dummy-data'

export const metadata: Metadata = {
  title: 'Praktijkcases',
  description: 'Leer van ervaringen van andere overheidsorganisaties. Praktijkcases met uitdaging, aanpak en resultaat.',
}

export default function PraktijkcasesPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Praktijkcases' }]} />
      <div className="bg-kbo-gold-light border-b border-kbo-gray-border">
        <div className="container-kbo py-10">
          <h1 className="text-3xl font-bold text-kbo-blue mb-2">Praktijkcases</h1>
          <p className="text-kbo-gray max-w-2xl">
            Leer van de ervaringen van collega-organisaties. Elke case beschrijft de
            uitdaging, aanpak, resultaten en geleerde lessen.
          </p>
        </div>
      </div>

      <div className="container-kbo py-8">
        <Suspense>
          <FilterBar themas={DUMMY_THEMAS} showTypeFilter={false} />
        </Suspense>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {DUMMY_CASES.map((c) => (
            <CaseCard key={c._id} praktijkcase={c} />
          ))}
        </div>
      </div>
    </>
  )
}
