import { getLatetestPosts } from '@/src/query/post.query'
import { PostCard } from '@/src/components/post/PostCard'
import { getCurrentUser } from '@/src/query/user.query'

export const Posts = async ({ messages }: { messages?: Record<string, string>, }) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('User is undefined')

  const posts = await getLatetestPosts(user.id)

  return (
    <div>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} userId={user.id} messages={messages} />
        ))}
    </div>
  )
}