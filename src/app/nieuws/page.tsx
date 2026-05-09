import type { Metadata } from 'next'
import NewsCard from '@/components/blocks/NewsCard'
import Breadcrumb from '@/components/layout/Breadcrumb'
import { DUMMY_NIEUWS } from '@/lib/dummy-data'

export const metadata: Metadata = {
  title: 'Nieuws & Updates',
  description: 'Laatste nieuws over bedrijfsvoering bij de overheid.',
}

export default function NieuwsPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Nieuws & Updates' }]} />
      <div className="bg-kbo-gray-light border-b border-kbo-gray-border">
        <div className="container-kbo py-10">
          <h1 className="text-3xl font-bold text-kbo-blue mb-2">Nieuws & Updates</h1>
          <p className="text-kbo-gray">Actuele berichten over bedrijfsvoering bij de overheid.</p>
        </div>
      </div>
      <div className="container-kbo py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {DUMMY_NIEUWS.map((n) => (
            <NewsCard key={n._id} nieuws={n} />
          ))}
        </div>
      </div>
    </>
  )
}
