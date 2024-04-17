import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UserListDto {
  @IsOptional()
  @IsEmail()
  userEmail?: string;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsString()
  listId: string;
}
