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
import { RatingMarkService } from './rating-mark.service';
import { CreateRatingMarkDto } from './dto/create-rating-mark.dto';
import { UpdateRatingMarkDto } from './dto/update-rating-mark.dto';
import { Auth } from '@decorators/auth.decorator';
import { CurrentUser } from '@decorators/user.decorator';

@Controller('rating-mark')
export class RatingMarkController {
  constructor(private readonly ratingMarkService: RatingMarkService) {}

  @UsePipes(new ValidationPipe())
  @Auth()
  @Post()
  create(
    @Body() createRatingMarkDto: CreateRatingMarkDto,
    @CurrentUser('id') id: string,
  ) {
    return this.ratingMarkService.create(id, createRatingMarkDto);
  }

  @UsePipes(new ValidationPipe())
  @Auth()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRatingMarkDto: UpdateRatingMarkDto,
  ) {
    return this.ratingMarkService.update(id, updateRatingMarkDto);
  }

  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ratingMarkService.remove(id);
  }
}
