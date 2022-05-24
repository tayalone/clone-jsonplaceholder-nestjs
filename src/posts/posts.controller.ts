import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common'
import { PostsService } from './posts.service'
import { Post as PostInterface } from './interfaces/post.interface'
import { CreatePostDto } from './dto'

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAllPost(): PostInterface[] {
    return this.postsService.findAll()
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number): PostInterface | unknown {
    return this.postsService.findById(id)
  }

  @Post()
  @HttpCode(201)
  createPost(@Body() createPostDto: CreatePostDto): PostInterface {
    const newPost: PostInterface = this.postsService.create({
      userId: createPostDto.userId,
      body: createPostDto.body,
      title: createPostDto.title,
    })
    return newPost
  }

  // @Patch(':id')
}
