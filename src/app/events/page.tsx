import type { Metadata } from 'next'
import EventCard from '@/components/blocks/EventCard'
import Breadcrumb from '@/components/layout/Breadcrumb'
import { DUMMY_EVENTS } from '@/lib/dummy-data'

export const metadata: Metadata = {
  title: 'Events & Webinars',
  description: 'Aankomende events, webinars en masterclasses over bedrijfsvoering bij de overheid.',
}

export default function EventsPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Events & Webinars' }]} />
      <div className="bg-kbo-red-light border-b border-kbo-gray-border">
        <div className="container-kbo py-10">
          <h1 className="text-3xl font-bold text-kbo-blue mb-2">Events & Webinars</h1>
          <p className="text-kbo-gray max-w-2xl">
            Congressen, masterclasses, webinars en netwerkbijeenkomsten voor professionals
            in bedrijfsvoering bij de overheid.
          </p>
        </div>
      </div>
      <div className="container-kbo py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {DUMMY_EVENTS.map((e) => (
            <EventCard key={e._id} event={e} />
          ))}
        </div>
      </div>
    </>
  )
}
