import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { email } = await req.json() as { email: string }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: 'Ongeldig e-mailadres' }, { status: 400 })
    }

    // TODO: Integrate with email marketing platform (Mailchimp / Brevo / Laposta)
    // await addToMailingList(email)

    console.info('[nieuwsbrief] aanmelding:', email)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
