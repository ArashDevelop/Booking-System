'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MotionDiv, AnimatePresence } from '@/components/motion'
import Alert from '@/components/Alert'
import Spinner from '@/components/Spinner'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { setLoading } from '@/lib/features/uiSlice'

interface TimeSlot {
  id: string
  start_time: string
  end_time: string
}

export default function BookPage() {
  const t = useTranslations('book')
  const dispatch = useAppDispatch()
  const loading = useAppSelector((s) => s.ui.loading)

  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [slots, setSlots] = useState<TimeSlot[]>([])
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [fetching, setFetching] = useState(false)

  async function fetchSlots() {
    setFetching(true)
    setMessage(null)
    try {
      const res = await fetch(`/api/slots?date=${date}`)
      const data = await res.json()
      setSlots(data)
    } catch {
      setSlots([])
    } finally {
      setFetching(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedSlot || !name || !email) return

    dispatch(setLoading({ key: 'book', value: true }))
    setMessage(null)

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slot_id: selectedSlot,
          customer_name: name,
          customer_email: email,
        }),
      })

      if (res.ok) {
        setMessage({ type: 'success', text: t('confirmed') })
        setSelectedSlot(null)
        setSlots(slots.filter((s) => s.id !== selectedSlot))
        setName('')
        setEmail('')
      } else {
        const err = await res.json()
        setMessage({ type: 'error', text: `${t('error')}: ${err.error}` })
      }
    } catch {
      setMessage({ type: 'error', text: t('failedCreate') })
    } finally {
      dispatch(setLoading({ key: 'book', value: false }))
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
          <CardTitle>{t('selectDate')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3 items-stretch">
            <div className="flex-1 min-w-[200px]">
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <Button onClick={fetchSlots} disabled={fetching}>
              {fetching && <Spinner className="mr-2" />}
              {fetching ? t('loading') : t('checkSlots')}
            </Button>
          </div>
        </CardContent>
      </Card>

      <AnimatePresence mode="wait">
        {slots.length > 0 && (
          <MotionDiv
            key="slots"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{t('availableSlots')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {slots.map((slot, i) => (
                    <MotionDiv
                      key={slot.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.03 }}
                    >
                      <Button
                        variant={selectedSlot === slot.id ? 'default' : 'outline'}
                        onClick={() => setSelectedSlot(slot.id)}
                      >
                        {slot.start_time} - {slot.end_time}
                      </Button>
                    </MotionDiv>
                  ))}
                </div>
              </CardContent>
            </Card>
          </MotionDiv>
        )}

        {slots.length === 0 && !fetching && (
          <MotionDiv key="no-slots" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-muted-foreground">{t('noSlots')}</p>
          </MotionDiv>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedSlot && (
          <MotionDiv
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{t('yourDetails')}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4 max-w-[400px]">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t('name')}</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t('email')}</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" disabled={!!loading['book']}>
                      {loading['book'] && <Spinner className="mr-2" />}
                      {loading['book'] ? t('booking') : t('confirmBooking')}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </MotionDiv>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {message && (
          <MotionDiv
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Alert severity={message.type}>{message.text}</Alert>
          </MotionDiv>
        )}
      </AnimatePresence>
    </MotionDiv>
  )
}
