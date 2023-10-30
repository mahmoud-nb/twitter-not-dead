import { timeAgo } from '@/lib/date'
import clsx from 'clsx'
import { MoreHorizontal, Repeat2 } from 'lucide-react'
import Link from 'next/link'
import { PropsWithChildren } from 'react'
import { UserAvatar } from '@/src/components/user/UserAvatar'
import { User } from '@/src/query/user.query'
import { PostHome } from '@/src/query/post.query'

type PostLayoutProps = PropsWithChildren<{
    post?: PostHome;
    className?: string;
}>

export const PostCardLayout = ({ post, children, className }: PostLayoutProps) => {

  const user = post?.user as User

  if (!post) throw new Error('Post is undefined!')
  if (!user) throw new Error('User is undefined!')

  const repostCardHead = (<div className="flex items-center gap-2">
    <Repeat2 strokeWidth={1} size={18} />
    {user.name} {user.lastname} a retweeté
  </div>)

  return (
    <div className={clsx("flex w-full flex-row items-start", className)}>
      <UserAvatar user={user} />

      <div className="ml-4 flex flex-col w-full gap-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-2 text-sm font-bold text-card-foreground mr-auto">
            <Link href={`/${user.username}`} className="text-sm font-bold">{user.name} {user.lastname}</Link>
            <Link href={`/${user.username}`} className="text-sm font-light text-gray-500">{`@${user.username}`}</Link>
          </div>
          {post.createdAt ? (
              <span className="text-sm text-muted-foreground">{timeAgo(post.createdAt)}</span>
          ) : null}
          <MoreHorizontal size={20} />
        </div>
        <div>{ children }</div>
      </div>
    </div>
  )
}
