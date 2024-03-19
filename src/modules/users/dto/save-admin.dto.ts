import { IsUUID, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SaveAdmin {
  @IsUUID('4')
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  name: string;

  @IsUUID('4', { each: true })
  @ApiProperty()
  roles: string[];
}
