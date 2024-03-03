import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { UserListService } from '@user-list/user-list.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ListController],
  providers: [ListService, PrismaService, UserListService],
})
export class ListModule {}
