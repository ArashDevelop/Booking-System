# booking-system — Booking System

## Project Overview
Service booking system with time slots, reservations, cancellation, and admin management.

## Tech Stack
Next.js · Express · Supabase

---

## Phases & Tasks

### 1️⃣ Setup
- [ ] Create repo named "booking-system"
- [ ] Create Next.js + TypeScript project
- [ ] Create Express backend in /server
- [ ] Install date-fns for date handling
- [ ] Connect to Supabase
- [ ] Create .env and .env.example

### 2️⃣ Backend
- [ ] Define schema: Service, TimeSlot, Booking, User
- [ ] Run database migration
- [ ] Build route to get available slots by date
- [ ] Build route to create booking
- [ ] Build route to cancel booking
- [ ] Build admin route to manage slots
- [ ] Add JWT authentication

### 3️⃣ Frontend
- [ ] Build calendar component for date selection
- [ ] Display available slots for selected date
- [ ] Build booking form: name, email, slot
- [ ] Build booking confirmation page
- [ ] Build my-bookings page for users
- [ ] Build admin panel: view all bookings
- [ ] Make responsive and mobile-friendly

### 4️⃣ Deployment
- [ ] Deploy on Vercel + Render
- [ ] Fully test booking flow
- [ ] Add screenshot to README
- [ ] Write use case explanation in README