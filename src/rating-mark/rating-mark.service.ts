import { Injectable } from '@nestjs/common';
import { CreateRatingMarkDto } from './dto/create-rating-mark.dto';
import { PrismaService } from 'src/prisma.service';
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

      const listItem = await prisma.listItem.findUnique({
        where: {
          id: listItemId,
        },
        include: {
          ratingMarks: true,
        },
      });

      const sum = listItem.ratingMarks.reduce(
        (acc, rating) => acc + rating.value,
        0,
      );
      const count = listItem.ratingMarks.length;
      const average = count === 0 ? 0 : sum / count;
      const roundedAverage = Math.round(average * 10) / 10;

      await prisma.listItem.update({
        where: { id: listItemId },
        data: { rating: roundedAverage },
      });

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

      const listItem = await prisma.listItem.findUnique({
        where: {
          id: ratingMark.listItemId,
        },
        include: {
          ratingMarks: true,
        },
      });

      const sum = listItem.ratingMarks.reduce(
        (acc, rating) => acc + rating.value,
        0,
      );
      const count = listItem.ratingMarks.length;
      const average = count === 0 ? 0 : sum / count;
      const roundedAverage = Math.round(average * 10) / 10;

      await prisma.listItem.update({
        where: { id: ratingMark.listItemId },
        data: { rating: roundedAverage },
      });

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

      const listItem = await prisma.listItem.findUnique({
        where: {
          id: ratingMark.listItemId,
        },
        include: {
          ratingMarks: true,
        },
      });

      const sum = listItem.ratingMarks.reduce(
        (acc, rating) => acc + rating.value,
        0,
      );
      const count = listItem.ratingMarks.length;
      const average = count === 0 ? 0 : sum / count;
      const roundedAverage = Math.round(average * 10) / 10;

      await prisma.listItem.update({
        where: { id: ratingMark.listItemId },
        data: { rating: roundedAverage },
      });

      return ratingMark;
    });
  }
}
