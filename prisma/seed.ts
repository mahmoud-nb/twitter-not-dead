import { faker } from "@faker-js/faker"
import { Prisma, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const main = async () => {

    // Users
    const users = []
    for (let i=0 ; i<10 ; i++) {
        const user = {
            username: faker.internet.userName(),
            image: faker.image.avatar(),
            name: faker.person.firstName(),
            lastname: faker.person.lastName(),
            bio: faker.lorem.paragraph(),
            link: faker.internet.url(),
            email: faker.internet.email(),
            location: faker.location.country()
        } satisfies Prisma.UserCreateInput;

        const u = await prisma.user.create({ data: user })

        users.push(u)
    }

    // Posts
    const posts = []
    for (let i=0 ; i<200 ; i++) {
        const randomUserIndex = faker.number.int({ min:0, max: users.length - 1 })
        const randomWorldIndex = faker.number.int({ min:1, max: 12 })

        const post = {
            content: faker.lorem.sentence(randomWorldIndex),
            userId: users[randomUserIndex].id
        } satisfies Prisma.PostUncheckedCreateInput

        const p = await prisma.post.create({ data: post })
        posts.push(p)
    }

    // Likes
    for (let i=0 ; i<150 ; i++) {
        const randomUserIndex = faker.number.int({ min:0, max: users.length - 1 })
        const randomPostIndex = faker.number.int({ min:0, max: posts.length - 1 })

        const like = {
            postId: posts[randomPostIndex].id,
            userId: users[randomUserIndex].id
        } satisfies Prisma.LikeUncheckedCreateInput

        await prisma.like.create({ data: like })
    }

    // Replies
    for (let i=0 ; i<100 ; i++) {
        const randomUserIndex = faker.number.int({ min:0, max: users.length - 1 })
        const randomPostIndex = faker.number.int({ min:0, max: posts.length - 1 })
        const randomWorldIndex = faker.number.int({ min:1, max: 12 })

        const reply = {
            content: faker.lorem.sentence(randomWorldIndex),
            parentId: posts[randomPostIndex].id,
            userId: users[randomUserIndex].id
        } satisfies Prisma.PostUncheckedCreateInput

        await prisma.post.create({ data: reply })
    }

    // Reposts
    for (let i=0 ; i<100 ; i++) {
        const randomUserIndex = faker.number.int({ min:0, max: users.length - 1 })
        const randomPostIndex = faker.number.int({ min:0, max: posts.length - 1 })

        const repost = {
            content: `Repost of ${randomPostIndex}`,
            originalId: posts[randomPostIndex].id,
            userId: users[randomUserIndex].id
        } satisfies Prisma.PostUncheckedCreateInput

        await prisma.post.create({ data: repost })
    }
}

main().then(async () => { await prisma.$disconnect() }).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})