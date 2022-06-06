import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { Post } from './entities/post.entity'
import { PostsService } from './posts.service'
import { CommentsService } from '../comments/comments.service'
import { CreatePostInput } from './dto'

@Resolver(() => Post)
export class PostResolver {
  constructor(
    private readonly postsService: PostsService,
    private readonly commentService: CommentsService,
  ) {}

  @Query(() => [Post], { name: 'posts' })
  findAll() {
    return this.postsService.findAll({ includes: [] })
  }

  @Query(() => Post, { name: 'post' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    const rawResult = await this.postsService.findById(id, [])
    return rawResult || null
  }

  @ResolveField('comments', () => [Comment])
  async comments(@Parent() post: Post) {
    const { id } = post
    return this.commentService.findAll({ postId: id, includes: [] })
  }

  @Mutation(() => Post)
  createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    return this.postsService.create({
      userId: createPostInput.userId,
      title: createPostInput.title,
      body: createPostInput.body,
    })
  }
}
