import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'artikel',
  title: 'Artikelen',
  type: 'document',
  fields: [
    defineField({ name: 'titel',        type: 'string',    title: 'Titel',        validation: (r) => r.required().max(120) }),
    defineField({ name: 'slug',         type: 'slug',      title: 'Slug',         options: { source: 'titel' }, validation: (r) => r.required() }),
    defineField({ name: 'samenvatting', type: 'text',      title: 'Samenvatting', rows: 3, validation: (r) => r.required().max(300) }),
    defineField({ name: 'tldr',         type: 'string',    title: 'TL;DR (kernboodschap)', validation: (r) => r.max(200) }),
    defineField({ name: 'afbeelding',   type: 'image',     title: 'Afbeelding',   options: { hotspot: true }, fields: [
      defineField({ name: 'alt', type: 'string', title: 'Alt-tekst', validation: (r) => r.required() }),
      defineField({ name: 'caption', type: 'string', title: 'Bijschrift' }),
    ]}),
    defineField({ name: 'body', type: 'array', title: 'Inhoud', of: [
      { type: 'block' },
      { type: 'image', options: { hotspot: true }, fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alt-tekst', validation: (r) => r.required() }),
      ]},
    ]}),
    defineField({ name: 'auteur',       type: 'reference', title: 'Auteur',     to: [{ type: 'auteur' }] }),
    defineField({ name: 'themas',       type: 'array',     title: "Thema's",    of: [{ type: 'reference', to: [{ type: 'thema' }] }] }),
    defineField({ name: 'doelgroepen',  type: 'array',     title: 'Doelgroepen', of: [{ type: 'string' }],
      options: { list: [
        { title: 'Gemeente',               value: 'gemeente' },
        { title: 'Provincie',              value: 'provincie' },
        { title: 'Waterschap',             value: 'waterschap' },
        { title: 'Rijksoverheid',          value: 'rijksoverheid' },
        { title: 'Uitvoeringsorganisatie', value: 'uitvoeringsorganisatie' },
        { title: 'ZBO',                    value: 'zbo' },
      ]},
    }),
    defineField({ name: 'tags',         type: 'array', title: 'Tags', of: [{ type: 'string' }], options: { layout: 'tags' } }),
    defineField({ name: 'leestijd',     type: 'number', title: 'Leestijd (minuten)' }),
    defineField({ name: 'status', type: 'string', title: 'Status',
      options: { list: [
        { title: 'Concept',    value: 'draft' },
        { title: 'In review',  value: 'review' },
        { title: 'Gepubliceerd', value: 'published' },
        { title: 'Gearchiveerd', value: 'archived' },
      ], layout: 'radio' },
      initialValue: 'draft',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'gepubliceerdOp', type: 'datetime', title: 'Gepubliceerd op' }),
    defineField({ name: 'bijgewerktOp',   type: 'datetime', title: 'Bijgewerkt op' }),
    defineField({ name: 'geldigTot',      type: 'date',     title: 'Geldig tot' }),
    defineField({ name: 'reviewStatus', type: 'string', title: 'Review status',
      options: { list: [{ title: 'OK / Actueel', value: 'ok' }, { title: 'In review', value: 'in-review' }, { title: 'Verouderd', value: 'verouderd' }] },
    }),
    defineField({ name: 'eigenaar', type: 'string', title: 'Eigenaar / redacteur' }),
    defineField({ name: 'seo', title: 'SEO', type: 'object', fields: [
      defineField({ name: 'metaTitle',       type: 'string', title: 'Meta-titel', validation: (r) => r.max(60) }),
      defineField({ name: 'metaDescription', type: 'text',   title: 'Meta-omschrijving', rows: 2, validation: (r) => r.max(160) }),
      defineField({ name: 'noIndex',         type: 'boolean', title: 'Verberg voor zoekmachines', initialValue: false }),
    ]}),
  ],
  preview: {
    select: { title: 'titel', subtitle: 'status', media: 'afbeelding' },
    prepare: ({ title, subtitle, media }: { title: string; subtitle: string; media: unknown }) => ({
      title,
      subtitle: subtitle ? `[${subtitle.toUpperCase()}]` : '',
      media,
    }),
  },
})
