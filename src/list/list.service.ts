import { Injectable } from '@nestjs/common';
import { UpdateListDto } from './dto/update-list.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ListService {
  constructor(private readonly prisma: PrismaService) {}

  create(title: string, authorId: string) {
    return this.prisma.list.create({
      data: {
        title: title ?? '',
        author: {
          connect: {
            id: authorId,
          },
        },
      },
    });
  }

  findListById(listId: string) {
    return this.prisma.list.findUnique({
      where: {
        id: listId,
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
                name: true,
              },
            },
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
        createdAt: 'desc',
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
                name: true,
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
      orderBy: {
        createdAt: 'desc',
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
                name: true,
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
