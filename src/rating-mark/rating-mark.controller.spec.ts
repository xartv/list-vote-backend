import { Test, TestingModule } from '@nestjs/testing';
import { RatingMarkController } from './rating-mark.controller';
import { RatingMarkService } from './rating-mark.service';

describe('RatingMarkController', () => {
  let controller: RatingMarkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RatingMarkController],
      providers: [RatingMarkService],
    }).compile();

    controller = module.get<RatingMarkController>(RatingMarkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
