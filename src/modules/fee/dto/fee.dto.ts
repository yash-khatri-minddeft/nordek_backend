import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SetFee {
  @IsString()
  @ApiProperty()
  value: string;
}
