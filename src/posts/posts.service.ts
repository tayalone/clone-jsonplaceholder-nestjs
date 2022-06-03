import { Injectable } from '@nestjs/common'
import { Post } from './interfaces/post.interface'
import { CreatePostDto, UpdatePostDto } from './dto'
import { PrismaService } from '../services/prisma/prisma.service'
import { CommentsService } from '../comments/comments.service'

@Injectable()
export class PostsService {
  constructor(
    private prisma: PrismaService,
    private readonly commentService: CommentsService,
  ) {}

  async findAll(): Promise<Post[]> {
    // return this.posts
    return this.prisma.post.findMany({})
  }

  async findById(id: number): Promise<Post | unknown> {
    const post = await this.prisma.post.findUnique({ where: { id } })

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
