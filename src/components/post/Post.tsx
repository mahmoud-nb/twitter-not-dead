import { PostHome } from '@/src/query/post.query'
import { PostLayout } from './PostLayout'
import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { Heart, MessageCircle, Repeat2 } from 'lucide-react'

type PostProps = {
    post: PostHome
}

export const Post = ({ post }: PostProps) => {
  return (
    <PostLayout user={post.user} postId={post.id} createdAt={post.createdAt}>
      <Link href={`/posts/${post.id}`} className="test-sm text-foreground">
          {post.content}
      </Link>
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
    </PostLayout>
  )
}