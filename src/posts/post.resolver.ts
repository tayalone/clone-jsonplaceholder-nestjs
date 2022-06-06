import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { Post } from './entities/post.entity'
import { PostsService } from './posts.service'

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => [Post], { name: 'posts' })
  findAll() {
    return this.postsService.findAll({ includes: [] })
  }

  @Query(() => Post, { name: 'post' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    const rawResult = await this.postsService.findById(id, [])
    return rawResult || null
  }
}
