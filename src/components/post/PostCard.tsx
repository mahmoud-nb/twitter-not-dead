import Link from 'next/link'
import { PostCardLayout } from './PostCardLayout'
import { PostHome } from '@/src/query/post.query'
import { PostMainCardLayout } from './PostMainCardLayout'
import dayjs from 'dayjs'
import { User } from '@/src/query/user.query'
import { PostCardActions } from './PostCardActions'
import { Repeat2 } from 'lucide-react'

type PostCardProps = {
  post: PostHome
  user: User
  messages?: Record<string, string>,
  layout?: string
}

export const PostCard = async ({ post, user, messages, layout = 'default' }: PostCardProps) => {

  /*
  let isLikedByCurrentUser:Boolean = false
  if (user?.id) {
    const isLikedByCurrentUser = await isLikedPost(post.id, user.id)
  }*/

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
        <PostCardActions post={postElement} isLiked={post.likes.length > 0} className="flex items-center gap-6 mt-2" />
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
