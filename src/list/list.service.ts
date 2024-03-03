import { Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ListService {
  constructor(private readonly prisma: PrismaService) {}

  async create(title: string, authorId: string) {
    const list = {
      title,
      authorId,
    };

    return this.prisma.list.create({
      data: list,
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

  findOne(id: number) {
    return `This action returns a #${id} list`;
  }

  update(id: number, updateListDto: UpdateListDto) {
    return `This action updates a #${id} list`;
  }

  remove(id: number) {
    return `This action removes a #${id} list`;
  }
}
