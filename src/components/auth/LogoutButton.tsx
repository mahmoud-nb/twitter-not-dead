"use client"

import { useTransition } from 'react'
import { signOut } from "next-auth/react"
import { Button } from '@/src/components/ui/button'
import { Loader } from '@/src/components/ui/loader'
import { LogOut } from 'lucide-react'

export default function LogoutButton({ messages }: { messages?: Record<string, string> }) {
    const [isPending, startTransition] = useTransition()
  return (
    <Button onClick={() => {
        startTransition(() => signOut())
    }}>
        {isPending ? <Loader className="mr-2 h-4 w-4" /> : <LogOut className="mr-2 h-4 w-4" />}
        {messages?.label}
    </Button>
  )
}