'use client'

import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button } from '@/src/components/ui/button'
import { Textarea } from '@/src/components/ui/textarea'
import { createPost } from '../../actions/write-post.action'
import { Input } from '../ui/input'

type Inputs = {
  content: string
}

export const WritePostForm = ({ messages, postId } : { messages?: Record<string, string>, postId?: string }) => {
  
  const router = useRouter()
  const { register, handleSubmit, reset } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    createPost(data, postId)

    reset({ content: "" })

    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input type="hidden" value=""  />
      <Textarea placeholder={messages?.contentPlaceholder} className="border-0" {...register("content")} />
      <div className="flex justify-end mt-2">
        <Button type="submit" className="rounded-full">{messages?.buttonText}</Button>
      </div>
    </form>
  )
}