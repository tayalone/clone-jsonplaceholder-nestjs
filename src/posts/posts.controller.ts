import {
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common'
import { PostsService } from './posts.service'
import { Post as PostInterface } from './interfaces/post.interface'

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
  createPost(): string {
    return 'function must return new post'
  }
}
