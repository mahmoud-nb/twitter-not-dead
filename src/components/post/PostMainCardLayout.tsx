import clsx from 'clsx';
import { PropsWithChildren } from 'react'
import { UserBadge } from '../user/UserBadge';
import { User } from '@/src/query/user.query';

type PostLayoutProps = PropsWithChildren<{
    user: User;
    postId?: string;
    createdAt?: Date;
    className?: string;
}>

export const PostMainCardLayout = ({ children, user, postId, createdAt, className }: PostLayoutProps) => {

  if (!user) throw new Error('User is undefined!')

  return (
    <div className={clsx("flex w-full flex-col items-start p-4 border-t border-blue-50")}>
      <UserBadge user={user} className="mb-2" />
      <div className="flex flex-col w-full gap-2">
          <div>{ children }</div>
      </div>
    </div>
  )
}
