import { useTranslations } from 'next-intl'
import { Posts } from '@/src/components/post/Posts'
import { Write } from '@/src/components/post/Write'

export default function Home() {
  const t = useTranslations()

  const PostMessages = {
    contentPlaceholder: t('Tweet.Write.post.placeholder'),
    buttonText: t('Tweet.Write.post.button'),
    cardReposted: t('Tweet.Card.reposted')
  }

  return (
    <div>
      <h2 className="text-xl font-medium mb-3 p-4">{t('Page.Home.title')}</h2>
      <Write messages={PostMessages} />
      <Posts messages={PostMessages} />
    </div>
  )
}
