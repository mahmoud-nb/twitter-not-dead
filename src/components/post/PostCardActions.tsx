'use client'

import { doRepost, toggleLike } from '@/src/actions/write-post.action'
import { Button } from '@/src/components/ui/button'
import { PostHome } from '@/src/query/post.query'
import clsx from 'clsx'
import { Heart, MessageCircle, Repeat2 } from 'lucide-react'
import { Loader } from '@/src/components/ui/loader'
import { useRouter } from 'next/navigation'
import { MouseEventHandler, useTransition } from 'react'


type PostCardActionsProps = {
  post: PostHome
  userId: string
  isLiked?: Boolean
  isReposted?: Boolean
  isAnswered?: Boolean
  className?: string
}

export const PostCardActions = ({ post, userId, isLiked, isReposted, isAnswered, className } : PostCardActionsProps) => {

  const iconSize = 18
  const iconStrokeWidth = 2

  const router = useRouter()
  const [isLikePending, onLikeTransition] = useTransition()
  const [isRepostPending, onRepostTransition] = useTransition()

  const onLikeClick:MouseEventHandler<HTMLButtonElement> | undefined = (event) => {
    event.preventDefault()
    
    onLikeTransition(() => { 
      toggleLike(post.id, isLiked)
    })

    router.refresh()
  }

  const onRepostClick = () => {
    onRepostTransition(() => { 
      doRepost(post.id, userId)
    })

    router.refresh()
  }

  return (
    <div className={className}>
      <Button size="icon" variant="net" className={clsx({ 'text-sky-400': isAnswered })}>
        <MessageCircle strokeWidth={iconStrokeWidth} size={iconSize} /> 
        <span className={clsx('text-sm ml-2', {'text-sky-400': isAnswered})}>{post._count.replies}</span>
      </Button>
      <Button size="icon" variant="net" onClick={onRepostClick} className={clsx({ 'text-green-500': isReposted })}>
        {isRepostPending ? <Loader size={iconSize} /> : <Repeat2 strokeWidth={iconStrokeWidth} size={iconSize} />}
        <span className={clsx('text-sm ml-2', {'text-green-500': isReposted})}>{post._count.reposts}</span>
      </Button>
      <Button size="icon" variant="net" onClick={onLikeClick} className={clsx({ 'text-red-500': isLiked })}>
        {isLikePending ? <Loader size={iconSize} /> : <Heart strokeWidth={iconStrokeWidth} size={iconSize} className={clsx({ 'fill-red-500': isLiked })} />}
        <span className={clsx('text-sm ml-2', {'text-red-500': isLiked})}>{post._count.likes}</span>
      </Button>
    </div>
  )
}
