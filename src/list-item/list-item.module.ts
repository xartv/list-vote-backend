import { Module } from '@nestjs/common';
import { ListItemService } from './list-item.service';
import { ListItemController } from './list-item.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ListItemController],
  providers: [ListItemService, PrismaService],
})
export class ListItemModule {}
