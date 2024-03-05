import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateListItemDto } from './create-list-item.dto';

export class UpdateListItemDto extends PartialType(
  OmitType(CreateListItemDto, ['listId']),
) {}
