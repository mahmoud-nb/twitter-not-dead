import { ArrowLeft } from 'lucide-react'

export default function PostLayout({ children, params }: { children: React.ReactNode, params: { postId: string } }) {
  return (
    <>
      <div className="flex gap-3 items-center mb-2">
        <ArrowLeft size={18} /> BACK 
      </div>
      {children}
    </>
  )
}
