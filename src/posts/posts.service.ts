import { Injectable } from '@nestjs/common'
import { Post } from './interfaces/post.interface'
import { POSTS } from '../../mock/posts'
import { CreatePostDto } from './dto'

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

  create({ userId, title, body }: CreatePostDto): void {}
}
