import { IsOptional, IsString } from 'class-validator';

export class CreateListDto {
  @IsOptional()
  @IsString()
  title?: string;
}
