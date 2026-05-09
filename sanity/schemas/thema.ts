import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'thema',
  title: "Thema's",
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Naam', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'beschrijving', title: 'Beschrijving', type: 'text', rows: 3 }),
    defineField({ name: 'kleur', title: 'Kleurcode (hex)', type: 'string' }),
    defineField({ name: 'icoon', title: 'Icoon (emoji)', type: 'string' }),
    defineField({ name: 'volgorde', title: 'Volgorde', type: 'number' }),
  ],
  orderings: [{ title: 'Volgorde', name: 'volgorde', by: [{ field: 'volgorde', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'beschrijving' } },
})
