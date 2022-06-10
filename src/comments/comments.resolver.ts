import {
  Resolver,
  Query,
  // Mutation,
  Args,
  ResolveField,
  Parent,
  Int,
} from '@nestjs/graphql'
import { Post } from '@posts/entities/post.entity'
import { PostsService } from '@posts/posts.service'
import { CommentsService } from './comments.service'
import { Comment } from './entities/comment.entity'

@Resolver(() => Comment)
export class CommentResolver {
  constructor(
    private readonly postsService: PostsService,
    private readonly commentService: CommentsService,
  ) {}

  @Query(() => [Comment], { name: 'comments' })
  findAll(
    @Args('skip', { type: () => Int, defaultValue: undefined, nullable: true })
    skip: number,
    @Args('take', { type: () => Int, defaultValue: undefined, nullable: true })
    take: number,
    @Args('where', { defaultValue: undefined, nullable: true })
    where: string,
    @Args('orderBy', { defaultValue: undefined, nullable: true })
    orderBy: string,
  ) {
    return this.commentService.findAllPost({
      skip,
      take,
      where: where ? JSON.parse(where) : undefined,
      orderBy: where ? JSON.parse(orderBy) : undefined,
    })
  }

  @Query(() => Comment, { name: 'comment' })
  find(@Args('id', { type: () => Int }) id: number) {
    return this.commentService.findOne({ id: +id })
  }

  @ResolveField('post', () => Post)
  async comments(@Parent() comment: Comment) {
    const { postId } = comment
    const result = await this.postsService.findById(postId, [])
    return result || null
  }
}
