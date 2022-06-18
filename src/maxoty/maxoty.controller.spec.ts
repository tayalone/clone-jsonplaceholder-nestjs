import { Test, TestingModule } from '@nestjs/testing';
import { MaxotyController } from './maxoty.controller';
import { MaxotyService } from './maxoty.service';

describe('MaxotyController', () => {
  let controller: MaxotyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaxotyController],
      providers: [MaxotyService],
    }).compile();

    controller = module.get<MaxotyController>(MaxotyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
