import { Module } from '@nestjs/common';
import { UserListService } from './user-list.service';
import { UserListController } from './user-list.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [UserListService, PrismaService],
  controllers: [UserListController],
})
export class UserListModule {}
