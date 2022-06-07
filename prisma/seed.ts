/* eslint-disable promise/catch-or-return */
import { PrismaClient } from '@prisma/client'
import { POSTS } from './initial/posts'
import { COMMENTS } from './initial/comments'
import { USERS } from './initial/users'

const prisma = new PrismaClient()

async function main() {
  // -------------- Seedings --------------
  await prisma.user.deleteMany()
  console.info('Deleted records in user')
  console.info(`initail create user records`)
  const userData = USERS.map((u) => {
    return {
      name: u.name,
      username: u.username,
      email: u.email,
      address: u.address,
      phone: u.phone,
      website: u.website,
      company: u.company,
    }
  })
  await prisma.user.createMany({ data: userData })
  console.info(`create post records complete`)
  await prisma.post.deleteMany()
  console.info('Deleted records in category table')
  console.info(`initail create post records`)
  const postData = POSTS.map((p) => {
    return {
      userId: p.userId,
      title: p.title,
      body: p.body,
      deletedAt: null,
    }
  })
  await prisma.post.createMany({
    data: postData,
  })
  console.info(`create post records complete`)
  await prisma.comment.deleteMany()
  console.info(`initail create post records`)
  const comentData = COMMENTS.map((c) => {
    return {
      postId: c.postId,
      name: c.name,
      email: c.email,
      body: c.body,
      deletedAt: null,
    }
  })
  console.info(`create comment records complete`)
  await prisma.comment.createMany({
    data: comentData,
  })
  console.info(`create comment records complete`)
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
