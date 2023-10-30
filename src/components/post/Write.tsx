import { UserAvatar } from '@/src/components/user/UserAvatar'
import { getCurrentUser, User } from '@/src/query/user.query'
import { WritePostForm } from './WritePostForm'

type WritePostProps = {
  messages?: Record<string, string>,
  postId?: string
}

export const Write = async ({ messages, postId = null } : WritePostProps) => {
  
  const user:User = await getCurrentUser()

  return (
    <div className="flex w-full flex-row items-start p-4 border-b border-blue-50">
        <UserAvatar user={user} />
        <div className="ml-4 flex flex-col w-full gap-2">
            <WritePostForm messages={messages} postId={postId} />
        </div>
    </div>
  )
}
