import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export const getLatetestPosts = (userId?: string) => 
  prisma.post.findMany({
    select: {
      id: true,
      content: true,
      createdAt: true,
      user: {
          select: {
              id: true,
              username: true,
              name: true,
              lastname: true,
              image: true,
          }
      },
      likes: {
          select: {
              userId: true,
          },
          where: {
              userId: userId ?? "error"
          }
      },
      _count: {
          select: {
              likes: true,
              replies: true,
              reposts: true,
          }
      }
    },
    where: {
        parentId: null
    },
    take: 20,
    orderBy: {
        createdAt: 'desc'
    },
  })


export type PostHome = Prisma.PromiseReturnType<typeof getLatetestPosts>[number]