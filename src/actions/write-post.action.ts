"use server"

import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/src/query/user.query"
import { isLikedPost } from '@/src/query/post.query'

type Inputs = {
  content: string
}

export const createPost = async (values:Inputs, postId:string|null = null) => {

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

export const toggleLike = async (postId:string, isLiked:Boolean = false) => {
  const user = await getCurrentUser()
  
  if (user) {
    const isLikedByCurrentUser = await isLikedPost(postId, user.id)
    console.log('___toggleLike', isLiked, postId, user?.name)
    if ( !!isLikedByCurrentUser ) {
      const like = await prisma.like.deleteMany({
        where: {
          postId,
          userId: user.id
        }
      })

      console.log('___deleteMany:::', like)

      return like
    } 

    const like = await prisma.like.create({
      data: {
        postId,
        userId: user.id
      }
    }) 

    console.log('___create:::', like)

    return like
  }

  throw new Error('You must be authenticated')
}