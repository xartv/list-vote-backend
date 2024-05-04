import { Injectable } from '@nestjs/common';
import { CreateRatingMarkDto } from './dto/create-rating-mark.dto';
import { UpdateRatingMarkDto } from './dto/update-rating-mark.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RatingMarkService {
  constructor(private readonly prisma: PrismaService) {}

  create(authorId: string, createRatingMarkDto: CreateRatingMarkDto) {
    const { listItemId, value } = createRatingMarkDto;

    return this.prisma.ratingMark.create({
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
  }

  update(raitingMarkId: string, updateRatingMarkDto: UpdateRatingMarkDto) {
    return this.prisma.ratingMark.update({
      where: {
        id: raitingMarkId,
      },
      data: updateRatingMarkDto,
    });
  }
}
