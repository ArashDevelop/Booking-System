import { ReactNode } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { Providers } from '@/components/providers'
import Header from '@/components/Header'

type Props = {
  children: ReactNode
  params: { locale: string }
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'home' })
  return {
    title: t('title'),
  }
}

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  const messages = await getMessages()
  const dir = locale === 'fa' ? 'rtl' : 'ltr'

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Header />
            <main className="container mx-auto max-w-[900px] px-4 py-6 animate-fade-in">
              {children}
            </main>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
