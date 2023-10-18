import { getAuthSession } from '@/lib/auth'
import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export const getUser = async () => {
    const session = await getAuthSession()

    if (!session?.user.id) {
        throw new Error("User not found")
    }

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
    })

    return user
}

export type User = Prisma.PromiseReturnType<typeof getUser>