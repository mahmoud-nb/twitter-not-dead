import { getAuthSession } from '@/lib/auth'
import { AuthSection } from '@/src/components/auth/AuthSection'

export default async function Login() {
  const session = await getAuthSession()
  return (
    <div>
      <AuthSection isLoggedIn={!!session} />
    </div>
  )
}
