"use server"

import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/src/query/user.query"

type Inputs = {
  content: string
}

export const createPost = async (values:Inputs, postId:string|null = null) => {
  console.log("I'm on th e server", values)

  const user = await getCurrentUser()

  if (user) {
    const post = await prisma.post.create({
      data: {
        content: values.content,
        ...( postId && { parentId: postId } ),
        userId: user.id
      }
    }) 

    return post.id
  }

  throw new Error('You must be authenticated')
}