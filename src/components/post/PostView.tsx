import { notFound } from 'next/navigation'
import { getAuthSession } from "@/lib/auth"
import { getPostById, PostData } from "@/src/query/post.query"
import { PostCard } from './PostCard'


export const PostView = async ({ postId }: { postId:string }) => {

  const session = await getAuthSession()
  const userId = session?.user.id

  if (!userId) throw new Error('User is undefined')

  const post:PostData = await getPostById(postId, userId)

  if(!post) notFound()

  return (
    <>
      <PostCard key={post.id} post={post} userId={userId} layout='main' />
      {post.replies.map( reply => <PostCard key={reply.id} post={reply} userId={userId} /> )}
    </>
  )
}
