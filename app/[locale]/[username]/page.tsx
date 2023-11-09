import { UserProfil } from '@/src/components/user/UserProfil'

export default function Profil({ params }: { params: { username:string } }) {

  return <UserProfil username={params.username} />
}