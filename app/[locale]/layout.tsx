import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { notFound, redirect } from 'next/navigation'
import clsx from 'clsx'
import { Aside } from '@/src/components/layout/Aside'
import { Header } from '@/src/components/layout/Header'
import { Footer } from '@/src/components/layout/Footer'
import { locales, defaultLocale } from '@/middleware'
import { ThemeProvider } from '@/src/components/theme/ThemeProvider'
import Globals from '@/config/globals'
import '../globals.css'
import { getCurrentUser } from '@/src/query/user.query'

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

  const user = await getCurrentUser()
  //if (!user) redirect('/login')

  return (
    <html lang={locale || defaultLocale} className="h-full" >
      <body className={clsx(inter.className, 'h-full bg-background')}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem >
          <div className="flex h-full max-w-6xl py-10 relative sm:py-0">
            <Aside />
            <main className="flex-1 sm:pl-20 md:pl-72">
              <Header />
              <div className="flex min-h-full">
                <div className="max-w-xl w-full border-r border-blue-50 dark:border-gray-700">
                  {children}
                </div>
              </div>
              <Footer />
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
