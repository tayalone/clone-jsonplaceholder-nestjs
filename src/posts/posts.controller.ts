import { Controller, Get, Param } from '@nestjs/common'
import { PostsService } from './posts.service'
import { Post } from './interfaces/post.interface'

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAllPost(): Post[] {
    // return this.postsService.findAll()
    return this.postsService.findAll()
  }

  @Get(':id')
  findById(@Param() params): string {
    return `params.id is => ${params.id}`
  }
}
