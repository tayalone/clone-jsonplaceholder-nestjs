import { Module } from '@nestjs/common'
import { TmpService } from './tmp.service'
import { TmpResolver } from './tmp.resolver'

@Module({
  providers: [TmpResolver, TmpService],
})
export class TmpModule {}
