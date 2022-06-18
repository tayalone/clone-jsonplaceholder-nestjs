import { Module } from '@nestjs/common';
import { MaxotyService } from './maxoty.service';
import { MaxotyController } from './maxoty.controller';

@Module({
  controllers: [MaxotyController],
  providers: [MaxotyService]
})
export class MaxotyModule {}
