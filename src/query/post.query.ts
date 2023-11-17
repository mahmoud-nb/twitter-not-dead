import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'


export const postQuerySelect = (userId?: string) => ({
  id: true,
  content: true,
  image: true,
  link: true,
  originalId: true,
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
      userId: userId
    }
  },
  replies: {
    select: {
      userId: true,
    },
    where: {
      userId: userId
    }
  },
  original: {
    select: {
      id: true,
      content: true,
      image: true,
      link: true,
      originalId: true,
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
          userId: userId
        }
      },
      replies: {
        select: {
          userId: true,
        },
        where: {
          userId: userId
        }
      },
      _count: {
        select: {
          likes: true,
          replies: true,
          reposts: true,
        }
      }
    }
  },
  reposts: {
    select: {
      id: true,
      content: true,
      image: true,
      link: true,
      originalId: true,
      createdAt: true,
      user: true,
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
      ...postQuerySelect(userId),
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
    ...postQuerySelect(userId),
    replies: {
      select: postQuerySelect(userId)
    },
    parent: {
      select: postQuerySelect(userId)
    }
  },
  where: {
    id
  }
})

export const getUserPosts = async (userId:string) => prisma.post.findMany({
  select: {
    ...postQuerySelect(userId),
  },
  where: {
    userId,
    parentId: null
  },
  take: 20,
  orderBy: {
    createdAt: 'desc'
  },
})


export const isLikedPost = (postId:string, userId:string) => prisma.like.findFirst({
  select: {
    id: true
  },
  where: {
    postId, 
    userId
  }
})

export type Post = {
  id: String
  content: String
  image: String    
  link: String     
  createdAt: String
  userId: String
  parentId: String, 
  originalId: String
}

export type PostHome = Prisma.PromiseReturnType<typeof getLatetestPosts>[number]
export type PostData = Prisma.PromiseReturnType<typeof getPostById>
