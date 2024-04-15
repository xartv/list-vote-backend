import { Injectable } from '@nestjs/common';
import { UpdateListDto } from './dto/update-list.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ListService {
  constructor(private readonly prisma: PrismaService) {}

  create(title: string, authorId: string) {
    return this.prisma.list.create({
      data: {
        title,
        author: {
          connect: {
            id: authorId,
          },
        },
      },
    });
  }

  findListsCreatedByUser(userId: string) {
    return this.prisma.list.findMany({
      where: {
        authorId: userId,
      },
      orderBy: {
        createdAt: 'asc',
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        title: true,
        items: {
          orderBy: {
            createdAt: 'asc',
          },
        },
        accessUsers: {
          orderBy: {
            user: {
              name: 'asc',
            },
          },
          select: {
            user: {
              select: {
                id: true,
                email: true,
              },
            },
          },
        },
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
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        title: true,
        author: {
          select: {
            email: true,
            name: true,
          },
        },
        items: {
          orderBy: {
            createdAt: 'asc',
          },
        },
        accessUsers: {
          select: {
            user: {
              select: {
                id: true,
                email: true,
              },
            },
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
