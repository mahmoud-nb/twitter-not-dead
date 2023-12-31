import Link from 'next/link'
import { UserAvatar } from "@/src/components/user/UserAvatar"
import { User, getUserProfil } from "@/src/query/user.query"
import { Link2, MapPin } from "lucide-react"
import { PostCard } from '../post/PostCard'
import { getUserPosts } from '@/src/query/post.query'
import { UserProfilActions } from './UserProfilActions'
import { isFollowedByCurrentUser } from '@/src/actions/user.action'

export const UserProfil = async ({ username, messages }: { username:string, messages:Record<string, string> }) => {

  const user = await getUserProfil({ username })

  if (!user) throw new Error('User is undefined!')

  const userPosts = await getUserPosts(user.id)
  const userFollowers = user?.followers || []

  const isFollowed = await isFollowedByCurrentUser(user.id)

  return (
    <div>
      <div className="h-32 bg-slate-100 relative">
        <UserAvatar user={user} className="w-24 h-24 border-spacing-3 border-white absolute left-8 -bottom-12" />
      </div>
      <div  className="flex items-center justify-end p-2 mb-3" >
        <UserProfilActions messages={messages} isFollowed={isFollowed} userProfilId={user.id} />
      </div>
      <div className="flex flex-col flex-auto gap-0.5 p-4">
        <div className="text-xl font-bold">{user.name} {user.lastname}</div>
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
          <div>{ user._count.followeds } {messages.subscriptions}</div>
          <div>{ user._count.followers } {messages.subscribers}</div>
        </div>
        {userFollowers.length > 0 && (
          <div className="px-4 items-center flex gap-6">
            <div className="flex">
              {userFollowers.map(el => {
                return (<div key={el.followed.id}>
                  <div className="-mr-4">
                    <UserAvatar user={el.followed as User} className="w-7 h-7 border-spacing-1 border-white" />
                  </div>
                </div>)
              })}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {messages?.followedBy} {userFollowers[0].followed.name} {userFollowers[0].followed.lastname}
            </div>
          </div>
        )}
      </div>

      <div className="mt-8">
        {userPosts.map((post) => (
          <PostCard key={post.id} post={post} userId={user.id} messages={messages} />
        ))}
      </div>
    </div>
  )
}
