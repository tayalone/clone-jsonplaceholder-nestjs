import {
  Resolver,
  Query,
  // Mutation,
  Args,
  ResolveField,
  Parent,
  Int,
  Mutation,
} from '@nestjs/graphql'
import { Post } from '@posts/entities/post.entity'
import { PostsService } from '@posts/posts.service'
import { HttpException, HttpStatus } from '@nestjs/common'
import { CommentsService } from './comments.service'
import { Comment } from './entities/comment.entity'
import { CreateCommentInput } from './dto/graphql/create-comment.input'
import { UpdateCommentInput } from './dto/graphql/update-comment.input'

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
    return this.commentService.findAllComment({
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

  @Mutation(() => Comment)
  createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
  ) {
    return this.commentService.create(createCommentInput)
  }

  @Mutation(() => Comment)
  updateComment(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateCommentInput') updateCommentInput: UpdateCommentInput,
  ) {
    return this.commentService.update({
      where: { id },
      data: { ...updateCommentInput },
    })
  }

  @Mutation(() => String)
  async deleteComment(@Args('id', { type: () => Int }) id: number) {
    const deletedResult = await this.commentService.remove({ id })
    if (!deletedResult) {
      throw new HttpException('Record Not Found', HttpStatus.NOT_FOUND)
    }
    return `deleted`
  }
}
