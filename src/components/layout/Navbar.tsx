import Link from 'next/link'
import {useTranslations} from 'next-intl'
import { Home, PenSquare, Search, User } from 'lucide-react'
import { buttonVariants } from '@/src/components/ui/button'
import { clsx } from 'clsx'

export const Navbar = ({ className }: { className: string }) => {
  const t = useTranslations('Index')
  const iconSize = 20
  const iconStrokeWidth = 1
  const linkCommonStyle = "flex items-center justify-center md:justify-start gap-4 flex-auto px-2"
  return (
    <div className={className} >
      <Link href="/" className={clsx(buttonVariants({ variant: "ghost" }), 'w-full')}>
        <div className={linkCommonStyle}>
          <Home strokeWidth={iconStrokeWidth} size={iconSize} />
          <span className="hidden md:block">{t('Home')}</span>
        </div>
      </Link>

      <Link href="/explore" className={clsx(buttonVariants({ variant: "ghost" }), 'w-full')}>
        <div className={linkCommonStyle}>
          <Search strokeWidth={iconStrokeWidth} size={iconSize} />
          <span className="hidden md:block">{t('Explore')}</span>
        </div>
      </Link>

      <Link href="/write" className={clsx(buttonVariants({ variant: "ghost" }), 'w-full')}>
        <div className={linkCommonStyle}>
          <PenSquare strokeWidth={iconStrokeWidth} size={iconSize} />
          <span className="hidden md:block">{t('Tweet')}</span>
        </div>
      </Link>

      <Link href="/profile" className={clsx(buttonVariants({ variant: "ghost" }), 'w-full')}>
        <div className={linkCommonStyle}>
          <User strokeWidth={iconStrokeWidth} size={iconSize} />
          <span className="hidden md:block">{t('Profil')}</span>
        </div>
      </Link>
    </div>
  )
}
