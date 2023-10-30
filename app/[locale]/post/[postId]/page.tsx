import { PostView } from "@/src/components/post/PostView"
import { Write } from "@/src/components/post/Write"
import { useTranslations } from "next-intl"

type PostPageParams = { postId: string }

export default function  Post({ params } : { params: PostPageParams }) {
  const t = useTranslations()

  const writePostFormMessages = {
    contentPlaceholder: t('Tweet.Write.replay.placeholder'),
    buttonText: t('Tweet.Write.replay.button')
  }

  return (
    <div>
      <PostView postId={params.postId} />
      <Write messages={writePostFormMessages} postId={params.postId} />
    </div>
  )
}

