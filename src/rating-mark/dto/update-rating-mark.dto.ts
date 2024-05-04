import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateRatingMarkDto } from './create-rating-mark.dto';

export class UpdateRatingMarkDto extends PartialType(
  OmitType(CreateRatingMarkDto, ['listItemId']),
) {}
