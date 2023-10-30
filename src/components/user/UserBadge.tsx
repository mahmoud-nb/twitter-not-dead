import { User } from '@/src/query/user.query'
import { UserAvatar } from './UserAvatar'
import Link from 'next/link'
import clsx from 'clsx'

export const UserBadge = ({ user, className }: { user:User, className?:string }) => {

  if (!user) throw new Error('User is undefined!')

  return (
    <div className={clsx("flex gap-3", className)}>
      <UserAvatar user={user} />
      <div className="flex flex-col flex-auto gap-0.5">
        <Link href={`/${user.username}`} className="text-sm font-bold">{user.name} {user.lastname}</Link>
        <Link href={`/${user.username}`} className="text-sm font-light text-gray-500">{`@${user.username}`}</Link>
      </div>
    </div>
  )
}
