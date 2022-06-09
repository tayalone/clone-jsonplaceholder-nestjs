import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { HttpException, HttpStatus } from '@nestjs/common'
import { CommentsService } from '@comments/comments.service'
import { Comment } from '@comments/entities/comment.entity'
import { User } from '@users/entities/user.entity'
import { UserService } from '@users/users.service'
import { Post } from './entities/post.entity'
import { PostsService } from './posts.service'

import { CreatePostInput, UpdatePostInput } from './dto'

@Resolver(() => Post)
export class PostResolver {
  constructor(
    private readonly postsService: PostsService,
    private readonly commentService: CommentsService,
    private readonly userService: UserService,
  ) {}

  @Query(() => [Post], { name: 'posts' })
  findAll(
    @Args('where', { defaultValue: undefined, nullable: true }) where: string,
  ) {
    return this.postsService.findAllPosts({
      where: where ? JSON.parse(where) : undefined,
    })
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

  @Mutation(() => Post)
  async updatePost(
    @Args('id', { type: () => Int }) id: number,
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
  ) {
    const updatedPost = await this.postsService.updateById({
      id,
      updatePostDto: updatePostInput,
    })
    if (!updatedPost) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
    }
    return updatedPost
  }

  @Mutation(() => String)
  async deletePost(@Args('id', { type: () => Int }) id: number) {
    const deletedResult = await this.postsService.deleteById(id)
    if (!deletedResult) {
      throw new HttpException('Record Not Found', HttpStatus.NOT_FOUND)
    }
    return `deleted`
  }

  @ResolveField('owner', () => User)
  async owner(@Parent() post: Post) {
    const { userId } = post
    return this.userService.findOne({ id: userId })
  }
}
