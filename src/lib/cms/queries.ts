import { sanityClient } from './client'
import type {
  Artikel, Template, Praktijkcase, Nieuwsbericht, Event, Thema,
  PaginatedResult, SearchParams,
} from '@/types/content'

const themaFields = `
  _id, title, "slug": slug.current,
  beschrijving, kleur, icoon
`

const auteurFields = `
  _id, naam, functie, organisatie,
  avatar { asset->{ _id, url }, alt }
`

const artikelFields = `
  _id, _type, titel, "slug": slug.current,
  samenvatting, tldr, body,
  "afbeelding": afbeelding { asset->{ _id, url }, alt, caption },
  auteur->{ ${auteurFields} },
  themas[]->{ ${themaFields} },
  doelgroepen, tags, status,
  gepubliceerdOp, bijgewerktOp, geldigTot,
  reviewStatus, eigenaar, leestijd,
  seo
`

// ─── Thema's ──────────────────────────────────────────────────────────────────
export async function getThemas(): Promise<Thema[]> {
  return sanityClient.fetch(
    `*[_type == "thema" && !(_id in path('drafts.**'))] | order(title asc) {
      ${themaFields},
      "artikelCount": count(*[_type in ["artikel","praktijkcase","template"] && references(^._id)])
    }`,
    {},
    { next: { revalidate: 3600, tags: ['thema'] } },
  )
}

export async function getThemaBySlug(slug: string): Promise<Thema | null> {
  const results = await sanityClient.fetch<Thema[]>(
    `*[_type == "thema" && slug.current == $slug][0..0] { ${themaFields} }`,
    { slug },
    { next: { revalidate: 3600, tags: [`thema-${slug}`] } },
  )
  return results[0] ?? null
}

// ─── Artikelen ────────────────────────────────────────────────────────────────
export async function getArtikelen(params: SearchParams = {}): Promise<PaginatedResult<Artikel>> {
  const { page = 1, pageSize = 12, thema, doelgroep, q } = params
  const offset = (page - 1) * pageSize

  const filters = [
    `_type == "artikel"`,
    `!(_id in path('drafts.**'))`,
    `status == "published"`,
    thema    ? `$thema in themas[]->slug.current` : null,
    doelgroep ? `$doelgroep in doelgroepen` : null,
    q        ? `(titel match $q || samenvatting match $q)` : null,
  ].filter(Boolean).join(' && ')

  const query = `{
    "items": *[${filters}] | order(gepubliceerdOp desc) [${offset}..${offset + pageSize - 1}] {
      ${artikelFields}
    },
    "total": count(*[${filters}])
  }`

  const result = await sanityClient.fetch<{ items: Artikel[]; total: number }>(
    query,
    { thema: thema ?? '', doelgroep: doelgroep ?? '', q: q ? `${q}*` : '' },
    { next: { revalidate: 300, tags: ['artikel'] } },
  )
  return {
    items: result.items,
    total: result.total,
    page,
    pageSize,
    hasMore: offset + pageSize < result.total,
  }
}

export async function getArtikelBySlug(slug: string): Promise<Artikel | null> {
  const results = await sanityClient.fetch<Artikel[]>(
    `*[_type == "artikel" && slug.current == $slug && status == "published"][0..0] {
      ${artikelFields},
      "gerelateerd": *[_type == "artikel" && status == "published" && count(themas[@._ref in ^.^.themas[]._ref]) > 0 && _id != ^._id] | order(gepubliceerdOp desc)[0..2] {
        _id, _type, titel, "slug": slug.current, samenvatting, themas[]->{ ${themaFields} }, gepubliceerdOp
      }
    }`,
    { slug },
    { next: { revalidate: 300, tags: [`artikel-${slug}`] } },
  )
  return results[0] ?? null
}

// ─── Templates ────────────────────────────────────────────────────────────────
export async function getTemplates(params: SearchParams = {}): Promise<PaginatedResult<Template>> {
  const { page = 1, pageSize = 12, thema, doelgroep, q } = params
  const offset = (page - 1) * pageSize

  const filters = [
    `_type == "template"`,
    `!(_id in path('drafts.**'))`,
    `status == "published"`,
    thema    ? `$thema in themas[]->slug.current` : null,
    doelgroep ? `$doelgroep in doelgroepen` : null,
    q        ? `(titel match $q || samenvatting match $q)` : null,
  ].filter(Boolean).join(' && ')

  const query = `{
    "items": *[${filters}] | order(gepubliceerdOp desc) [${offset}..${offset + pageSize - 1}] {
      _id, _type, titel, "slug": slug.current, samenvatting,
      "afbeelding": afbeelding { asset->{ _id, url }, alt },
      themas[]->{ ${themaFields} }, doelgroepen, tags,
      bijlagen[] { _key, titel, bestandstype, bestandsgrootte, "url": asset->url },
      bestandstype, gepubliceerdOp, bijgewerktOp
    },
    "total": count(*[${filters}])
  }`

  const result = await sanityClient.fetch<{ items: Template[]; total: number }>(
    query,
    { thema: thema ?? '', doelgroep: doelgroep ?? '', q: q ? `${q}*` : '' },
    { next: { revalidate: 300, tags: ['template'] } },
  )
  return { items: result.items, total: result.total, page, pageSize, hasMore: offset + pageSize < result.total }
}

