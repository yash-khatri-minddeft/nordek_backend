import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EditMe {
  @IsString()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  name: string;
}
