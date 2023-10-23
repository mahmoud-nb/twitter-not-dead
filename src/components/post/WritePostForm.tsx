'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { Button } from '@/src/components/ui/button'
import { Textarea } from '@/src/components/ui/textarea'
import { createPost } from '../../actions/write-post.action'

type Inputs = {
  content: string
}

export const WritePostForm = ({ messages } : {messages?: Record<string, string>}) => {
  const { register, handleSubmit } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    createPost(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Textarea placeholder={messages?.contentPlaceholder} className="border-0" {...register("content")} />
      <div className="flrx justify-end mt-2">
        <Button type="submit">{messages?.buttonText}</Button>
      </div>
    </form>
  )
}