import { UserAvatar } from '@/src/components/user/UserAvatar'
import { getUser, User } from '@/src/query/user.query'
import { WritePostForm } from './WritePostForm'

export const Write = async ({ messages } : {messages?: Record<string, string>}) => {
  
  const user:User = await getUser()

  return (
    <div className="flex w-full flex-row items-start p-4 border-b border-blue-50">
        <UserAvatar user={user} />
        <div className="ml-4 flex flex-col w-full gap-2">
            <WritePostForm messages={messages} />
        </div>
    </div>
  )
}
