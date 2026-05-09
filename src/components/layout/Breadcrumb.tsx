import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const all = [{ label: 'Home', href: '/' }, ...items]

  return (
    <nav aria-label="Broodkruimelpad" className="py-3 border-b border-kbo-gray-border bg-white">
      <div className="container-kbo">
        <ol
          className="flex flex-wrap items-center gap-1 text-sm text-kbo-gray"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          {all.map((item, i) => {
            const isLast = i === all.length - 1
            return (
              <li
                key={i}
                className="flex items-center gap-1"
                itemScope
                itemType="https://schema.org/ListItem"
                itemProp="itemListElement"
              >
                {i === 0 && <Home className="w-3.5 h-3.5" aria-hidden />}
                {i > 0 && <ChevronRight className="w-3.5 h-3.5 opacity-40" aria-hidden />}
                {isLast || !item.href ? (
                  <span
                    className="font-medium text-kbo-blue"
                    aria-current="page"
                    itemProp="name"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-kbo-blue hover:underline transition-colors"
                    itemProp="item"
                  >
                    <span itemProp="name">{item.label}</span>
                  </Link>
                )}
                <meta itemProp="position" content={String(i + 1)} />
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}
