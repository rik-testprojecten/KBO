import type { Metadata } from 'next'
import { Suspense } from 'react'
import DownloadCard from '@/components/blocks/DownloadCard'
import FilterBar from '@/components/blocks/FilterBar'
import Breadcrumb from '@/components/layout/Breadcrumb'
import { DUMMY_TEMPLATES, DUMMY_THEMAS } from '@/lib/dummy-data'

export const metadata: Metadata = {
  title: 'Tooling & Templates',
  description: 'Download modellen, checklists, sjablonen en tools voor uw bedrijfsvoering.',
}

export default function ToolingPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Tooling & Templates' }]} />
      <div className="bg-kbo-teal-light border-b border-kbo-gray-border">
        <div className="container-kbo py-10">
          <h1 className="text-3xl font-bold text-kbo-blue mb-2">Tooling & Templates</h1>
          <p className="text-kbo-gray max-w-2xl">
            Direct inzetbare modellen, checklists, sjablonen en tools. Aanpasbaar aan de
            specifieke situatie van uw organisatie.
          </p>
        </div>
      </div>

      <div className="container-kbo py-8">
        <Suspense>
          <FilterBar themas={DUMMY_THEMAS} showTypeFilter={false} />
        </Suspense>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          {DUMMY_TEMPLATES.map((t) => (
            <DownloadCard key={t._id} template={t} />
          ))}
        </div>
      </div>
    </>
  )
}
