import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserListDto } from './dto/user-list.dto';

@Injectable()
export class UserListService {
  constructor(private readonly prisma: PrismaService) {}

  async createRelation(dto: UserListDto) {
    await this.prisma.userList.create({
      data: {
        listId: dto.listId,
        userId: dto.userId,
      },
    });

    return true;
  }

  async deleteRelation(dto: UserListDto) {
    await this.prisma.userList.delete({
      where: {
        userId_listId: {
          listId: dto.listId,
          userId: dto.userId,
        },
      },
    });

    return true;
  }
}
