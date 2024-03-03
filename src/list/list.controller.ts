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
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { Auth } from '@decorators/auth.decorator';
import { CurrentUser } from '@decorators/user.decorator';
import { UserListService } from '@user-list/user-list.service';

@Controller('list')
export class ListController {
  constructor(
    private readonly listService: ListService,
    private readonly userListService: UserListService,
  ) {}

  @UsePipes(new ValidationPipe())
  @Auth()
  @Post()
  async create(
    @Body() createListDto: CreateListDto,
    @CurrentUser('id') id: string,
  ) {
    const { title, accessUsersIds, items } = createListDto;

    const createdList = await this.listService.create(title, id);

    this.userListService.createRelation({ listId: createdList.id, userId: id });

    if (accessUsersIds?.length) {
      // add logic for creating relation with user-list
    }

    if (items?.length) {
      // create new module for relation list-item and add logic for creating list item + relation
    }

    return createdList;
  }

  @Auth()
  @Get()
  findAll(@CurrentUser('id') id: string) {
    return this.listService.findAvailableListsForUser(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListDto: UpdateListDto) {
    return this.listService.update(+id, updateListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listService.remove(+id);
  }
}
