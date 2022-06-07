/* eslint-disable promise/catch-or-return */
import { PrismaClient } from '@prisma/client'
import { POSTS } from './initial/posts'
import { COMMENTS } from './initial/comments'
import { USERS } from './initial/users'
import { ALBUMS } from './initial/albums'
import { PHOTOS } from './initial/photos'
import { TODOS } from './initial/todos'

const prisma = new PrismaClient()

async function main() {
  // -------------- Seedings --------------
  await prisma.user.deleteMany()
  console.info('deleted records in user')
  console.info(`initail create user records`)
  const userData = USERS.map((u) => {
    return {
      name: u.name,
      username: u.username.toLowerCase(),
      email: u.email.toLowerCase(),
      address: {
        ...u.address,
        geo: {
          lat: parseFloat(u.address.geo.lat) || 0.0,
          lng: parseFloat(u.address.geo.lng) || 0.0,
        },
      },
      phone: u.phone,
      website: u.website,
      company: u.company,
    }
  })
  await prisma.user.createMany({ data: userData })
  console.info(`create post records complete`)
  await prisma.post.deleteMany()
  console.info('deleted records in category table')
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

  await prisma.album.deleteMany()
  console.info('deleted records in album')
  console.info(`initail create album records`)
  const albumData = ALBUMS.map((a) => {
    return {
      userId: a.userId,
      title: a.title,
    }
  })
  await prisma.album.createMany({
    data: albumData,
  })
  console.info(`create album records complete`)

  await prisma.photo.deleteMany()
  console.info('deleted records in photo')
  console.info(`initail create photo records`)

  const photoData = PHOTOS.map((p) => {
    return {
      albumId: p.albumId,
      title: p.title,
      url: p.url,
      thumbnailUrl: p.thumbnailUrl,
    }
  })
  await prisma.photo.createMany({
    data: photoData,
  })
  console.info(`create photos records complete`)
  console.info('deleted records in photo')

  await prisma.todo.deleteMany()
  console.info('deleted todos in photo')
  console.info(`initail create todos records`)

  const todoData = TODOS.map((t) => {
    return { userId: t.userId, title: t.title, completed: t.completed }
  })

  await prisma.todo.createMany({
    data: todoData,
  })
  console.info(`create todos records complete`)

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
