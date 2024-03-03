import { IsString } from 'class-validator';

export class UserListDto {
  @IsString()
  userId: string;

  @IsString()
  listId: string;
}
