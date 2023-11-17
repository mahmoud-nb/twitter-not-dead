import { AuthOptions, getServerSession } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "./prisma"
import { env } from "./env"

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
      profile(profile) {
        return {
          id: profile?.id.toString() || "",
          username: profile.login,
          name: profile.name,
          lastname: profile.lastname,
          email: profile.email,
          image: profile.avatar_url,
          bio: profile.bio
        }
      }
    }),
  ],
  callbacks: {
    session({ session, user }) {
        if (!session.user) return session

        session.user.id = user.id

        return session
    }
  },
  secret: env.NEXTAUTH_SECRET
}

export const getAuthSession = async () => {
  const session = await getServerSession(authOptions)
  return session
}