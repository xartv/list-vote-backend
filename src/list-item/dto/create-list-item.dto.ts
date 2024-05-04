import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateListItemDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsInt()
  @Max(5)
  @Min(1)
  rating?: number;

  @IsString()
  listId: string;
}
