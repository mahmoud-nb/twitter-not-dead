import { Avatar, AvatarFallback, AvatarImage } from '@/src/components/ui/avatar';
import { User } from '@/src/query/user.query';

type userAvatarProps = {
    user:User
    className?: string
}

export const UserAvatar = ({ user, className } : userAvatarProps) => {
  return (
    <Avatar className={className}>
        {user?.image ? <AvatarImage src={user.image} alt={user.username as string} /> : null}
        <AvatarFallback>{user?.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
    </Avatar>
  )
}
