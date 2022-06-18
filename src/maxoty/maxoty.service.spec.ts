import { Test, TestingModule } from '@nestjs/testing';
import { MaxotyService } from './maxoty.service';

describe('MaxotyService', () => {
  let service: MaxotyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaxotyService],
    }).compile();

    service = module.get<MaxotyService>(MaxotyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
