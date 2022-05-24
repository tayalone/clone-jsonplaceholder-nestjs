import { Injectable } from '@nestjs/common'
import { Post } from './interfaces/post.interface'
import mockData from '../../mock/data.json'

@Injectable()
export class PostsService {
  private readonly posts: Post[] = mockData.posts

  findAll(): Post[] {
    return this.posts
  }
}
