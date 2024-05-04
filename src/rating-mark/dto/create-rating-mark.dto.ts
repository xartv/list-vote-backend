import { IsInt, Max, Min, IsString } from 'class-validator';

export class CreateRatingMarkDto {
  @IsInt()
  @Max(5)
  @Min(1)
  value: number;

  @IsString()
  listItemId: string;
}
