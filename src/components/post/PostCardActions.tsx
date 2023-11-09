'use client'

import { toggleLike } from '@/src/actions/write-post.action'
import { Button } from '@/src/components/ui/button'
import { PostHome } from '@/src/query/post.query'
import clsx from 'clsx'
import { Heart, MessageCircle, Repeat2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { MouseEventHandler } from 'react'

type PostCardActionsProps = {
  post: PostHome
  isLiked?: Boolean
  className?: string
}

export const PostCardActions = ({ post, isLiked, className } : PostCardActionsProps) => {

  const router = useRouter()

  const iconSize = 22
  const iconStrokeWidth = 1

  const onLikeClick:MouseEventHandler<HTMLButtonElement> | undefined = (event) => {
    event.preventDefault()
    toggleLike(post.id, isLiked)

    router.refresh()
  }

  return (
    <div className={className}>
      <Button size="icon" variant="ghost">
        <MessageCircle strokeWidth={iconStrokeWidth} size={iconSize} /> 
        <span className="text-muted-foreground text-sm ml-2">{post._count.replies}</span>
      </Button>
      <Button size="icon" variant="ghost">
        <Repeat2 strokeWidth={iconStrokeWidth} size={iconSize} /> 
        <span className="text-muted-foreground text-sm ml-2">{post._count.reposts}</span>
      </Button>
      <Button size="icon" variant="ghost" onClick={onLikeClick} className={clsx({ 'text-red-500': isLiked })}>
        <Heart strokeWidth={iconStrokeWidth} size={iconSize} /> 
        <span className={clsx('text-muted-foreground text-sm ml-2', {'text-red-500': isLiked})}>{post._count.likes}</span>
      </Button>
    </div>
  )
}
