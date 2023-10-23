import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'


const postSelect = (userId?: string) => ({
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
} satisfies Prisma.PostSelect)

export const getLatetestPosts = (userId?: string) => 
  prisma.post.findMany({
    select: {
      ...postSelect(userId),
    },
    where: {
        parentId: null
    },
    take: 20,
    orderBy: {
        createdAt: 'desc'
    },
  })

export const getPostById = (id: string, userId?: string) => prisma.post.findUnique({
  select: {
    ...postSelect(userId),
    replies: {
      select: postSelect(userId)
    },
    parent: {
      select: postSelect(userId)
    }
  },
  where: {
    id
  }
})


export type PostHome = Prisma.PromiseReturnType<typeof getLatetestPosts>[number]
export type PostData = Prisma.PromiseReturnType<typeof getPostById>