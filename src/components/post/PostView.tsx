import { notFound } from 'next/navigation'
import { getAuthSession } from "@/lib/auth"
import { getPostById, PostData } from "@/src/query/post.query"
import { PostCard } from './PostCard'


export const PostView = async ({ postId }: { postId:string }) => {

  const user = await getAuthSession()

  const post:PostData = await getPostById(postId, user?.id)

  if(!post) notFound()

  return (
    <>
      <PostCard key={post.id} post={post} layout='main' />
      {post.replies.map( reply => <PostCard key={reply.id} post={reply} /> )}
    </>
  )
}
