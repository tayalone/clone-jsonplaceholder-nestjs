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
  findById(@Param('id') id: number): string {
    return `params.id is => ${id} and id type is ${typeof id}`
  }
}
