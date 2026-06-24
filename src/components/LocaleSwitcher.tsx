'use client'

import { usePathname, useRouter } from '@/lib/navigation'
import { useLocale } from 'next-intl'
import { MotionDiv } from '@/components/motion'

const locales: { value: 'en' | 'fa'; label: string }[] = [
  { value: 'en', label: 'EN' },
  { value: 'fa', label: 'FA' },
]

export default function LocaleSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  return (
    <MotionDiv
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      dir="ltr"
      className="flex rounded-md border"
    >
      {locales.map((l) => (
        <button
          key={l.value}
          onClick={() => {
            if (l.value !== locale) router.replace(pathname, { locale: l.value })
          }}
          className={`px-2 py-1 text-xs font-medium transition-colors first:rounded-l-md last:rounded-r-md ${
            locale === l.value
              ? 'bg-foreground text-background'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {l.label}
        </button>
      ))}
    </MotionDiv>
  )
}
