import { useTranslations } from 'next-intl'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import NavButton from '@/components/NavButton'

export default function HomePage() {
  const t = useTranslations('home')

  return (
    <div className="space-y-6 animate-slide-up">
      <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t('bookService')}</CardTitle>
            <CardDescription>{t('bookDesc')}</CardDescription>
          </CardHeader>
          <CardContent>
            <NavButton href="/book" label={t('bookNow')} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('myBookings')}</CardTitle>
            <CardDescription>{t('myBookingsDesc')}</CardDescription>
          </CardHeader>
          <CardContent>
            <NavButton href="/my-bookings" label={t('viewBookings')} variant="outline" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
