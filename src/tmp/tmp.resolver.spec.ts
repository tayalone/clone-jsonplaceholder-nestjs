import { Test, TestingModule } from '@nestjs/testing'
import { TmpResolver } from './tmp.resolver'
import { TmpService } from './tmp.service'

describe('TmpResolver', () => {
  let resolver: TmpResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TmpResolver, TmpService],
    }).compile()

    resolver = module.get<TmpResolver>(TmpResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
