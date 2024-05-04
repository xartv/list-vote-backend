import { Module } from '@nestjs/common';
import { RatingMarkService } from './rating-mark.service';
import { RatingMarkController } from './rating-mark.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [RatingMarkController],
  providers: [RatingMarkService, PrismaService],
})
export class RatingMarkModule {}
