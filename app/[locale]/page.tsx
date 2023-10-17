import { useTranslations } from 'next-intl'
import { Posts } from '@/src/components/post/Posts'

export default function Home() {
  const t = useTranslations('Page')

  return (
    <div >
      <h2 className="text-xl font-medium mb-3 p-4">{t('title.home')}</h2>
      <Posts />
    </div>
  )
}
