import { PostView } from '@/src/components/post/PostView'
import { UserCard } from '@/src/components/user/UserCard'
import { ArrowLeft } from 'lucide-react'

export default function PostLayout({ children, params }: { children: React.ReactNode, params: { postId: string } }) {
  return (
    <div className="p-4">
      <div className="flex gap-3 items-center mb-2">
        <ArrowLeft size={18} /> BACK 
      </div>
      {children}
    </div>
  )
}
