import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/db/init'

export const dynamic = 'force-dynamic'

export function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const db = getDb()
    const booking = db.prepare(
      'SELECT * FROM bookings WHERE id = ?'
    ).get(params.id) as { slot_id: string; status: string } | undefined

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    if (booking.status === 'cancelled') {
      return NextResponse.json({ error: 'Booking already cancelled' }, { status: 400 })
    }

    const cancelBooking = db.prepare(
      "UPDATE bookings SET status = 'cancelled' WHERE id = ?"
    )
    const makeAvailable = db.prepare(
      'UPDATE time_slots SET is_available = 1 WHERE id = ?'
    )

    const transaction = db.transaction(() => {
      cancelBooking.run(params.id)
      makeAvailable.run(booking.slot_id)
    })

    transaction()

    return NextResponse.json({ message: 'Booking cancelled' })
  } catch {
    return NextResponse.json({ error: 'Failed to cancel booking' }, { status: 500 })
  }
}
