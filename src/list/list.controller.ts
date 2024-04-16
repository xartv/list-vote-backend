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
    const { title } = createListDto;

    const createdList = await this.listService.create(title, id);

    await this.userListService.createRelation({
      listId: createdList.id,
      userId: id,
    });

    return createdList;
  }

  @Auth()
  @Get(':listId')
  findById(@Param('listId') listId: string) {
    return this.listService.findListById(listId);
  }

  @Auth()
  @Get('available')
  findAllAvailable(@CurrentUser('id') id: string) {
    return this.listService.findAvailableListsForUser(id);
  }

  @Auth()
  @Get('created')
  findAllCreated(@CurrentUser('id') id: string) {
    return this.listService.findListsCreatedByUser(id);
  }

  @UsePipes(new ValidationPipe())
  @Auth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListDto: UpdateListDto) {
    return this.listService.update(id, updateListDto);
  }

  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listService.delete(id);
  }
}
