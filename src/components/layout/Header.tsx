'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, Search, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  {
    label: 'Kennisbank',
    href: '/kennisbank',
    children: [
      { label: 'Alle artikelen',  href: '/kennisbank' },
      { label: 'Financiën & Control', href: '/kennisbank?thema=financien-control' },
      { label: 'HRM & Organisatie',   href: '/kennisbank?thema=hrm-organisatie' },
      { label: 'Inkoop & Aanbesteding', href: '/kennisbank?thema=inkoop-aanbesteding' },
      { label: 'Informatiemanagement', href: '/kennisbank?thema=informatiemanagement' },
    ],
  },
  { label: 'Tooling & Templates', href: '/tooling' },
  { label: 'Praktijkcases',       href: '/praktijkcases' },
  { label: 'Nieuws',              href: '/nieuws' },
  { label: 'Events',              href: '/events' },
  { label: 'Over KBO',            href: '/over-kbo' },
]

export default function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  return (
    <header className="bg-white border-b border-kbo-gray-border sticky top-0 z-50 shadow-sm">
      {/* Skip link */}
      <a href="#main-content" className="skip-link">Naar hoofdinhoud</a>

      {/* Top bar */}
      <div className="bg-kbo-blue text-white text-xs py-1.5">
        <div className="container-kbo flex items-center justify-between">
          <span>Kenniscentrum Bedrijfsvoering Overheid</span>
          <div className="flex items-center gap-4">
            <Link href="/contact" className="hover:underline">Contact</Link>
            <Link href="/nieuwsbrief" className="hover:underline">Nieuwsbrief</Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="container-kbo">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0" aria-label="KBO - terug naar home">
            <div className="w-10 h-10 bg-kbo-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm leading-none">KBO</span>
            </div>
            <div className="hidden sm:block">
              <p className="font-bold text-kbo-blue text-sm leading-tight">KBO</p>
              <p className="text-kbo-gray text-xs leading-tight">Kenniscentrum Bedrijfsvoering Overheid</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Hoofdnavigatie">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.href)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                    pathname.startsWith(item.href) && item.href !== '/'
                      ? 'text-kbo-teal bg-kbo-teal-light'
                      : 'text-kbo-gray hover:text-kbo-blue hover:bg-kbo-gray-light',
                  )}
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {item.label}
                  {item.children && <ChevronDown className="w-3.5 h-3.5 opacity-70" />}
                </Link>

                {item.children && openDropdown === item.href && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-kbo-gray-border py-1 animate-fade-in">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm text-kbo-gray hover:text-kbo-blue hover:bg-kbo-blue-light transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/zoeken"
              className="p-2 text-kbo-gray hover:text-kbo-blue hover:bg-kbo-gray-light rounded-lg transition-colors"
              aria-label="Zoeken"
            >
              <Search className="w-5 h-5" />
            </Link>
            <Link href="/contact" className="hidden md:inline-flex btn-primary text-sm py-2">
              Aanmelden
            </Link>
            <button
              className="lg:hidden p-2 text-kbo-gray hover:text-kbo-blue hover:bg-kbo-gray-light rounded-lg"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Menu sluiten' : 'Menu openen'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-kbo-gray-border bg-white animate-fade-in">
          <nav className="container-kbo py-4 flex flex-col gap-1" aria-label="Mobiele navigatie">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                  pathname.startsWith(item.href) && item.href !== '/'
                    ? 'text-kbo-teal bg-kbo-teal-light'
                    : 'text-kbo-gray hover:text-kbo-blue hover:bg-kbo-gray-light',
                )}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-kbo-gray-border">
              <Link href="/contact" className="btn-primary w-full justify-center text-sm" onClick={() => setMobileOpen(false)}>
                Aanmelden nieuwsbrief
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
