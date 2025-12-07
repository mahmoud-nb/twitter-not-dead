import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import clsx from 'clsx'
import { locales, defaultLocale } from '@/middleware'
import { ThemeProvider } from '@/src/components/theme/ThemeProvider'
import { Analytics } from '@vercel/analytics/react'
import Favicon from '/public/images/twitter.ico'
import Globals from '@/config/globals'
import '../../../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: Globals.meta.title,
  description: Globals.meta.description,
  icons: [{ rel: 'icon', url: Favicon.src }],
}

export default async function AuthLayout({
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
          <div className="flex h-full py-10 relative sm:py-0">
            <main className="flex-1">
              <div className="flex min-h-full p-10">
                <div className="max-w-5xl w-full mx-auto p-6 border rounded-md border-blue-50 dark:border-gray-700">
                  {children}
                </div>
              </div>
            </main>
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
