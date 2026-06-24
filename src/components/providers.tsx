'use client'

import { Provider } from 'react-redux'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { store } from '@/lib/store'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </NextThemesProvider>
    </Provider>
  )
}
