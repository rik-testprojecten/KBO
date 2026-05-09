import type { MetadataRoute } from 'next'

const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kbo.nl'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: base,                      lastModified: new Date(), changeFrequency: 'daily',   priority: 1.0 },
    { url: `${base}/kennisbank`,      lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
    { url: `${base}/tooling`,         lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/praktijkcases`,   lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/nieuws`,          lastModified: new Date(), changeFrequency: 'daily',   priority: 0.8 },
    { url: `${base}/events`,          lastModified: new Date(), changeFrequency: 'daily',   priority: 0.7 },
    { url: `${base}/themas`,          lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${base}/over-kbo`,        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/contact`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/zoeken`,          lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.6 },
  ]
  return staticPages
}
