# booking-system — Booking System

## Project Overview

Service booking system with time slots, reservations, cancellation, and admin management.

## Tech Stack

Next.js · Express · SQLite

---

## Phases & Tasks

### 1️⃣ Setup ✅

- [x] Create repo named "booking-system"
- [x] Create Next.js + TypeScript project
- [x] Create Express backend in /server (adapted as api/ for Vercel)
- [x] Install date-fns for date handling
- [x] Set up SQLite (better-sqlite3)
- [x] Create .env and .env.example

### 2️⃣ Backend

- [x] Define schema: Service, TimeSlot, Booking, User
- [x] Run database migration (auto on first request)
- [x] Build route to get available slots by date
- [x] Build route to create booking
- [x] Build route to cancel booking
- [ ] Build admin route to manage slots
- [ ] Add JWT authentication

### 3️⃣ Frontend

- [x] Build calendar component for date selection (MUI DatePicker)
- [x] Display available slots for selected date
- [x] Build booking form: name, email, slot
- [x] Build booking confirmation page
- [x] Build my-bookings page for users
- [ ] Build admin panel: view all bookings
- [x] Make responsive and mobile-friendly
- [x] shadcn/ui + MUI component system
- [x] Dark/Light mode with next-themes
- [x] Persian/English i18n with next-intl
- [x] Full Redux state management
- [x] Framer Motion animations

### 4️⃣ Deployment

- [ ] Deploy on Vercel
- [ ] Fully test booking flow
- [ ] Add screenshot to README
- [ ] Write use case explanation in README
