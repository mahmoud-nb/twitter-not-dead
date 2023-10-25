import Link from 'next/link'
import { PostCardLayout } from './PostCardLayout'
import { PostHome } from '@/src/query/post.query'
import { Button } from '@/src/components/ui/button'
import { Heart, MessageCircle, Repeat2 } from 'lucide-react'
import { PostMainCardLayout } from './PostMainCardLayout'
import { User } from '@/src/query/user.query'
import dayjs from 'dayjs'

type PostProps = {
  post: PostHome
  layout?: string
}

export const PostCard = ({ post, layout = 'default' }: PostProps) => {

  const postCardSection = (
    <div>
      <Link href={`/post/${post.id}`} className="test-sm text-foreground">
          {post.content}
      </Link>
      { layout === 'main' && (<div className="text-sm text-muted-foreground mt-2">
        {dayjs(post.createdAt).format('HH:mm A · DD-MM-YYYY ')}
      </div>)}
      <div className="flex items-center gap-6 mt-2">
        <Button size="icon" variant="ghost">
          <MessageCircle strokeWidth={1} size={20} /> 
          <span className="text-muted-foreground text-sm ml-2">{post._count.replies}</span>
        </Button>
        <Button size="icon" variant="ghost">
          <Repeat2 strokeWidth={1} size={20} /> 
          <span className="text-muted-foreground text-sm ml-2">{post._count.reposts}</span>
        </Button>
        <Button size="icon" variant="ghost">
          <Heart strokeWidth={1} size={20} /> 
          <span className="text-muted-foreground text-sm ml-2">{post._count.likes}</span>
        </Button>
      </div>
    </div>
  )

  const layoutProps = {
    postId: post.id,
    user: post.user as User,
    createdAt: post.createdAt
  }

  return (<div>{ 
    layout === 'main' 
    ? <PostMainCardLayout {...layoutProps}>{ postCardSection }</PostMainCardLayout> 
    : <PostCardLayout {...layoutProps}>{ postCardSection }</PostCardLayout>
 }</div>)
}
