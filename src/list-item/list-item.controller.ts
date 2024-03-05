import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ListItemService } from './list-item.service';
import { CreateListItemDto } from './dto/create-list-item.dto';
import { UpdateListItemDto } from './dto/update-list-item.dto';
import { Auth } from '@decorators/auth.decorator';
import { CurrentUser } from '@decorators/user.decorator';

@Controller('list-item')
export class ListItemController {
  constructor(private readonly listItemService: ListItemService) {}

  @UsePipes(new ValidationPipe())
  @Auth()
  @Post()
  create(
    @Body() createListItemDto: CreateListItemDto,
    @CurrentUser('id') id: string,
  ) {
    return this.listItemService.create(createListItemDto, id);
  }

  @Auth()
  @Get()
  findAllCreated(@CurrentUser('id') id: string) {
    return this.listItemService.findItemsCreatedByUser(id);
  }

  @UsePipes(new ValidationPipe())
  @Auth()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateListItemDto: UpdateListItemDto,
  ) {
    return this.listItemService.update(id, updateListItemDto);
  }

  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listItemService.remove(id);
  }
}
