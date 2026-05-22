import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'
import { Resend } from 'resend' // 1. Added Resend import
import sslRootCas from 'ssl-root-cas'
sslRootCas.inject()

// 2. Initialize Resend
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

let client
let db

async function getDb() {
  if (db) return db
  const url = process.env.MONGO_URL
  if (!url) throw new Error('MONGO_URL not configured')
  client = new MongoClient(url)
  await client.connect()
  const dbName = process.env.DB_NAME || 'portfolio'
  db = client.db(dbName)
  return db
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders() })
}

async function handler(request, { params }) {
  const segments = (params?.path || [])
  const route = '/' + segments.join('/')
  const method = request.method

  try {
    if (route === '/' || route === '') {
      return NextResponse.json({ ok: true, service: 'tushar-portfolio-api', ts: Date.now() }, { headers: corsHeaders() })
    }

    if (route === '/contact' && method === 'POST') {
      const body = await request.json()
      const { name, email, message } = body || {}
      if (!name || !email || !message) {
        return NextResponse.json({ error: 'name, email and message required' }, { status: 400, headers: corsHeaders() })
      }
      const database = await getDb()
      const doc = {
        id: uuidv4(),
        name: String(name).slice(0, 200),
        email: String(email).slice(0, 200),
        message: String(message).slice(0, 5000),
        createdAt: new Date().toISOString(),
      }
      
      // Keep your exact MongoDB saving logic intact
      await database.collection('contacts').insertOne(doc)

      // 3. Send email via Resend right after successful DB insertion
      if (resend) {
        try {
          await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: 'tushar.nandal678@gmail.com', // Sends directly to your inbox
            subject: `💼 New Portfolio Message from ${doc.name}`,
            replyTo: doc.email, // Allows you to directly reply to the user from your email client
            html: `
              <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #eee; border-radius: 8px;">
                <h2 style="color: #6d28d9; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${doc.name}</p>
                <p><strong>Email:</strong> <a href="mailto:${doc.email}">${doc.email}</a></p>
                <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #6d28d9;">
                  <p style="margin: 0; font-weight: bold;">Message:</p>
                  <p style="white-space: pre-wrap; margin-top: 5px;">${doc.message}</p>
                </div>
              </div>
            `,
          })
        } catch (emailErr) {
          // Log email failure but don't crash the request since data is safely saved in Mongo
          console.error('Failed to dispatch notification email:', emailErr)
        }
      } else {
        console.warn('RESEND_API_KEY environment variable is not defined.')
      }

      return NextResponse.json({ ok: true, id: doc.id }, { headers: corsHeaders() })
    }

    if (route === '/contacts' && method === 'GET') {
      const database = await getDb()
      const items = await database
        .collection('contacts')
        .find({}, { projection: { _id: 0 } })
        .sort({ createdAt: -1 })
        .limit(50)
        .toArray()
      return NextResponse.json({ items }, { headers: corsHeaders() })
    }

    return NextResponse.json({ error: 'Not found', route }, { status: 404, headers: corsHeaders() })
  } catch (err) {
    console.error('API error', err)
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500, headers: corsHeaders() })
  }
}

export const GET = handler
export const POST = handler
export const PUT = handler
export const DELETE = handler