import { getAuthSession } from '@/lib/auth'
import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

const userQuery = {
    id: true,
    name: true,
    lastname: true,
    username: true,
    email: true,
    emailVerified: true,
    image: true,
    cover: true,
    bio: true,
    link: true,
    location: true,
    createdAt: true,
} satisfies Prisma.UserSelect

export type FindUniqueUserWhere = Partial<Record<"id"|"username"|"email", string>>

export const getUser = async (where: FindUniqueUserWhere) => {

  if (!where) throw new Error("User not found")

  const user = await prisma.user.findUnique({ where } as { where: Prisma.UserWhereUniqueInput })

  return user
}

export const getUserProfil = async (queryWhere: FindUniqueUserWhere) => {

  if (!queryWhere) throw new Error("User not found")

  const where = queryWhere as Prisma.UserWhereUniqueInput

  const user = await prisma.user.findUnique({ 
    include: {
      followeds: {
        include: {
          //followed: true,
          follower: true
        },
        take: 3,
        orderBy: {
          createdAt: 'desc'
        }
      },
      followers: {
        include: {
          followed: true,
          //follower: true
        },
        take: 3,
        orderBy: {
          createdAt: 'desc'
        }
      },
      _count: {
        select: {
          followeds: true,
          followers: true,
          likes: true
        }
      },
    },
    where 
  })

  return user
}

export const getCurrentUser = async (userId:string|null = null) => {
  if (!userId) {
    const session = await getAuthSession()

    if (!session?.user.id) {
      console.error("Session is expired or invalid")
      return null
    }

    userId = session.user.id 
  }
  
  const user = await getUser({ id: userId })

  return user
}

export type User = Prisma.PromiseReturnType<typeof getUser>