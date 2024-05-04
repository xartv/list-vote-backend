import { IsOptional, IsString } from 'class-validator';

export class CreateListItemDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsString()
  listId: string;
}
