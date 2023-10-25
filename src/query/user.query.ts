import { getAuthSession } from '@/lib/auth'
import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

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

export const getCurrentUser = async () => {
  const session = await getAuthSession()

  if (!session?.user.id) {
    throw new Error("User not found")
  }

  const user = await getUser({ id: session.user.id })

  return user
}

export type User = Prisma.PromiseReturnType<typeof getUser>