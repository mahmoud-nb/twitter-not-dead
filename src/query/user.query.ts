import { getAuthSession } from '@/lib/auth'
import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { postQuerySelect } from './post.query'

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

type FindUniqueUserQuery = {
  id?: string;
  username?: string;
  email?: string;
}

export const getUser = async ({ id, email, username }: FindUniqueUserQuery) => {

  let where = null

  if (id) where = { id }
  if (email) where = { email }
  if (username) where = { username }

  if (!where) throw new Error("User not found")

  const user = await prisma.user.findUnique({ where })

  return user
}

export const getUserProfil = async ({ id = "clnu86hud0000u74s5vjmttek", email, username }: FindUniqueUserQuery) => {

  let where = null

  if (id) where = { id }
  if (email) where = { email }
  if (username) where = { username }

  if (!where) throw new Error("User not found")

  const user = await prisma.user.findUnique({ 
    select: {
      ...userQuery,
      _count: {
        select: {
          followeds: true,
          followers: true,
          likes: true
        }
      },
      posts: {
        select: {
          ...postQuerySelect(id)
        },
        take: 10,
        orderBy: {
          createdAt: 'desc'
        }
      },
      followeds: {
        select: {
          follower:{
            select: {
              id: true,
              name: true,
              lastname: true,
              username: true,
              email: true,
              image: true,
            }
          }
        },
        take: 5,
        orderBy: {
          createdAt: 'desc'
        }
      }
    },
    where 
  })

  return user
}

export const getCurrentUser = async () => {
  const session = await getAuthSession()

  if (!session?.user.id) {
    return null
    throw new Error("User not found")
  }

  const user = await getUser({ id: session.user.id })

  return user
}

export type User = Prisma.PromiseReturnType<typeof getUser>