"use server"

import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/src/query/user.query"
import { isLikedPost } from '@/src/query/post.query'
import { revalidatePath } from "next/cache"

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
    
    if ( !!isLikedByCurrentUser ) {
      const like = await prisma.like.delete({
        where: {
          id: isLikedByCurrentUser.id
        }
      })

      return like
    } 

    const like = await prisma.like.create({
      data: {
        postId,
        userId: user.id
      }
    }) 

    revalidatePath('/')
    revalidatePath(`/post/${postId}`)

    return like
  }

  throw new Error('You must be authenticated')
}

export const doRepost = async (postId:string, userId:string) => {
  const post = await prisma.post.create({
    data: {
      content: '',
      originalId: postId,
      userId,
    }
  }) 

  return post.id
}