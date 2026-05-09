import type { Metadata } from 'next'
import Breadcrumb from '@/components/layout/Breadcrumb'
import NewsletterCTA from '@/components/blocks/NewsletterCTA'
import { BookOpen, Users, Award, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Over KBO',
  description: 'Missie, werkwijze, partners en redactiebeleid van KBO – Kenniscentrum Bedrijfsvoering Overheid.',
}

const WAARDEN = [
  { icon: BookOpen, titel: 'Kwaliteit & betrouwbaarheid', tekst: 'Alle publicaties worden gereviewed door vakinhoudelijke experts en voldoen aan een duidelijk kwaliteitsraamwerk.' },
  { icon: Users,    titel: 'Community & samenwerking',    tekst: 'KBO wordt gedragen door en voor de overheidspraktijk. Professionals uit gemeenten, provincies en rijksoverheid dragen bij.' },
  { icon: Award,    titel: 'Actualiteit & relevantie',    tekst: 'Publicaties worden periodiek gereviewed op actualiteit. Verouderde content wordt gemarkeerd of gearchiveerd.' },
  { icon: Shield,   titel: 'Onafhankelijkheid',           tekst: 'KBO is een onafhankelijk kennisplatform zonder commerciële belangen. Transparant over financiering en governance.' },
]

export default function OverKBOPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Over KBO' }]} />

      {/* Hero */}
      <div className="bg-kbo-blue text-white py-14">
        <div className="container-kbo max-w-3xl">
          <h1 className="text-3xl font-bold text-white mb-4">Over KBO</h1>
          <p className="text-white/80 text-lg leading-relaxed">
            KBO – Kenniscentrum Bedrijfsvoering Overheid is hét centrale platform voor
            professionals die werken aan de bedrijfsvoering van gemeenten, provincies,
            waterschappen en rijksoverheidsorganisaties.
          </p>
        </div>
      </div>

      <div className="container-kbo py-12 max-w-5xl">
        {/* Missie */}
        <section className="mb-12" id="missie" aria-labelledby="missie-heading">
          <h2 id="missie-heading" className="section-title mb-3">Onze missie</h2>
          <div className="prose-kbo">
            <p>
              KBO heeft als missie om de kwaliteit van bedrijfsvoering bij de Nederlandse overheid
              structureel te verbeteren door het ontsluiten, delen en ontwikkelen van kennis,
              tools en praktijkervaring.
            </p>
            <p>
              Wij geloven dat sterke bedrijfsvoering — van financiën en HRM tot inkoop en
              informatiemanagement — een cruciale randvoorwaarde is voor goed bestuur en
              effectieve publieke dienstverlening.
            </p>
          </div>
        </section>

        {/* Waarden */}
        <section className="mb-12" aria-labelledby="waarden-heading">
          <h2 id="waarden-heading" className="section-title mb-6">Onze waarden</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WAARDEN.map(({ icon: Icon, titel, tekst }) => (
              <div key={titel} className="card p-5 flex gap-4">
                <div className="w-10 h-10 bg-kbo-blue-light rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-kbo-blue" aria-hidden />
                </div>
                <div>
                  <h3 className="font-semibold text-kbo-blue mb-1">{titel}</h3>
                  <p className="text-sm text-kbo-gray leading-relaxed">{tekst}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Redactiebeleid */}
        <section className="mb-12" id="redactie" aria-labelledby="redactie-heading">
          <h2 id="redactie-heading" className="section-title mb-3">Redactiebeleid</h2>
          <div className="prose-kbo">
            <p>
              KBO hanteert een duidelijk redactiebeleid om de kwaliteit en betrouwbaarheid van
              alle publicaties te waarborgen. Het publicatieproces bestaat uit drie fasen:
            </p>
            <ol>
              <li><strong>Concept:</strong> Inhoudelijk expert schrijft of draagt content aan.</li>
              <li><strong>Review:</strong> Vakinhoudelijke reviewer toetst op actualiteit, volledigheid en toon.</li>
              <li><strong>Publicatie:</strong> Eindredactie accordeert en publiceert met geldigheidsperiode.</li>
            </ol>
            <p>
              Publicaties worden minimaal eenmaal per jaar gereviewed. Verouderde of achterhaalde
              informatie wordt gemarkeerd, bijgewerkt of gearchiveerd.
            </p>
          </div>
        </section>

        {/* Partners placeholder */}
        <section className="mb-12" id="partners" aria-labelledby="partners-heading">
          <h2 id="partners-heading" className="section-title mb-3">Partners & bijdragers</h2>
          <p className="text-kbo-gray mb-6">
            KBO werkt samen met een breed netwerk van overheidsorganisaties, kennisinstituten
            en brancheorganisaties. Wilt u bijdragen aan KBO? Neem dan contact met ons op.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['VNG', 'IPO', 'UvW', 'BZK', 'ICTU', 'Rijksdienst', 'Waarderingskamer', 'ROA'].map((p) => (
              <div key={p} className="card p-4 text-center">
                <div className="w-12 h-12 bg-kbo-gray-light rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <span className="text-xs font-bold text-kbo-gray">{p.charAt(0)}</span>
                </div>
                <p className="text-sm font-medium text-kbo-blue">{p}</p>
                <p className="text-xs text-kbo-gray/70">Partner [placeholder]</p>
              </div>
            ))}
          </div>
        </section>

        <NewsletterCTA />
      </div>
    </>
  )
}
