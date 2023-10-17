import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import '../globals.css'
import clsx from 'clsx'
import { Aside } from '@/src/components/layout/Aside'
import { Header } from '@/src/components/layout/Header'
import { Footer } from '@/src/components/layout/Footer'
import { locales, defaultLocale } from '@/middleware'
import { ThemeProvider } from '@/src/components/theme/ThemeProvider'
import Globals from '@/config/globals'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: Globals.meta.title,
  description: Globals.meta.description,
}

export default async function RootLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode,
  params: { locale?: string },
}) {

  const isValidLocale = locales.some((cur) => cur === locale)
  if (!isValidLocale) notFound();

  return (
    <html lang={locale || defaultLocale} className="h-full" >
      <body className={clsx(inter.className, 'h-full bg-background')}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem >
          <div className="flex h-full max-w-6xl mx-auto py-10 sm:py-0 ">
            <Aside />
            <main className="flex-1 px-4">
              <Header />
              <div className="p-2">
                {children}
              </div>
              <Footer />
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
