import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Home, PenSquare, Search, User } from 'lucide-react'
import { buttonVariants } from '@/src/components/ui/button'
import { clsx } from 'clsx'
import { User as UserType } from '@/src/query/user.query'

export const Navbar = ({ user, className }: { user?: UserType, className: string }) => {
  const t = useTranslations('Navbar')
  const iconSize = 22
  const iconStrokeWidth = 2
  const linkCommonStyle = "flex items-center justify-center md:justify-start gap-4 flex-auto px-2"
  return (
    <div className={className} >
      <Link href="/" className={clsx(buttonVariants({ variant: "ghost" }), 'w-full')}>
        <div className={linkCommonStyle}>
          <Home strokeWidth={iconStrokeWidth} size={iconSize} />
          <span className="hidden text-lg md:block">{t('Home')}</span>
        </div>
      </Link>

      <Link href="/explore" className={clsx(buttonVariants({ variant: "ghost" }), 'w-full')}>
        <div className={linkCommonStyle}>
          <Search strokeWidth={iconStrokeWidth} size={iconSize} />
          <span className="hidden text-lg md:block">{t('Explore')}</span>                                                                      
        </div>
      </Link>

      <Link href="/write" className={clsx(buttonVariants({ variant: "ghost" }), 'w-full')}>
        <div className={linkCommonStyle}>
          <PenSquare strokeWidth={iconStrokeWidth} size={iconSize} />
          <span className="hidden text-lg md:block">{t('Tweet')}</span>
        </div>
      </Link>

      <Link href={user ? `/${user?.username}` : '/login'} className={clsx(buttonVariants({ variant: "ghost" }), 'w-full')}>
        <div className={linkCommonStyle}>
          <User strokeWidth={iconStrokeWidth} size={iconSize} />
          <span className="hidden text-lg md:block">{t('Profil')}</span>
        </div>
      </Link>
    </div>
  )
}
