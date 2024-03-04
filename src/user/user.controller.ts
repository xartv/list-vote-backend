import {
  Controller,
  Get,
  Body,
  UsePipes,
  ValidationPipe,
  HttpCode,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from '@decorators/auth.decorator';
import { CurrentUser } from '@decorators/user.decorator';
import { UserDto } from './dto/user.dto';

@Controller('user/profile')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Auth()
  async getProfile(@CurrentUser('id') id: string) {
    return this.userService.getProfile(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Patch()
  @Auth()
  async updateProfile(@CurrentUser('id') id: string, @Body() dto: UserDto) {
    return this.userService.update(id, dto);
  }
}
