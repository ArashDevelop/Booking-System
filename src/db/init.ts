import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcryptjs'

const DB_PATH = process.env.DATABASE_PATH || (
  process.env.VERCEL
    ? '/tmp/data/bookings.db'
    : './data/bookings.db'
)

let db: Database.Database | null = null

function findSchemaPath(): string {
  const candidates = [
    path.join(process.cwd(), 'src', 'db', 'schema.sql'),
    path.join(process.cwd(), 'db', 'schema.sql'),
    path.join(__dirname, '..', '..', 'schema.sql'),
    path.join(__dirname, 'schema.sql'),
  ]
  for (const p of candidates) {
    if (fs.existsSync(p)) return p
  }
  throw new Error(`Schema file not found. Tried: ${candidates.join(', ')}`)
}

export function getDb(): Database.Database {
  if (db) return db

  const dbDir = path.dirname(DB_PATH)
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true })
  }

  db = new Database(DB_PATH)
  try {
    db.pragma('journal_mode = WAL')
  } catch {
    // WAL not supported on some serverless environments, fallback to DELETE
    db.pragma('journal_mode = DELETE')
  }
  db.pragma('foreign_keys = ON')

  const schemaPath = findSchemaPath()
  const schema = fs.readFileSync(schemaPath, 'utf-8')
  db.exec(schema)

  seedIfEmpty(db)

  return db
}

function seedIfEmpty(database: Database.Database) {
  const count = database.prepare('SELECT COUNT(*) as cnt FROM services').get() as { cnt: number }
  if (count.cnt > 0) return

  const insertService = database.prepare(
    'INSERT INTO services (id, name, description, duration_minutes) VALUES (?, ?, ?, ?)'
  )
  const insertSlot = database.prepare(
    'INSERT INTO time_slots (id, service_id, date, start_time, end_time, is_available) VALUES (?, ?, ?, ?, ?, ?)'
  )
  const insertAdmin = database.prepare(
    'INSERT INTO users (id, name, email, password_hash, is_admin) VALUES (?, ?, ?, ?, ?)'
  )

  const transaction = database.transaction(() => {
    const serviceId = 'service-general-consultation'
    insertService.run(serviceId, 'General Consultation', 'Standard consultation session', 60)

    const adminPassword = bcrypt.hashSync('admin123', 10)
    insertAdmin.run('user-admin-1', 'Admin', 'admin@example.com', adminPassword, 1)

    const today = new Date()
    for (let day = 0; day < 14; day++) {
      const date = new Date(today)
      date.setDate(date.getDate() + day)
      const dateStr = date.toISOString().split('T')[0]

      for (let hour = 9; hour < 17; hour++) {
        const start = `${hour.toString().padStart(2, '0')}:00`
        const end = `${(hour + 1).toString().padStart(2, '0')}:00`
        const slotId = `${serviceId}-${dateStr}-${start}`
        insertSlot.run(slotId, serviceId, dateStr, start, end, 1)
      }
    }
  })

  transaction()
}

export function closeDb() {
  if (db) {
    db.close()
    db = null
  }
}
