import clsx from 'clsx';
import { PropsWithChildren } from 'react'
import { UserBadge } from '../user/UserBadge';
import { User } from '@/src/query/user.query';
import { PostHome } from '@/src/query/post.query';

type PostMainCardLayoutProps = PropsWithChildren<{
    post?: PostHome;
    className?: string;
}>

export const PostMainCardLayout = ({ post, children, className }: PostMainCardLayoutProps) => {

  const user = post?.user as User

  if (!user) throw new Error('User is undefined!')

  return (
    <div className={clsx("flex w-full flex-col items-star", className)}>
      <UserBadge user={user} className="mb-2" />
      <div className="flex flex-col w-full gap-2">
          <div>{ children }</div>
      </div>
    </div>
  )
}
