export type ContentStatus = 'draft' | 'review' | 'published' | 'archived'
export type ContentType = 'artikel' | 'template' | 'praktijkcase' | 'nieuws' | 'event'
export type Doelgroep =
  | 'gemeente'
  | 'provincie'
  | 'waterschap'
  | 'rijksoverheid'
  | 'uitvoeringsorganisatie'
  | 'zbo'

export interface Thema {
  _id: string
  title: string
  slug: string
  beschrijving?: string
  kleur?: string
  icoon?: string
  artikelCount?: number
}

export interface Auteur {
  _id: string
  naam: string
  functie?: string
  organisatie?: string
  avatar?: SanityImage
}

export interface Organisatie {
  _id: string
  naam: string
  type: 'gemeente' | 'provincie' | 'waterschap' | 'rijksoverheid' | 'partner' | 'overig'
  logo?: SanityImage
  website?: string
}

export interface SanityImage {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  alt?: string
  caption?: string
}

export interface Bijlage {
  _key: string
  titel: string
  bestandstype: string
  bestandsgrootte?: number
  asset: { _ref: string; _type: 'reference'; url?: string }
}

export interface SEOMeta {
  metaTitle?: string
  metaDescription?: string
  ogImage?: SanityImage
  noIndex?: boolean
  canonicalUrl?: string
}

// ──────────────────────────────────────────────────────
// Artikel
// ──────────────────────────────────────────────────────
export interface Artikel {
  _id: string
  _type: 'artikel'
  titel: string
  slug: string
  samenvatting: string
  tldr?: string
  body: unknown[] // Portable Text
  afbeelding?: SanityImage
  auteur?: Auteur
  themas: Thema[]
  doelgroepen: Doelgroep[]
  tags: string[]
  status: ContentStatus
  gepubliceerdOp: string
  bijgewerktOp: string
  geldigTot?: string
  reviewStatus?: 'ok' | 'verouderd' | 'in-review'
  eigenaar?: string
  leestijd?: number // minuten
  seo?: SEOMeta
  gerelateerd?: Array<Artikel | Template | Praktijkcase>
}

// ──────────────────────────────────────────────────────
// Template / Download
// ──────────────────────────────────────────────────────
export interface Template {
  _id: string
  _type: 'template'
  titel: string
  slug: string
  samenvatting: string
  beschrijving?: unknown[] // Portable Text
  afbeelding?: SanityImage
  bijlagen: Bijlage[]
  themas: Thema[]
  doelgroepen: Doelgroep[]
  proces?: string
  domein?: string
  tags: string[]
  bestandstype?: string
  status: ContentStatus
  gepubliceerdOp: string
  bijgewerktOp: string
  eigenaar?: string
  seo?: SEOMeta
}

// ──────────────────────────────────────────────────────
// Praktijkcase
// ──────────────────────────────────────────────────────
export interface Praktijkcase {
  _id: string
  _type: 'praktijkcase'
  titel: string
  slug: string
  samenvatting: string
  uitdaging?: unknown[] // Portable Text
  aanpak?: unknown[]
  resultaat?: unknown[]
  lessen?: unknown[]
  afbeelding?: SanityImage
  organisatie?: Organisatie
  themas: Thema[]
  doelgroepen: Doelgroep[]
  tags: string[]
  status: ContentStatus
  gepubliceerdOp: string
  bijgewerktOp: string
  seo?: SEOMeta
}

// ──────────────────────────────────────────────────────
// Nieuws
// ──────────────────────────────────────────────────────
export interface Nieuwsbericht {
  _id: string
  _type: 'nieuws'
  titel: string
  slug: string
  samenvatting: string
  body: unknown[]
  afbeelding?: SanityImage
  auteur?: Auteur
  themas: Thema[]
  tags: string[]
  status: ContentStatus
  gepubliceerdOp: string
  bijgewerktOp: string
  bronUrl?: string
  seo?: SEOMeta
}

// ──────────────────────────────────────────────────────
// Event
// ──────────────────────────────────────────────────────
export interface Event {
  _id: string
  _type: 'event'
  titel: string
  slug: string
  samenvatting: string
  beschrijving?: unknown[]
  afbeelding?: SanityImage
  startdatum: string
  einddatum?: string
  starttijd?: string
  eindtijd?: string
  locatie?: string
  online: boolean
  aanmeldUrl?: string
  themas: Thema[]
  doelgroepen: Doelgroep[]
  tags: string[]
  status: ContentStatus
  gepubliceerdOp: string
  seo?: SEOMeta
}

// ──────────────────────────────────────────────────────
// Pagination
// ──────────────────────────────────────────────────────
export interface PaginatedResult<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

export interface SearchParams {
  q?: string
  type?: ContentType | 'all'
  thema?: string
  doelgroep?: Doelgroep
  page?: number
  pageSize?: number
  sortBy?: 'relevantie' | 'nieuwste' | 'populair'
}
