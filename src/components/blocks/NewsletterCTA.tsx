'use client'

import { useState, type FormEvent } from 'react'
import { Mail, CheckCircle2 } from 'lucide-react'

export default function NewsletterCTA() {
  const [email, setEmail]     = useState('')
  const [status, setStatus]   = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/nieuwsbrief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('success')
        setMessage('Bedankt voor uw aanmelding! U ontvangt een bevestiging per e-mail.')
      } else {
        throw new Error()
      }
    } catch {
      setStatus('error')
      setMessage('Er ging iets mis. Probeer het later opnieuw.')
    }
  }

  return (
    <section className="bg-kbo-blue rounded-2xl p-8 text-white" aria-labelledby="newsletter-heading">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-6 h-6 text-white" aria-hidden />
        </div>
        <h2 id="newsletter-heading" className="text-2xl font-bold text-white mb-2">
          Blijf op de hoogte
        </h2>
        <p className="text-white/80 text-sm mb-6 leading-relaxed">
          Ontvang de KBO Nieuwsbrief: nieuwe publicaties, praktijkcases, events en updates
          in bedrijfsvoering bij de overheid — direct in uw inbox.
        </p>

        {status === 'success' ? (
          <div className="flex items-center justify-center gap-2 text-green-300 font-medium">
            <CheckCircle2 className="w-5 h-5" />
            {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" noValidate>
            <label htmlFor="newsletter-email" className="sr-only">E-mailadres</label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="uw@emailadres.nl"
              required
              className="flex-1 px-4 py-2.5 rounded-lg text-sm text-kbo-blue placeholder:text-kbo-gray/60
                         focus:outline-none focus:ring-2 focus:ring-white/60 border-0"
              aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary bg-white text-kbo-blue hover:bg-kbo-blue-light justify-center shrink-0"
            >
              {status === 'loading' ? 'Bezig…' : 'Aanmelden'}
            </button>
          </form>
        )}
        {status === 'error' && (
          <p id="newsletter-error" className="text-red-300 text-sm mt-2">{message}</p>
        )}
        <p className="text-white/50 text-xs mt-4">
          U kunt zich op elk moment afmelden. Uw gegevens worden niet met derden gedeeld.{' '}
          <a href="/privacy" className="underline hover:text-white">Privacyverklaring</a>
        </p>
      </div>
    </section>
  )
}
