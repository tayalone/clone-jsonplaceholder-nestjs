/* eslint-disable promise/catch-or-return */
import { PrismaClient } from '@prisma/client'
import { POSTS } from './migrations/initial/posts'

const prisma = new PrismaClient()

async function main() {
  // -------------- Seedings --------------
  console.info(`initail create post data`)
  const postData = POSTS.map((p) => {
    return {
      userId: p.userId,
      title: p.title,
      body: p.body,
    }
  })
  await prisma.post.createMany({
    data: postData,
  })
  console.info(`create post data is done`)
  // --------------------------------------
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    prisma.$disconnect()
  })
