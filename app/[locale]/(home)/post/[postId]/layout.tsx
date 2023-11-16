import { Button } from '@/src/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function PostLayout({ children, params }: { children: React.ReactNode, params: { postId: string } }) {
  return (
    <>
      <div className="flex gap-3 items-center p-4">
        <Button variant="ghost" className="rounded-full">
          <ArrowLeft size={18} />
        </Button>
        <span>Poster</span>
      </div>
      {children}
    </>
  )
}
