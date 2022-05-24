import { Injectable } from '@nestjs/common'
import { Post } from './interfaces/post.interface'
import { POSTS } from '../../mock/posts'
import { CreatePostDto, UpdatePostDto } from './dto'

@Injectable()
export class PostsService {
  private readonly posts: Post[] = POSTS

  findAll(): Post[] {
    return this.posts
  }

  findById(id: number): Post | unknown {
    const postIndex: number = this.posts.findIndex((p) => p.id === id)

    if (postIndex === -1) {
      return {}
    }

    return this.posts[postIndex]
  }

  create({ userId, title, body }: CreatePostDto): Post {
    const newId: number = this.posts.length
    const newPost: Post = { id: newId, userId, title, body }
    this.posts.push(newPost)
    return newPost
  }

  updateById({
    id,
    updatePostDto,
  }: {
    id: number
    updatePostDto: UpdatePostDto
  }): Post | null {
    const postIndex: number = this.posts.findIndex((p) => p.id === id)

    if (postIndex === -1) {
      return null
    }
    const newBody = {
      ...this.posts[postIndex],
      title: updatePostDto.title,
      body: updatePostDto.body,
    }

    this.posts[postIndex] = newBody

    return newBody
  }
}
