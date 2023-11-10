import { Navbar } from './Navbar'

export const Footer = () => {
  return (
    <footer className="p-2 fixed bottom-0 left-0 right-0 border-t border-blue-50 bg-white dark:bg-gray-950 dark:border-gray-700 sm:hidden">
        <Navbar className="flex items-center justify-between gap-2" />
    </footer>
  )
}
