import Image from "next/image"


export const Header = () => {

  return (
    <header className="flex justify-center gap-1 p-2 bg-white fixed top-0 left-0 right-0 border-b border-blue-50 sm:hidden">
      <Image src="/images/twitter-logo.png" alt="Twitter" width={32} height={30}  />
    </header>
  )
}
