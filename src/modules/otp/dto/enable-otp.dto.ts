import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EnableOtp {
  @IsString()
  @ApiProperty()
  token: string;

  @IsString()
  @ApiProperty()
  secret: string;
}
