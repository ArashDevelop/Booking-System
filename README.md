# Booking System

A service booking system with time slots, reservations, cancellation, and admin management.

## Tech Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend:** Express.js (Vercel serverless function via `serverless-http`)
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
# Install dependencies
npm install

# Start development servers (Next.js on :3000 + Express API on :3001)
npm run dev
```

Open [http://localhost:3000/en](http://localhost:3000/en).

## Project Structure

```
├── api/
│   ├── app.ts              # Express application (routes)
│   └── index.ts            # Vercel serverless handler
├── db/
│   ├── schema.sql          # SQLite schema
│   └── init.ts             # Auto-migration and seed data
├── server/
│   └── dev.ts              # Local Express dev server
├── src/
│   ├── app/
│   │   ├── [locale]/       # Locale-aware pages
│   │   │   ├── page.tsx          # Home
│   │   │   ├── book/page.tsx     # Book a slot
│   │   │   ├── my-bookings/page.tsx  # View my bookings
│   │   │   └── loading.tsx       # Loading skeletons
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/             # shadcn/ui components
│   │   ├── Header.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── LocaleSwitcher.tsx
│   │   ├── providers.tsx   # Redux + Theme providers
│   │   ├── motion.tsx      # Framer Motion wrappers
│   │   ├── NavButton.tsx
│   │   ├── Alert.tsx
│   │   ├── Chip.tsx
│   │   └── Spinner.tsx
│   ├── lib/
│   │   ├── store.ts        # Redux store
│   │   ├── hooks.ts        # Typed Redux hooks
│   │   ├── navigation.ts   # next-intl navigation
│   │   └── features/
│   │       └── uiSlice.ts
│   ├── messages/
│   │   ├── en.json         # English translations
│   │   └── fa.json         # Persian translations
│   ├── i18n.ts
│   └── middleware.ts       # Locale detection
├── .env / .env.example
├── tailwind.config.ts
├── next.config.mjs
└── vercel.json
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
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

## Deployment (Vercel)

```bash
npm run build
```

Then deploy the project to Vercel. The `api/` directory is automatically deployed as serverless functions. The SQLite database resets on each deploy (ephemeral filesystem).

## Development

```bash
# Run both Next.js and API server
npm run dev

# Run only Next.js
npm run dev:next

# Run only API server
npm run dev:api
```

## License

MIT