// ─── Praktijkcases ────────────────────────────────────────────────────────────
export async function getPraktijkcases(params: SearchParams = {}): Promise<PaginatedResult<Praktijkcase>> {
  const { page = 1, pageSize = 12, thema, doelgroep, q } = params
  const offset = (page - 1) * pageSize

  const filters = [
    `_type == "praktijkcase"`,
    `!(_id in path('drafts.**'))`,
    `status == "published"`,
    thema    ? `$thema in themas[]->slug.current` : null,
    doelgroep ? `$doelgroep in doelgroepen` : null,
    q        ? `(titel match $q || samenvatting match $q)` : null,
  ].filter(Boolean).join(' && ')

  const query = `{
    "items": *[${filters}] | order(gepubliceerdOp desc) [${offset}..${offset + pageSize - 1}] {
      _id, _type, titel, "slug": slug.current, samenvatting,
      "afbeelding": afbeelding { asset->{ _id, url }, alt },
      "organisatie": organisatie->{ _id, naam, type },
      themas[]->{ ${themaFields} }, doelgroepen, tags,
      gepubliceerdOp, bijgewerktOp
    },
    "total": count(*[${filters}])
  }`

  const result = await sanityClient.fetch<{ items: Praktijkcase[]; total: number }>(
    query,
    { thema: thema ?? '', doelgroep: doelgroep ?? '', q: q ? `${q}*` : '' },
    { next: { revalidate: 300, tags: ['praktijkcase'] } },
  )
  return { items: result.items, total: result.total, page, pageSize, hasMore: offset + pageSize < result.total }
}

// ─── Nieuws ───────────────────────────────────────────────────────────────────
export async function getNieuwsberichten(limit = 6): Promise<Nieuwsbericht[]> {
  return sanityClient.fetch(
    `*[_type == "nieuws" && !(_id in path('drafts.**')) && status == "published"]
     | order(gepubliceerdOp desc) [0..${limit - 1}] {
       _id, _type, titel, "slug": slug.current, samenvatting,
       "afbeelding": afbeelding { asset->{ _id, url }, alt },
       themas[]->{ ${themaFields} }, gepubliceerdOp
     }`,
    {},
    { next: { revalidate: 300, tags: ['nieuws'] } },
  )
}

export async function getNieuwsberichtBySlug(slug: string): Promise<Nieuwsbericht | null> {
  const results = await sanityClient.fetch<Nieuwsbericht[]>(
    `*[_type == "nieuws" && slug.current == $slug && status == "published"][0..0] {
      _id, _type, titel, "slug": slug.current, samenvatting, body,
      "afbeelding": afbeelding { asset->{ _id, url }, alt, caption },
      auteur->{ ${auteurFields} },
      themas[]->{ ${themaFields} }, tags, gepubliceerdOp, bronUrl, seo
    }`,
    { slug },
    { next: { revalidate: 300, tags: [`nieuws-${slug}`] } },
  )
  return results[0] ?? null
}

// ─── Events ───────────────────────────────────────────────────────────────────
export async function getEvents(upcoming = true, limit = 6): Promise<Event[]> {
  const dateFilter = upcoming ? `startdatum >= $now` : `startdatum < $now`
  return sanityClient.fetch(
    `*[_type == "event" && !(_id in path('drafts.**')) && status == "published" && ${dateFilter}]
     | order(startdatum asc) [0..${limit - 1}] {
       _id, _type, titel, "slug": slug.current, samenvatting,
       "afbeelding": afbeelding { asset->{ _id, url }, alt },
       startdatum, einddatum, starttijd, eindtijd, locatie, online,
       themas[]->{ ${themaFields} }, doelgroepen, aanmeldUrl
     }`,
    { now: new Date().toISOString() },
    { next: { revalidate: 300, tags: ['event'] } },
  )
}

// ─── Homepage data ────────────────────────────────────────────────────────────
export async function getHomepageData() {
  const [themas, artikelen, nieuws, events] = await Promise.all([
    getThemas(),
    getArtikelen({ pageSize: 4 }),
    getNieuwsberichten(3),
    getEvents(true, 3),
  ])
  return { themas, artikelen: artikelen.items, nieuws, events }
}

// ─── Zoeken ───────────────────────────────────────────────────────────────────
export async function zoeken(params: SearchParams): Promise<PaginatedResult<Artikel>> {
  const { page = 1, pageSize = 10, type = 'all', thema, doelgroep, q } = params
  const offset = (page - 1) * pageSize

  const typeFilter = type !== 'all' ? `_type == $type` : `_type in ["artikel","template","praktijkcase","nieuws","event"]`
  const filters = [
    typeFilter,
    `!(_id in path('drafts.**'))`,
    `status == "published"`,
    thema    ? `$thema in themas[]->slug.current` : null,
    doelgroep ? `$doelgroep in doelgroepen` : null,
    q        ? `(titel match $q || samenvatting match $q)` : null,
  ].filter(Boolean).join(' && ')

  const query = `{
    "items": *[${filters}] | order(gepubliceerdOp desc) [${offset}..${offset + pageSize - 1}] {
      _id, _type, titel, "slug": slug.current, samenvatting,
      themas[]->{ ${themaFields} }, gepubliceerdOp
    },
    "total": count(*[${filters}])
  }`

  const result = await sanityClient.fetch<{ items: Artikel[]; total: number }>(
    query,
    { type: type ?? '', thema: thema ?? '', doelgroep: doelgroep ?? '', q: q ? `${q}*` : '' },
    { next: { revalidate: 60 } },
  )
  return { items: result.items, total: result.total, page, pageSize, hasMore: offset + pageSize < result.total }
}
