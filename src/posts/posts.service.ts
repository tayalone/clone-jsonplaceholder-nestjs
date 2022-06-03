import { Injectable } from '@nestjs/common'
import { Post } from './interfaces/post.interface'
import { CreatePostDto, UpdatePostDto } from './dto'
import { PrismaService } from '../services/prisma/prisma.service'
import { CommentsService } from '../comments/comments.service'

const SELECT_ATTRIBUTE = {
  id: true,
  userId: true,
  body: true,
  title: true,
}

const EXISITNG_COND = {
  deletedAt: {
    equals: null,
  },
}

@Injectable()
export class PostsService {
  select: any

  constructor(
    private prisma: PrismaService,
    private readonly commentService: CommentsService,
  ) {
    this.select = { id: true, user: true, title: true, body: true }
  }

  async findAll(): Promise<Post[]> {
    return this.prisma.post.findMany({
      where: {
        ...EXISITNG_COND,
      },
      select: {
        ...SELECT_ATTRIBUTE,
      },
    })
  }

  async findById(id: number): Promise<Post | unknown> {
    const post = await this.prisma.post.findFirst({
      where: { ...EXISITNG_COND, id },
      select: { ...SELECT_ATTRIBUTE },
    })

    if (post) {
      return post
    }
    return {}
  }

  async create({ userId, title, body }: CreatePostDto): Promise<Post> {
    const newPost: Post = await this.prisma.post.create({
      data: {
        userId,
        title,
        body,
      },
      select: { ...SELECT_ATTRIBUTE },
    })

    return newPost
  }

  async updateById({
    id,
    updatePostDto,
  }: {
    id: number
    updatePostDto: UpdatePostDto
  }): Promise<Post | null> {
    // this.posts[postIndex] = newBody
    const resultUpdate = await this.prisma.post.updateMany({
      where: { ...EXISITNG_COND, id },
      data: {
        title: updatePostDto.title,
        body: updatePostDto.body,
      },
    })
    if (resultUpdate.count <= 0) {
      return null
    }

    return this.prisma.post.findUnique({ where: { id } })
  }

  async deleteById(id: number): Promise<boolean> {
    try {
      const countDeletedPosts = await this.prisma.post.deleteMany({
        where: {
          AND: [
            { id },
            {
              ...EXISITNG_COND,
            },
          ],
        },
      })

      if (countDeletedPosts.count <= 0) {
        return false
      }

      await this.commentService.deleteCommentByPostId({ postId: id })
    } catch (err) {
      return false
    }
    return true
  }
}
