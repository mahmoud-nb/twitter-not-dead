import Image from "next/image"
import clsx from "clsx"
import { Navbar } from "./Navbar"

export const Aside = () => {
  const mainAsideStyle = {
    xs: 'flex flex-col gap-4 p-2 bg-white border-t border-blue-50 w-64 fixed top-0 bottom-0 -left-64',
    sm: 'sm:flex-col sm:justify-start sm:static sm:w-20 sm:border-t-0 sm:border-r',
    md: 'md:w-64'
  }

  return (
    <aside className={clsx(mainAsideStyle.xs, mainAsideStyle.sm, mainAsideStyle.md)}>
      <h1 className="flex justify-start sm:justify-center md:justify-start px-2 md:px-5">
        <Image src="/images/twitter-logo.png" alt="Twitter" width={32} height={30}  />
      </h1>
      <div className="flex-auto">
        <Navbar className="flex flex-col gap-2 items-start sm:items-center md:items-start" />
      </div>
      <div>
        -
      </div>
    </aside>
  )
}
