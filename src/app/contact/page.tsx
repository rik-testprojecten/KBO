'use client'

import { useState, type FormEvent } from 'react'
import { Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react'
import Breadcrumb from '@/components/layout/Breadcrumb'

export default function ContactPage() {
  const [status, setStatus]   = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [form, setForm] = useState({ naam: '', email: '', organisatie: '', onderwerp: '', bericht: '' })

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setMessage('Uw bericht is ontvangen. We reageren binnen 3 werkdagen.')
      } else {
        throw new Error()
      }
    } catch {
      setStatus('error')
      setMessage('Er ging iets mis. Probeer het later opnieuw of stuur een e-mail.')
    }
  }

  function field(key: keyof typeof form) {
    return {
      value: form[key],
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        setForm({ ...form, [key]: e.target.value }),
    }
  }

  return (
    <>
      <Breadcrumb items={[{ label: 'Contact' }]} />
      <div className="bg-kbo-gray-light border-b border-kbo-gray-border">
        <div className="container-kbo py-10">
          <h1 className="text-3xl font-bold text-kbo-blue mb-2">Contact</h1>
          <p className="text-kbo-gray">Heeft u een vraag, suggestie of wilt u bijdragen aan KBO? Neem contact op.</p>
        </div>
      </div>

      <div className="container-kbo py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10">
          {/* Form */}
          <div className="card p-8">
            {status === 'success' ? (
              <div className="text-center py-10">
                <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-kbo-blue mb-2">Bericht verzonden!</h2>
                <p className="text-kbo-gray">{message}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <h2 className="text-xl font-bold text-kbo-blue mb-2">Stuur ons een bericht</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="naam" className="block text-sm font-medium text-kbo-blue mb-1">
                      Naam <span className="text-kbo-red">*</span>
                    </label>
                    <input id="naam" type="text" required {...field('naam')}
                      className="w-full px-3 py-2.5 text-sm border border-kbo-gray-border rounded-lg focus:outline-none focus:ring-2 focus:ring-kbo-teal" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-kbo-blue mb-1">
                      E-mailadres <span className="text-kbo-red">*</span>
                    </label>
                    <input id="email" type="email" required {...field('email')}
                      className="w-full px-3 py-2.5 text-sm border border-kbo-gray-border rounded-lg focus:outline-none focus:ring-2 focus:ring-kbo-teal" />
                  </div>
                </div>

                <div>
                  <label htmlFor="organisatie" className="block text-sm font-medium text-kbo-blue mb-1">Organisatie</label>
                  <input id="organisatie" type="text" {...field('organisatie')}
                    className="w-full px-3 py-2.5 text-sm border border-kbo-gray-border rounded-lg focus:outline-none focus:ring-2 focus:ring-kbo-teal" />
                </div>

                <div>
                  <label htmlFor="onderwerp" className="block text-sm font-medium text-kbo-blue mb-1">
                    Onderwerp <span className="text-kbo-red">*</span>
                  </label>
                  <select id="onderwerp" required {...field('onderwerp')}
                    className="w-full px-3 py-2.5 text-sm border border-kbo-gray-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-kbo-teal">
                    <option value="">Selecteer een onderwerp</option>
                    <option value="vraag">Inhoudelijke vraag</option>
                    <option value="bijdrage">Bijdragen aan KBO</option>
                    <option value="nieuwsbrief">Nieuwsbrief aanmelden</option>
                    <option value="fout">Fout of verouderde informatie melden</option>
                    <option value="overig">Overig</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="bericht" className="block text-sm font-medium text-kbo-blue mb-1">
                    Bericht <span className="text-kbo-red">*</span>
                  </label>
                  <textarea id="bericht" rows={5} required {...field('bericht')}
                    className="w-full px-3 py-2.5 text-sm border border-kbo-gray-border rounded-lg focus:outline-none focus:ring-2 focus:ring-kbo-teal resize-y" />
                </div>

                {status === 'error' && (
                  <p className="text-sm text-kbo-red bg-kbo-red-light rounded-lg p-3">{message}</p>
                )}

                <button type="submit" disabled={status === 'loading'} className="btn-primary w-full justify-center">
                  {status === 'loading' ? 'Verzenden…' : 'Bericht verzenden'}
                </button>

                <p className="text-xs text-kbo-gray/70">
                  Uw gegevens worden uitsluitend gebruikt voor het beantwoorden van uw bericht.{' '}
                  <a href="/privacy" className="underline hover:text-kbo-blue">Privacyverklaring</a>
                </p>
              </form>
            )}
          </div>

          {/* Contact info */}
          <aside className="space-y-6">
            <div className="card p-6">
              <h2 className="text-base font-bold text-kbo-blue mb-4">Contactgegevens</h2>
              <div className="space-y-4 text-sm text-kbo-gray">
                <div className="flex gap-3">
                  <Mail className="w-4 h-4 text-kbo-teal flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-kbo-blue">E-mail</p>
                    <a href="mailto:info@kbo.nl" className="text-kbo-teal hover:underline">info@kbo.nl</a>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Phone className="w-4 h-4 text-kbo-teal flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-kbo-blue">Telefoon</p>
                    <a href="tel:+31702123456" className="text-kbo-teal hover:underline">070 - 212 34 56</a>
                    <p className="text-xs text-kbo-gray/60">Ma t/m vr, 9:00 – 17:00</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MapPin className="w-4 h-4 text-kbo-teal flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-kbo-blue">Bezoekadres</p>
                    <address className="not-italic text-xs leading-relaxed">
                      [Organisatienaam]<br />
                      [Straat + huisnummer]<br />
                      [Postcode] [Stad]
                    </address>
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-6 bg-kbo-blue-light border-kbo-blue/20">
              <h2 className="text-base font-bold text-kbo-blue mb-2">Wilt u bijdragen?</h2>
              <p className="text-sm text-kbo-gray leading-relaxed">
                Heeft u relevante kennis, een praktijkcase of een handreiking die u wilt delen?
                KBO verwelkomt bijdragen van professionals uit de overheidspraktijk.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
