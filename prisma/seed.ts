/* eslint-disable promise/catch-or-return */
import { PrismaClient } from '@prisma/client'
import { POSTS } from './initial/posts'
import { COMMENTS } from './initial/comments'

const prisma = new PrismaClient()

async function main() {
  // -------------- Seedings --------------
  await prisma.post.deleteMany()
  console.info('Deleted records in category table')
  console.info(`initail create post records`)
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
  console.info(`create post records complete`)

  await prisma.comment.deleteMany()

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
