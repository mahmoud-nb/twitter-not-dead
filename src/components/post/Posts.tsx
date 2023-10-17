import { Post } from '@/src/components/post/Post'
import { getLatetestPosts } from '@/src/query/post.query'

export const Posts = async () => {
  const posts = await getLatetestPosts()

  return (
    <div>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
    </div>
  )
}
