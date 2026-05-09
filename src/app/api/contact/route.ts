import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { naam, email, onderwerp, bericht } = body as Record<string, string>

    if (!naam || !email || !onderwerp || !bericht) {
      return NextResponse.json({ error: 'Verplichte velden ontbreken' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Ongeldig e-mailadres' }, { status: 400 })
    }

    // Honeypot check (add a hidden field 'website' in the form; bots fill it in)
    if ((body as Record<string, string>).website) {
      return NextResponse.json({ ok: true }) // silently accept spam
    }

    // TODO: Integrate with email service (Resend / SendGrid / Nodemailer)
    // await sendEmail({ to: 'info@kbo.nl', subject: `Contact KBO: ${onderwerp}`, html: `...` })

    console.info('[contact]', { naam, email, onderwerp, bericht: bericht.slice(0, 100) })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
