import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'auteur',
  title: 'Auteurs',
  type: 'document',
  fields: [
    defineField({ name: 'naam',         type: 'string',    title: 'Naam', validation: (r) => r.required() }),
    defineField({ name: 'functie',      type: 'string',    title: 'Functie' }),
    defineField({ name: 'organisatie',  type: 'string',    title: 'Organisatie' }),
    defineField({ name: 'bio',          type: 'text',      title: 'Biografie', rows: 3 }),
    defineField({ name: 'avatar',       type: 'image',     title: 'Foto', options: { hotspot: true }, fields: [
      defineField({ name: 'alt', type: 'string', title: 'Alt-tekst' }),
    ]}),
    defineField({ name: 'email',        type: 'string',    title: 'E-mail (intern)' }),
    defineField({ name: 'linkedin',     type: 'url',       title: 'LinkedIn-profiel' }),
  ],
  preview: {
    select: { title: 'naam', subtitle: 'organisatie', media: 'avatar' },
  },
})
