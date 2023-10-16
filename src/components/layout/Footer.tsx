import Link from 'next/link'
import { buttonVariants } from '@/src/components/ui/button'
import { Home, PenSquare, User } from 'lucide-react'
import { clsx } from 'clsx'
import { Navbar } from './Navbar'

export const Footer = () => {
  return (
    <footer className="p-2 bg-white fixed bottom-0 left-0 right-0 border-t border-blue-50 sm:hidden">
        <Navbar className="flex items-center justify-between gap-2" />
    </footer>
  )
}
