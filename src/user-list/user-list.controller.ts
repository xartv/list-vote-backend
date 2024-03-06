import {
  Body,
  Controller,
  Delete,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserListService } from './user-list.service';
import { UserListDto } from './dto/user-list.dto';
import { Auth } from '@decorators/auth.decorator';

@Controller('user-list')
export class UserListController {
  constructor(private readonly userListService: UserListService) {}

  @UsePipes(new ValidationPipe())
  @Auth()
  @Post()
  createRelation(@Body() dto: UserListDto) {
    return this.userListService.createRelation(dto);
  }

  @UsePipes(new ValidationPipe())
  @Auth()
  @Delete()
  deleteRelation(@Body() dto: UserListDto) {
    return this.userListService.deleteRelation(dto);
  }
}
