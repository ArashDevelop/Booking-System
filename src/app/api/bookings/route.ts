import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { getDb } from '@/db/init'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const { slot_id, customer_name, customer_email } = await req.json()
    const db = getDb()

    const slot = db.prepare(
      'SELECT * FROM time_slots WHERE id = ? AND is_available = 1'
    ).get(slot_id) as { id: string } | undefined

    if (!slot) {
      return NextResponse.json({ error: 'Slot not available' }, { status: 400 })
    }

    const bookingId = uuidv4()

    const insertBooking = db.prepare(
      'INSERT INTO bookings (id, slot_id, customer_name, customer_email) VALUES (?, ?, ?, ?)'
    )
    const markUnavailable = db.prepare(
      'UPDATE time_slots SET is_available = 0 WHERE id = ?'
    )

    const transaction = db.transaction(() => {
      insertBooking.run(bookingId, slot_id, customer_name, customer_email)
      markUnavailable.run(slot_id)
    })

    transaction()

    const booking = db.prepare('SELECT * FROM bookings WHERE id = ?').get(bookingId)
    return NextResponse.json(booking, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
  }
}

export function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get('email')
    const db = getDb()

    if (!email) {
      return NextResponse.json({ error: 'Email query parameter required' }, { status: 400 })
    }

    const bookings = db.prepare(
      `SELECT b.*, ts.date, ts.start_time, ts.end_time, s.name as service_name
       FROM bookings b
       JOIN time_slots ts ON b.slot_id = ts.id
       JOIN services s ON ts.service_id = s.id
       WHERE b.customer_email = ?
       ORDER BY ts.date, ts.start_time`
    ).all(email)

    return NextResponse.json(bookings)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
  }
}
