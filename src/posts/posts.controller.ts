import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'
import { PostsService } from './posts.service'
import { Post } from './interfaces/post.interface'

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAllPost(): Post[] {
    return this.postsService.findAll()
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number): Post | unknown {
    return this.postsService.findById(id)
  }
}
