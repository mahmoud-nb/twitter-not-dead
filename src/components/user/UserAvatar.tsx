import { Avatar, AvatarFallback, AvatarImage } from '@/src/components/ui/avatar';
import { PostHome } from '@/src/query/post.query'

type userAvatarProps = {
    user: PostHome['user'];
}

export const UserAvatar = ({ user } : userAvatarProps) => {
  return (
    <Avatar>
        {user.image ? <AvatarImage src={user.image} alt={user.username as string} /> : null}
        <AvatarFallback>{user.username?.slice(0, 2).toUpperCase()}</AvatarFallback>
    </Avatar>
  )
}
