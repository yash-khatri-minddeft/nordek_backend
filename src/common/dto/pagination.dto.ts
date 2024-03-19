import { IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty()
  limit: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty()
  skip: number;
}
