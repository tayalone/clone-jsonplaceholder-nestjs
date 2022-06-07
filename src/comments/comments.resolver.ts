import {
  Resolver,
  Query,
  // Mutation,
  Args,
  ResolveField,
  Parent,
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
    @Args('postId', { defaultValue: undefined, nullable: true })
    postId?: number,
  ) {
    return this.commentService.findAll({ postId, includes: [] })
  }

  @ResolveField('post', () => Post)
  async comments(@Parent() comment: Comment) {
    const { postId } = comment
    const result = await this.postsService.findById(postId, [])
    return result || null
  }
}
