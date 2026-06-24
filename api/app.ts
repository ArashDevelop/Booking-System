import express from 'express'
import cors from 'cors'
import { v4 as uuidv4 } from 'uuid'
import { getDb } from '../db/init'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/slots', (req, res) => {
  try {
    const { date } = req.query
    const db = getDb()
    let slots

    if (date) {
      slots = db.prepare(
        'SELECT * FROM time_slots WHERE date = ? AND is_available = 1 ORDER BY start_time'
      ).all(date as string)
    } else {
      slots = db.prepare(
        'SELECT * FROM time_slots WHERE is_available = 1 ORDER BY date, start_time'
      ).all()
    }

    res.json(slots)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch slots' })
  }
})

app.post('/api/bookings', (req, res) => {
  try {
    const { slot_id, customer_name, customer_email } = req.body
    const db = getDb()

    const slot = db.prepare(
      'SELECT * FROM time_slots WHERE id = ? AND is_available = 1'
    ).get(slot_id) as { id: string } | undefined

    if (!slot) {
      res.status(400).json({ error: 'Slot not available' })
      return
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
    res.status(201).json(booking)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create booking' })
  }
})

app.delete('/api/bookings/:id', (req, res) => {
  try {
    const db = getDb()
    const booking = db.prepare(
      'SELECT * FROM bookings WHERE id = ?'
    ).get(req.params.id) as { slot_id: string; status: string } | undefined

    if (!booking) {
      res.status(404).json({ error: 'Booking not found' })
      return
    }

    if (booking.status === 'cancelled') {
      res.status(400).json({ error: 'Booking already cancelled' })
      return
    }

    const cancelBooking = db.prepare(
      "UPDATE bookings SET status = 'cancelled' WHERE id = ?"
    )
    const makeAvailable = db.prepare(
      'UPDATE time_slots SET is_available = 1 WHERE id = ?'
    )

    const transaction = db.transaction(() => {
      cancelBooking.run(req.params.id)
      makeAvailable.run(booking.slot_id)
    })

    transaction()

    res.json({ message: 'Booking cancelled' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to cancel booking' })
  }
})

app.get('/api/bookings', (req, res) => {
  try {
    const { email } = req.query
    const db = getDb()

    if (email) {
      const bookings = db.prepare(
        `SELECT b.*, ts.date, ts.start_time, ts.end_time, s.name as service_name
         FROM bookings b
         JOIN time_slots ts ON b.slot_id = ts.id
         JOIN services s ON ts.service_id = s.id
         WHERE b.customer_email = ?
         ORDER BY ts.date, ts.start_time`
      ).all(email as string)
      res.json(bookings)
    } else {
      res.status(400).json({ error: 'Email query parameter required' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' })
  }
})

export default app
