import Image from "next/image"
import clsx from "clsx"
import { Navbar } from "./Navbar"
import ThemeToggle from "../theme/ThemeToggle"
import Globals from "@/config/globals"

export const Aside = () => {
  const mainAsideStyle = {
    xs: 'flex flex-col gap-4 p-2 border-t border-blue-50 w-64 fixed top-0 bottom-0 -left-72',
    sm: 'sm:flex-col sm:justify-start sm:left-0 sm:w-20 sm:border-t-0 sm:border-r',
    md: 'md:w-72'
  }

  const logoSrc = Globals.logo
  const logoAlt = Globals.title

  return (
    <aside className={clsx(mainAsideStyle.xs, mainAsideStyle.sm, mainAsideStyle.md)}>
      <h1 className="flex justify-start sm:justify-center md:justify-start px-2 py-3 md:px-5">
        <Image src={logoSrc} alt={logoAlt} width={32} height={30} />
      </h1>
      <div className="flex-auto">
        <Navbar className="flex flex-col gap-2 items-start sm:items-center md:items-start" />
      </div>
      <div>
        <ThemeToggle />
      </div>
    </aside>
  )
}
