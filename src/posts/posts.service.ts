import { Injectable } from '@nestjs/common'
import { Post } from './interfaces/post.interface'
import { POSTS } from '../../mock/posts'

@Injectable()
export class PostsService {
  private readonly posts: Post[] = POSTS

  findAll(): Post[] {
    return this.posts
  }

  findById(): Post | null {
    return null
  }
}
