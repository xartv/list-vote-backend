import { Injectable } from '@nestjs/common';
import { CreateRatingMarkDto } from './dto/create-rating-mark.dto';
import { PrismaService } from 'src/prisma.service';
import { recalculateRating } from './utils/recalculate-rating.util';
import { UpdateRatingMarkDto } from './dto/update-rating-mark.dto';

@Injectable()
export class RatingMarkService {
  constructor(private readonly prisma: PrismaService) {}

  create(authorId: string, createRatingMarkDto: CreateRatingMarkDto) {
    const { listItemId, value } = createRatingMarkDto;

    return this.prisma.$transaction(async (prisma) => {
      const ratingMark = await prisma.ratingMark.create({
        data: {
          value,
          listItem: {
            connect: {
              id: listItemId,
            },
          },
          author: {
            connect: {
              id: authorId,
            },
          },
        },
      });

      recalculateRating(prisma, ratingMark.listItemId);

      return ratingMark;
    });
  }

  update(raitingMarkId: string, updateRatingMarkDto: UpdateRatingMarkDto) {
    return this.prisma.$transaction(async (prisma) => {
      const ratingMark = await prisma.ratingMark.update({
        where: {
          id: raitingMarkId,
        },
        data: updateRatingMarkDto,
      });

      recalculateRating(prisma, ratingMark.listItemId);

      return ratingMark;
    });
  }

  remove(raitingMarkId: string) {
    return this.prisma.$transaction(async (prisma) => {
      const ratingMark = await prisma.ratingMark.delete({
        where: {
          id: raitingMarkId,
        },
      });

      recalculateRating(prisma, ratingMark.listItemId);

      return ratingMark;
    });
  }
}
