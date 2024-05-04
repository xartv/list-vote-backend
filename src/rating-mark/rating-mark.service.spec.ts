import { Test, TestingModule } from '@nestjs/testing';
import { RatingMarkService } from './rating-mark.service';

describe('RatingMarkService', () => {
  let service: RatingMarkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RatingMarkService],
    }).compile();

    service = module.get<RatingMarkService>(RatingMarkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
