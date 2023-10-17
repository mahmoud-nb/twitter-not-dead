import { useTranslations } from 'next-intl'
import LoginButton from '@/src/components/auth/LoginButton'
import LogoutButton from './LogoutButton'


export const AuthSection = ({ isLoggedIn = false }: { isLoggedIn: Boolean }) => {

  const t = useTranslations('Common')
  const messages = { label: t(isLoggedIn ? 'Logout' : 'Login') }

  return (
    <div className="flex items-center justify-center p-8">
      { isLoggedIn ? <LogoutButton messages={messages} /> : <LoginButton messages={messages} /> }
    </div>
  )
}
