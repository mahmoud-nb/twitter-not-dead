import Link from 'next/link'
import { PostCardLayout } from './PostCardLayout'
import { PostData, PostHome } from '@/src/query/post.query'
import { PostMainCardLayout } from './PostMainCardLayout'
import dayjs from 'dayjs'
import { PostCardActions } from './PostCardActions'
import { Repeat2 } from 'lucide-react'

type PostCardProps = {
  post: PostHome | PostData
  userId: string
  messages?: Record<string, string>,
  layout?: string
}

export const PostCard = async ({ post, userId, messages, layout = 'default' }: PostCardProps) => {

  if (!post) throw new Error('Post is not defined')

  const postCardSection = (postElement: PostHome) => { 

    const iconSize = 20
    const iconStrokeWidth = 1

    return (
      <div>
        <Link href={`/post/${postElement.id}`} className="test-sm text-foreground">
            {postElement.content}
        </Link>
        { layout === 'main' && (<div className="text-sm text-muted-foreground mt-2">
          {dayjs(postElement.createdAt).format('HH:mm A · DD-MM-YYYY ')}</div>)}
        <PostCardActions 
          post={postElement} 
          userId={userId} 
          isLiked={postElement.likes.length > 0} 
          isReposted={postElement.reposts && postElement.reposts.length > 0}
          isAnswered={postElement.replies && postElement.replies.length > 0}
          className="flex items-center gap-6 mt-2" />
      </div>
    )
  }

  const displayPostCard = (p: PostHome) => layout === 'main' 
  ? <PostMainCardLayout post={p}>{ postCardSection(p) }</PostMainCardLayout> 
  : <PostCardLayout post={p}>{ postCardSection(p) }</PostCardLayout>

  const repostCardHead = (<div className="flex items-center gap-2">
    <Repeat2 strokeWidth={1} size={18} />
    <div className="text-sm text-slate-500 font-medium">{post.user.name} {post.user.lastname} {messages?.cardReposted}</div>
  </div>)

  const displayCard = post.originalId ? post.original : post

  return <div className="flex flex-col gap-3 p-4 border-t border-blue-50 dark:border-gray-700">
    {post.originalId && <div>{ repostCardHead }</div>}
    <div>{displayPostCard(displayCard as PostHome)}</div>
  </div>
}
