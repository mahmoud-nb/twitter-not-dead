import Link from 'next/link'
import { PostCardLayout } from './PostCardLayout'
import { PostHome } from '@/src/query/post.query'
import { Button } from '@/src/components/ui/button'
import { Heart, MessageCircle, Repeat2 } from 'lucide-react'
import { PostMainCardLayout } from './PostMainCardLayout'
import dayjs from 'dayjs'

type PostCardProps = {
  post: PostHome
  layout?: string
}

export const PostCard = ({ post, layout = 'default' }: PostCardProps) => {

  console.log('POST', post)

  const postCardSection = (postElement: PostHome) => { 

    const iconSize = 20
    const iconStrokeWidth = 1

    return (
      <div>
        <Link href={`/post/${postElement.id}`} className="test-sm text-foreground">
            {postElement.content}
        </Link>
        { layout === 'main' && (<div className="text-sm text-muted-foreground mt-2">
          {dayjs(postElement.createdAt).format('HH:mm A · DD-MM-YYYY ')}
        </div>)}
        <div className="flex items-center gap-6 mt-2">
          <Button size="icon" variant="ghost">
            <MessageCircle strokeWidth={iconStrokeWidth} size={iconSize} /> 
            <span className="text-muted-foreground text-sm ml-2">{postElement._count.replies}</span>
          </Button>
          <Button size="icon" variant="ghost">
            <Repeat2 strokeWidth={iconStrokeWidth} size={iconSize} /> 
            <span className="text-muted-foreground text-sm ml-2">{postElement._count.reposts}</span>
          </Button>
          <Button size="icon" variant="ghost">
            <Heart strokeWidth={iconStrokeWidth} size={iconSize} /> 
            <span className="text-muted-foreground text-sm ml-2">{postElement._count.likes}</span>
          </Button>
        </div>
      </div>
    )
  }

  const displayPostCard = (p: PostHome) => layout === 'main' 
  ? <PostMainCardLayout post={p}>{ postCardSection(p) }</PostMainCardLayout> 
  : <PostCardLayout post={p}>{ postCardSection(p) }</PostCardLayout>

  const repostCardHead = (<div className="flex items-center gap-2">
    <Repeat2 strokeWidth={1} size={18} />
    <div className="text-sm text-slate-500 font-medium">{post.user.name} {post.user.lastname} a retweeté!</div>
  </div>)

  const displayCard = post.originalId ? post.original : post

  return <div className="flex flex-col gap-3 p-4 border-t border-blue-50">
    <div>{ repostCardHead }</div>
    <div>{displayPostCard(displayCard as PostHome)}</div>
  </div>
}
