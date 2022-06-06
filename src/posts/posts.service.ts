import { Injectable } from '@nestjs/common'
import { Post } from './interfaces/post.interface'
import { Include } from './interfaces/include.interface'
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
  constructor(
    private prisma: PrismaService,
    private readonly commentService: CommentsService,
  ) {}

  private generateInclude({ includes = [] }: { includes: string[] }): Include {
    if (includes.length <= 0) {
      return undefined
    }
    const EXISTING_INCLUDE = ['comments']
    const include = includes.reduce((acc, data) => {
      const match = EXISTING_INCLUDE.includes(data)
      if (!match) {
        return acc
      }
      return { ...acc, [data]: true }
    }, {})
    return include
  }

  async findAll({ includes = [] }): Promise<Post[]> {
    const include: Include = this.generateInclude({ includes })
    return this.prisma.post.findMany({
      where: {
        ...EXISITNG_COND,
      },
      include,
    })
  }

  async findById(id: number, includes: string[] = []): Promise<Post | unknown> {
    const include: Include = this.generateInclude({ includes })
    const post = await this.prisma.post.findUnique({ where: { id }, include })

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

    return this.prisma.post.update({
      where: { id },
      data: {
        title: updatePostDto.title,
        body: updatePostDto.body,
      },
    })
  }

  async deleteById(id: number): Promise<boolean> {
    try {
      const countDeletedPosts = await this.prisma.post.deleteMany({
        where: {
          AND: [
            { id },
            {
              deletedAt: {
                equals: null,
              },
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
