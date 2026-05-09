import type { Metadata } from 'next'
import '@/styles/globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kbo.nl'),
  title: {
    default: 'KBO – Kenniscentrum Bedrijfsvoering Overheid',
    template: '%s | KBO',
  },
  description:
    'Het centrale platform voor kennis, tools en praktijkcases op het gebied van bedrijfsvoering bij de Nederlandse overheid.',
  keywords: ['bedrijfsvoering', 'overheid', 'gemeente', 'kenniscentrum', 'financiën', 'HRM', 'inkoop', 'informatiemanagement'],
  authors: [{ name: 'KBO – Kenniscentrum Bedrijfsvoering Overheid' }],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    siteName: 'KBO – Kenniscentrum Bedrijfsvoering Overheid',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#154273" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main id="main-content" className="flex-1" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
