"use client"

import { useTransition } from 'react'
import { signIn } from "next-auth/react"
import { Button } from '@/src/components/ui/button'
import { Loader } from '@/src/components/ui/loader'
import { LogIn } from 'lucide-react'

export default function LoginButton({ messages }: { messages?: Record<string, string> }) {
    const [isPending, startTransition] = useTransition()
  return (
    <Button onClick={() => {
        startTransition(() => signIn())
    }}>
        {isPending ? <Loader className="mr-2 h-4 w-4" /> : <LogIn className="mr-2 h-4 w-4" />}
        {messages?.label}
    </Button>
  )
}

