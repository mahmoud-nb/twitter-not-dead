import { UserAvatar } from "@/src/components/user/UserAvatar"
import { getUser } from "@/src/query/user.query"

export default async function Profil({ params }: { params: { username:string } }) {

  const user = await getUser({ username: params.username })

  if (!user) throw new Error('User is undefined!')

  return (
    <div>
      <div className="h-32 bg-slate-100 relative mb-14">
        <UserAvatar user={user} className="w-24 h-24 border-spacing-3 border-white absolute left-8 -bottom-12" />
      </div>
      <div className="flex flex-col flex-auto gap-0.5 p-4">
        <div className="text-sm font-bold">{user.name} {user.lastname}</div>
        <div className="text-sm font-light text-gray-500">{`@${user.username}`}</div>
      </div>
      <div className="p-4">
        {user.bio}
      </div>
      <div className="p-4">
        {user.link}
      </div>
    </div>
  )
}