import Globals from '@/config/globals'
import { getAuthSession } from '@/lib/auth'
import { AuthSection } from '@/src/components/auth/AuthSection'
import Image from 'next/image'

export default async function Login() {
  const session = await getAuthSession()

  const logoSrc = Globals.logo
  const logoAlt = Globals.title
  const logoBaseSize = { w: 32, h:30 }


  return (
    <div className="flex flex-col gap-4 md:flex-row" >
      <div className="flex justify-center mb-6 p-8">
        <Image src={logoSrc} alt={logoAlt} width={logoBaseSize.w*6} height={logoBaseSize.h*6} />
      </div>    
      <div className="p-8 flex-1">
        <AuthSection isLoggedIn={!!session} />
      </div>    
    </div>
  )
}
