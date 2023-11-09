import Link from 'next/link'
import { UserAvatar } from "@/src/components/user/UserAvatar"
import { getUserProfil } from "@/src/query/user.query"
import { Link2, MapPin } from "lucide-react"
import { Posts } from '../post/Posts'
import { PostCard } from '../post/PostCard'
import { getUserPosts } from '@/src/query/post.query'

export const UserProfil = async ({ username, messages }: { username:string, messages?:Record<string, string> }) => {

  const user = await getUserProfil({ username })

  if (!user) throw new Error('User is undefined!')

  const userPosts = await getUserPosts(user.id)

  return (
    <div>
      <div className="h-32 bg-slate-100 relative mb-14">
        <UserAvatar user={user} className="w-24 h-24 border-spacing-3 border-white absolute left-8 -bottom-12" />
      </div>
      <div className="flex flex-col flex-auto gap-0.5 p-4">
        <div className="text-sm font-bold">{user.name} {user.lastname}</div>
        <div className="text-sm font-light text-gray-500">{`@${user.username}`}</div>
      </div>
      <div className="flex flex-col gap-2 mb-3">
        <div className="px-4 mb-2">
          {user.bio}
        </div>
        <div className="px-4">
        {user.location && <div className="flex items-center gap-2">
        <MapPin size={18} /> {user.location}
        </div>}
        </div>
        <div className="px-4">
          {user.link && <Link href={user.link} className="flex items-center gap-2">
            <Link2 size={18} /> {user.link}
          </Link>}
        </div>
        <div className="px-4 flex gap-3">
          <div>{ user._count.followeds } abonnements</div>
          <div>{ user._count.followers } abonnés</div>
        </div>
      </div>

      <div className="mt-4">
        {userPosts.map((post) => (
          <PostCard key={post.id} post={post} user={user} messages={messages} />
        ))}
      </div>
    </div>
  )
}
