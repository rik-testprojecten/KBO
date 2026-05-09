import Link from 'next/link'
import { Mail, Phone, ExternalLink } from 'lucide-react'

const FOOTER_COLS = [
  {
    heading: 'Kennisbank',
    links: [
      { label: 'Artikelen',           href: '/kennisbank' },
      { label: 'Tooling & Templates', href: '/tooling' },
      { label: 'Praktijkcases',       href: '/praktijkcases' },
      { label: 'Alle thema\'s',        href: '/themas' },
    ],
  },
  {
    heading: 'Actueel',
    links: [
      { label: 'Nieuws & Updates', href: '/nieuws' },
      { label: 'Events & Webinars', href: '/events' },
      { label: 'Zoeken',          href: '/zoeken' },
    ],
  },
  {
    heading: 'Over KBO',
    links: [
      { label: 'Missie & werkwijze', href: '/over-kbo' },
      { label: 'Partners',           href: '/over-kbo#partners' },
      { label: 'Redactiebeleid',     href: '/over-kbo#redactie' },
      { label: 'Contact',            href: '/contact' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-kbo-blue text-white mt-16">
      <div className="container-kbo py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">KBO</span>
              </div>
              <div>
                <p className="font-bold text-sm leading-tight">KBO</p>
                <p className="text-white/70 text-xs">Kenniscentrum Bedrijfsvoering Overheid</p>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              Hét platform voor professionals in bedrijfsvoering bij de Nederlandse overheid.
            </p>
            <div className="flex flex-col gap-2 text-sm text-white/70">
              <a href="mailto:info@kbo.nl" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                info@kbo.nl
              </a>
              <a href="tel:+31702123456" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                070 - 212 34 56
              </a>
            </div>
          </div>

          {/* Nav columns */}
          {FOOTER_COLS.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm font-semibold text-white mb-3">{col.heading}</h3>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-kbo py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/50">
          <p>© {new Date().getFullYear()} KBO – Kenniscentrum Bedrijfsvoering Overheid</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacyverklaring</Link>
            <Link href="/toegankelijkheid" className="hover:text-white transition-colors">Toegankelijkheid</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link>
            <a
              href="https://www.rijksoverheid.nl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-white transition-colors"
            >
              Rijksoverheid.nl
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
