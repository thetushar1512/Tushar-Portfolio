import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }

    const safeName = String(name).slice(0, 200)
    const safeEmail = String(email).slice(0, 200)
    const safeMessage = String(message).slice(0, 5000)

    if (!resend) {
      console.warn('RESEND_API_KEY not set — email not sent.')
      return NextResponse.json({ ok: true })
    }

    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'tushar.nandal678@gmail.com',
      subject: `New message from ${safeName}`,
      replyTo: safeEmail,
      html: `
        <div style="font-family:sans-serif;max-width:560px;padding:24px;border:1px solid #eee;border-radius:10px;color:#222;">
          <h2 style="margin:0 0 16px;color:#7c3aed;">New Portfolio Message</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          <div style="margin-top:16px;padding:16px;background:#f9f9f9;border-left:4px solid #7c3aed;border-radius:4px;">
            <p style="margin:0;font-weight:600;">Message:</p>
            <p style="margin:8px 0 0;white-space:pre-wrap;">${safeMessage}</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
