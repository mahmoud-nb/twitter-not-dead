"use server"

import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "../query/user.query"

export const followUser = async (userId:string) => {

  const currentUser = await getCurrentUser()

  if (currentUser) {
    const post = await prisma.follow.create({
      data: {
        followerId: userId,
        followingId: currentUser.id
      }
    }) 

    return post.id
  }

  throw new Error('You must be authenticated')
}

export const unsubscribeUser = async (userId:string) => {

  const currentUser = await getCurrentUser()

  if (currentUser) {
    await prisma.follow.deleteMany({
      where: {
        followerId: userId,
        followingId: currentUser.id
      }
    })
  }

  throw new Error('You must be authenticated')
}

export const isFollowedByCurrentUser = async (userId:string, currentUserId?:string) => {
  const currentUser = await getCurrentUser()
  if (currentUser) {
    const isFollowed = await prisma.follow.findMany({
      where: {
        followingId: currentUser.id,
        followerId: userId
      }
    })
  
    return isFollowed.length > 0
  }

  return false  
}