import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { TmpService } from './tmp.service'
import { Tmp } from './entities/tmp.entity'
import { CreateTmpInput } from './dto/create-tmp.input'
import { UpdateTmpInput } from './dto/update-tmp.input'

@Resolver(() => Tmp)
export class TmpResolver {
  constructor(private readonly tmpService: TmpService) {}

  @Mutation(() => Tmp)
  createTmp(@Args('createTmpInput') createTmpInput: CreateTmpInput) {
    return this.tmpService.create(createTmpInput)
  }

  @Query(() => [Tmp], { name: 'tmp' })
  findAll() {
    return this.tmpService.findAll()
  }

  @Query(() => Tmp, { name: 'tmp' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.tmpService.findOne(id)
  }

  @Mutation(() => Tmp)
  updateTmp(@Args('updateTmpInput') updateTmpInput: UpdateTmpInput) {
    return this.tmpService.update(updateTmpInput.id, updateTmpInput)
  }

  @Mutation(() => Tmp)
  removeTmp(@Args('id', { type: () => Int }) id: number) {
    return this.tmpService.remove(id)
  }
}
