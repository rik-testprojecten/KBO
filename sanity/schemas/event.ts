import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'event',
  title: 'Events',
  type: 'document',
  fields: [
    defineField({ name: 'titel',        type: 'string',   title: 'Titel',        validation: (r) => r.required() }),
    defineField({ name: 'slug',         type: 'slug',     title: 'Slug',         options: { source: 'titel' }, validation: (r) => r.required() }),
    defineField({ name: 'samenvatting', type: 'text',     title: 'Samenvatting', rows: 3, validation: (r) => r.required().max(300) }),
    defineField({ name: 'beschrijving', type: 'array',    title: 'Beschrijving', of: [{ type: 'block' }] }),
    defineField({ name: 'afbeelding',   type: 'image',    title: 'Afbeelding',   options: { hotspot: true }, fields: [
      defineField({ name: 'alt', type: 'string', title: 'Alt-tekst', validation: (r) => r.required() }),
    ]}),
    defineField({ name: 'startdatum',   type: 'date',     title: 'Startdatum',   validation: (r) => r.required() }),
    defineField({ name: 'einddatum',    type: 'date',     title: 'Einddatum' }),
    defineField({ name: 'starttijd',    type: 'string',   title: 'Starttijd (bijv. 13:00)' }),
    defineField({ name: 'eindtijd',     type: 'string',   title: 'Eindtijd' }),
    defineField({ name: 'locatie',      type: 'string',   title: 'Locatie' }),
    defineField({ name: 'online',       type: 'boolean',  title: 'Online event?', initialValue: false }),
    defineField({ name: 'aanmeldUrl',   type: 'url',      title: 'Aanmeld-URL' }),
    defineField({ name: 'themas',       type: 'array',    title: "Thema's", of: [{ type: 'reference', to: [{ type: 'thema' }] }] }),
    defineField({ name: 'doelgroepen',  type: 'array',    title: 'Doelgroepen',   of: [{ type: 'string' }],
      options: { list: [
        { title: 'Gemeente', value: 'gemeente' }, { title: 'Provincie', value: 'provincie' },
        { title: 'Waterschap', value: 'waterschap' }, { title: 'Rijksoverheid', value: 'rijksoverheid' },
      ]},
    }),
    defineField({ name: 'tags',         type: 'array',    title: 'Tags', of: [{ type: 'string' }], options: { layout: 'tags' } }),
    defineField({ name: 'status',       type: 'string',   title: 'Status',
      options: { list: ['draft','review','published','archived'].map((v) => ({ value: v, title: v })) },
      initialValue: 'draft',
    }),
    defineField({ name: 'gepubliceerdOp', type: 'datetime', title: 'Gepubliceerd op' }),
  ],
  preview: {
    select: { title: 'titel', subtitle: 'startdatum', media: 'afbeelding' },
    prepare: ({ title, subtitle, media }: { title: string; subtitle: string; media: unknown }) => ({
      title,
      subtitle: subtitle,
      media,
    }),
  },
})
