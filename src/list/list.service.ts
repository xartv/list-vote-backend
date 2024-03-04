import { Injectable } from '@nestjs/common';
import { UpdateListDto } from './dto/update-list.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ListService {
  constructor(private readonly prisma: PrismaService) {}

  create(title: string, authorId: string) {
    const list = {
      title,
      authorId,
    };

    return this.prisma.list.create({
      data: list,
    });
  }

  findListsCreatedByUser(userId: string) {
    return this.prisma.list.findMany({
      where: {
        authorId: userId,
      },
    });
  }

  findAvailableListsForUser(userId: string) {
    return this.prisma.list.findMany({
      where: {
        accessUsers: {
          some: {
            userId,
          },
        },
      },
    });
  }

  update(listId: string, dto: UpdateListDto) {
    return this.prisma.list.update({
      where: {
        id: listId,
      },
      data: dto,
    });
  }

  delete(listId: string) {
    return this.prisma.list.delete({
      where: {
        id: listId,
      },
    });
  }
}
