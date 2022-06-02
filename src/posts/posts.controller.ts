import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Delete,
} from '@nestjs/common'
import { PostsService } from './posts.service'
import { Post as PostInterface } from './interfaces/post.interface'
import { CreatePostDto, UpdatePostDto } from './dto'

import { CommentsService } from '../comments/comments.service'
import { Comment } from '../comments/interfaces/comments.interfaces'

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly commentService: CommentsService,
  ) {}

  @Get()
  findAllPost(): Promise<PostInterface[]> {
    return this.postsService.findAll()
  }

  @Get(':id')
  findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PostInterface | unknown> {
    return this.postsService.findById(id)
  }

  @Post()
  @HttpCode(201)
  createPost(@Body() createPostDto: CreatePostDto): Promise<PostInterface> {
    return this.postsService.create({
      userId: createPostDto.userId,
      body: createPostDto.body,
      title: createPostDto.title,
    })
  }

  @Patch(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostInterface> {
    const updatedPost = await this.postsService.updateById({
      id,
      updatePostDto,
    })
    if (!updatedPost) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
    }
    return updatedPost
  }

  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number): Promise<string> {
    const deletedResult = await this.postsService.deleteById(id)
    console.info(`deletedResult`, deletedResult)
    if (!deletedResult) {
      throw new HttpException('Record Not Found', HttpStatus.NOT_FOUND)
    }
    return `deleted`
  }

  @Get(':id/comments')
  findCommentByPostId(@Param('id', ParseIntPipe) id: number): Comment[] {
    const comments = this.commentService.findAll({ postId: id })
    return comments
  }
}
