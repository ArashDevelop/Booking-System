import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/db/init'

export const dynamic = 'force-dynamic'

export function GET(req: NextRequest) {
  try {
    const date = req.nextUrl.searchParams.get('date')
    const db = getDb()
    let slots

    if (date) {
      slots = db.prepare(
        'SELECT * FROM time_slots WHERE date = ? AND is_available = 1 ORDER BY start_time'
      ).all(date)
    } else {
      slots = db.prepare(
        'SELECT * FROM time_slots WHERE is_available = 1 ORDER BY date, start_time'
      ).all()
    }

    return NextResponse.json(slots)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch slots' }, { status: 500 })
  }
}
