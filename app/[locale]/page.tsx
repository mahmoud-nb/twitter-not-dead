import { useTranslations } from 'next-intl'
import { Posts } from '@/src/components/post/Posts'
import { Write } from '@/src/components/post/Write'

export default function Home() {
  const t = useTranslations()

  const writePostFormMessages = {
    contentPlaceholder: t('Tweet.Write.content.placeholder'),
    buttonText: t('Tweet.Write.button.text')
  }

  return (
    <div >
      <h2 className="text-xl font-medium mb-3 p-4">{t('Page.Home.title')}</h2>
      <Write messages={writePostFormMessages} />
      <Posts />
    </div>
  )
}
