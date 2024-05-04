import { Injectable } from '@nestjs/common';
import { CreateListItemDto } from './dto/create-list-item.dto';
import { UpdateListItemDto } from './dto/update-list-item.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ListItemService {
  constructor(private readonly prisma: PrismaService) {}

  create(createListItemDto: CreateListItemDto, authorId: string) {
    const { listId, title } = createListItemDto;

    return this.prisma.listItem.create({
      data: {
        title: title ?? '',
        rating: 0,
        author: {
          connect: {
            id: authorId,
          },
        },
        list: {
          connect: {
            id: listId,
          },
        },
      },
    });
  }

  update(listItemId: string, updateListItemDto: UpdateListItemDto) {
    return this.prisma.listItem.update({
      where: {
        id: listItemId,
      },
      data: updateListItemDto,
    });
  }

  findItemsCreatedByUser(authorId: string) {
    return this.prisma.listItem.findMany({
      where: {
        authorId,
      },
    });
  }

  remove(listItemId: string) {
    return this.prisma.listItem.delete({
      where: {
        id: listItemId,
      },
    });
  }
}
