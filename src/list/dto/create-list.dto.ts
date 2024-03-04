import { Rating } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

//class ItemDto {
//  @IsString()
//  title: string;

//  @IsOptional()
//  @IsEnum(Rating)
//  rating?: Rating;
//}

export class CreateListDto {
  @IsString()
  title: string;

  //@IsOptional()
  //@IsArray()
  //@IsString({ each: true })
  //@Type(() => String)
  //accessUsersIds?: string[];

  //@IsOptional()
  //@IsArray()
  //@ValidateNested({ each: true })
  //@Type(() => ItemDto)
  //items?: ItemDto[];
}
