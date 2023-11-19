import { useTranslations } from 'next-intl'
import LoginButton from '@/src/components/auth/LoginButton'
import LogoutButton from './LogoutButton'


export const AuthSection = ({ isLoggedIn = false }: { isLoggedIn: Boolean }) => {

  const t = useTranslations('Page.Auth')
  const messages = { 
    label: t(isLoggedIn ? 'SignOut' : 'SignIn'),
  }

  return (
    <div className="p-8 border rounded-md border-blue-50 dark:border-gray-700">
      <h3 className="font-bold text-xl mb-4">{ t('hasAccountTitle') }</h3>
      { isLoggedIn ? <LogoutButton messages={messages} /> : <LoginButton messages={messages} /> }
    </div>
  )
}
