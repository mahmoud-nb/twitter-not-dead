import { getLatetestPosts } from '@/src/query/post.query'
import { PostCard } from '@/src/components/post/PostCard'

export const Posts = async () => {
  const posts = await getLatetestPosts()

  return (
    <div>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
    </div>
  )
}
