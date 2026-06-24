'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MotionDiv } from '@/components/motion'
import Chip from '@/components/Chip'
import Spinner from '@/components/Spinner'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { setLoading } from '@/lib/features/uiSlice'

interface Booking {
  id: string
  customer_name: string
  customer_email: string
  status: string
  date: string
  start_time: string
  end_time: string
  service_name: string
}

export default function MyBookingsPage() {
  const t = useTranslations('myBookings')
  const dispatch = useAppDispatch()
  const loading = useAppSelector((s) => s.ui.loading)

  const [email, setEmail] = useState('')
  const [bookings, setBookings] = useState<Booking[]>([])
  const [searched, setSearched] = useState(false)

  async function fetchBookings() {
    if (!email) return
    dispatch(setLoading({ key: 'myBookings', value: true }))
    setSearched(true)

    try {
      const res = await fetch(`/api/bookings?email=${encodeURIComponent(email)}`)
      if (res.ok) {
        const data = await res.json()
        setBookings(data)
      } else {
        setBookings([])
      }
    } catch {
      setBookings([])
    } finally {
      dispatch(setLoading({ key: 'myBookings', value: false }))
    }
  }

  async function cancelBooking(id: string) {
    try {
      const res = await fetch(`/api/bookings/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setBookings(bookings.map((b) =>
          b.id === id ? { ...b, status: 'cancelled' } : b
        ))
      }
    } catch {
      // ignore
    }
  }

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>

      <Card>
        <CardHeader>
          <CardTitle>{t('enterEmail')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3 items-stretch">
            <div className="flex-1 min-w-[280px]">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('emailPlaceholder')}
              />
            </div>
            <Button onClick={fetchBookings} disabled={!!loading['myBookings']}>
              {loading['myBookings'] && <Spinner className="mr-2" />}
              {loading['myBookings'] ? t('searching') : t('findBookings')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {searched && !loading['myBookings'] && bookings.length === 0 && (
        <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <p className="text-muted-foreground">{t('notFound')}</p>
        </MotionDiv>
      )}

      {bookings.length > 0 && (
        <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          {bookings.map((booking, i) => (
            <MotionDiv
              key={booking.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{booking.service_name}</CardTitle>
                    <Chip
                      label={booking.status === 'confirmed' ? t('confirmed') : t('cancelled')}
                      variant={booking.status === 'confirmed' ? 'success' : 'default'}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1 max-w-[400px]">
                    <p className="text-sm">
                      <strong>{t('date')}:</strong> {booking.date}
                    </p>
                    <p className="text-sm">
                      <strong>{t('time')}:</strong> {booking.start_time} - {booking.end_time}
                    </p>
                    {booking.status === 'confirmed' && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => cancelBooking(booking.id)}
                        className="mt-2"
                      >
                        {t('cancel')}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </MotionDiv>
          ))}
        </MotionDiv>
      )}
    </MotionDiv>
  )
}
