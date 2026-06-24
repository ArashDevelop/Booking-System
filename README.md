# Booking System

A service booking system with time slots, reservations, cancellation, and admin management.

**Live demo:** [booking-system-nine-livid.vercel.app](https://booking-system-nine-livid.vercel.app/en/my-bookings)

## Tech Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend:** Next.js Route Handlers 
- **Database:** SQLite (`better-sqlite3`)
- **State:** Redux Toolkit
- **i18n:** next-intl (English / فارسی)
- **Animations:** Framer Motion
- **Theme:** next-themes (Light / Dark)

## Features

- Browse available time slots by date
- Book a slot with name and email
- Cancel an existing booking
- View bookings by email lookup
- Persian (RTL) and English (LTR) language support
- Dark and light mode with animated toggle
- Responsive design (mobile-first)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000/en](http://localhost:3000/en).

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── [locale]/           # Locale-aware pages
│   │   │   ├── page.tsx              # Home
│   │   │   ├── book/page.tsx         # Book a slot
│   │   │   ├── my-bookings/page.tsx  # View my bookings
│   │   │   └── loading.tsx           # Loading skeletons
│   │   ├── api/                # Next.js Route Handlers
│   │   │   ├── route.ts              # GET /api (health check)
│   │   │   ├── slots/route.ts        # GET /api/slots?date=
│   │   │   ├── bookings/route.ts     # GET/POST /api/bookings
│   │   │   └── bookings/[id]/route.ts # DELETE /api/bookings/:id
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── Header.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── LocaleSwitcher.tsx
│   │   ├── providers.tsx       # Redux + Theme providers
│   │   ├── motion.tsx          # Framer Motion wrappers
│   │   ├── NavButton.tsx
│   │   ├── Alert.tsx
│   │   ├── Chip.tsx
│   │   └── Spinner.tsx
│   ├── db/
│   │   ├── schema.sql          # SQLite schema
│   │   └── init.ts             # Auto-migration and seed data
│   ├── lib/
│   │   ├── store.ts            # Redux store
│   │   ├── hooks.ts            # Typed Redux hooks
│   │   ├── navigation.ts       # next-intl navigation
│   │   └── features/
│   │       └── uiSlice.ts
│   ├── messages/
│   │   ├── en.json             # English translations
│   │   └── fa.json             # Persian translations
│   ├── i18n.ts
│   └── middleware.ts           # Locale detection
├── .env / .env.example
├── tailwind.config.ts
├── next.config.mjs
└── vercel.json
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api` | Health check |
| `GET` | `/api/slots?date=YYYY-MM-DD` | Get available slots |
| `POST` | `/api/bookings` | Create a booking |
| `DELETE` | `/api/bookings/:id` | Cancel a booking |
| `GET` | `/api/bookings?email=` | Lookup bookings by email |

### POST `/api/bookings`

```json
{
  "slot_id": "<uuid>",
  "customer_name": "John",
  "customer_email": "john@example.com"
}
```

## Deployment

```bash
npm run build
```

Deploy to Vercel. The API is handled by Next.js Route Handlers, so no additional configuration is needed. The SQLite database is ephemeral — it resets on each deployment.

## Development

```bash
npm run dev
```

## License

MIT
