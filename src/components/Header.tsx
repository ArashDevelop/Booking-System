'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/lib/navigation'
import ThemeToggle from './ThemeToggle'
import LocaleSwitcher from './LocaleSwitcher'

export default function Header() {
  const t = useTranslations('nav')

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-[900px] items-center gap-4 px-4">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight hover:opacity-80 transition-opacity"
        >
          Booking System
        </Link>

        <nav className="flex items-center gap-4 ml-auto">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {t('home')}
          </Link>
          <Link
            href="/book"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {t('book')}
          </Link>
          <Link
            href="/my-bookings"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {t('myBookings')}
          </Link>
        </nav>

        <LocaleSwitcher />
        <ThemeToggle />
      </div>
    </header>
  )
}
