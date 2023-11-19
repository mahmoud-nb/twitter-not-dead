import { UserProfil } from '@/src/components/user/UserProfil'
import { useTranslations } from 'next-intl'

export default function Profil({ params }: { params: { username:string } }) {
  const t = useTranslations()

  const userMessages = {
    follow: t('Page.User.follow'),
    followedBy: t('Page.User.followedBy'),
    subscriber: t('Page.User.subscriber'),
    subscribers: t('Page.User.subscribers'),
    subscription: t('Page.User.subscription'),
    subscriptions: t('Page.User.subscriptions'),
    unsubscribe: t('Page.User.unsubscribe'),
  }

  return <UserProfil username={params.username} messages={userMessages} />
}