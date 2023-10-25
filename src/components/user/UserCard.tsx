import { getUser } from "@/src/query/user.query"

export const UserCard = ({ userId }: { userId:string }) => {

  const user = getUser({ id: userId })

  return (
    <div>
        Bonjour tout le monde
    </div>
  )
}
