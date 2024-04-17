import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserListDto } from './dto/user-list.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserListService {
  constructor(private readonly prisma: PrismaService) {}

  async createRelation(dto: UserListDto) {
    let user: User;

    if (!dto.userId) {
      user = await this.prisma.user.findUnique({
        where: {
          email: dto.userEmail,
        },
      });

      if (!user) throw new NotFoundException('User not found');
    }

    await this.prisma.userList.create({
      data: {
        listId: dto.listId,
        userId: dto.userId ?? user.id,
      },
    });

    return true;
  }

  async deleteRelation(dto: UserListDto) {
    let user: User;

    if (!dto.userId) {
      user = await this.prisma.user.findUnique({
        where: {
          email: dto.userEmail,
        },
      });

      if (!user) throw new NotFoundException('User not found');
    }

    await this.prisma.userList.delete({
      where: {
        userId_listId: {
          listId: dto.listId,
          userId: dto.userId ?? user.id,
        },
      },
    });

    return true;
  }
}
