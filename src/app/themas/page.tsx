import type { Metadata } from 'next'
import ThemaCard from '@/components/blocks/ThemaCard'
import Breadcrumb from '@/components/layout/Breadcrumb'
import { DUMMY_THEMAS } from '@/lib/dummy-data'

export const metadata: Metadata = {
  title: "Thema's",
  description: "Verken alle thema's binnen bedrijfsvoering bij de overheid.",
}

export default function ThemasPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Thema's" }]} />
      <div className="bg-kbo-blue-light border-b border-kbo-gray-border">
        <div className="container-kbo py-10">
          <h1 className="text-3xl font-bold text-kbo-blue mb-2">Thema&apos;s</h1>
          <p className="text-kbo-gray">
            Verken kennis, tooling en praktijkcases per thema binnen bedrijfsvoering.
          </p>
        </div>
      </div>
      <div className="container-kbo py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {DUMMY_THEMAS.map((t) => (
            <ThemaCard key={t._id} thema={t} />
          ))}
        </div>
      </div>
    </>
  )
}
