import { Write } from '@/src/components/post/Write'
import { useTranslations } from 'next-intl'

export default function Page() {
  const t = useTranslations()

  const PostMessages = {
    contentPlaceholder: t('Tweet.Write.post.placeholder'),
    buttonText: t('Tweet.Write.post.button'),
    cardReposted: t('Tweet.Card.reposted')
  }

  return (
    <div>
      <Write messages={PostMessages} />
    </div>
  )
}
