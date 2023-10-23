import { formatDate } from '@/lib/date';
import clsx from 'clsx';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { PropsWithChildren } from 'react'
import { UserAvatar } from '@/src/components/user/UserAvatar'
import { User } from '@/src/query/user.query';

type PostLayoutProps = PropsWithChildren<{
    user: User;
    postId?: string;
    createdAt?: Date;
    className?: string;
}>

export const PostCardLayout = ({ children, user, postId, createdAt, className }: PostLayoutProps) => {

  if (!user) throw new Error('User is undefined!')

  return (
    <div className={clsx("flex w-full flex-row items-start p-4 border-t border-blue-50", className)}>
      <UserAvatar user={user} />

      <div className="ml-4 flex flex-col w-full gap-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-2 text-sm font-bold text-card-foreground mr-auto">
            <Link href={`/users/${user.id}`} className="text-sm font-bold">{user.name} {user.lastname}</Link>
            <Link href={`/users/${user.id}`} className="text-sm font-light text-gray-500">{`@${user.username}`}</Link>
          </div>
          {createdAt ? (
              <span className="text-sm text-muted-foreground">{formatDate(createdAt)}</span>
          ) : null}
          <MoreHorizontal size={20} />
        </div>
        <div>{ children }</div>
      </div>
    </div>
  )
}
