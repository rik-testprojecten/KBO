'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  const router = useRouter()
  return (
    <div className="container-kbo py-24 text-center">
      <div className="max-w-md mx-auto">
        <p className="text-8xl font-bold text-kbo-blue-light mb-4 select-none">404</p>
        <h1 className="text-2xl font-bold text-kbo-blue mb-3">Pagina niet gevonden</h1>
        <p className="text-kbo-gray mb-8 leading-relaxed">
          De pagina die u zoekt bestaat niet (meer) of is verplaatst.
          Gebruik de zoekfunctie of ga terug naar de homepage.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary">
            <Home className="w-4 h-4" />
            Naar homepage
          </Link>
          <Link href="/zoeken" className="btn-secondary">
            <Search className="w-4 h-4" />
            Zoeken
          </Link>
        </div>
        <button onClick={() => router.back()} className="btn-ghost mt-4 inline-flex">
          <ArrowLeft className="w-4 h-4" />
          Terug
        </button>
      </div>
    </div>
  )
}
