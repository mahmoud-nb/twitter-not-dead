import Image from "next/image"
import Globals from "@/config/globals"


export const Header = () => {

  const logoSrc = Globals.logo
  const logoAlt = Globals.title

  return (
    <header className="flex justify-center gap-1 p-2 fixed top-0 left-0 right-0 border-b border-blue-50 sm:hidden">
      <Image src={logoSrc} alt={logoAlt} width={32} height={30} />
    </header>
  )
}
