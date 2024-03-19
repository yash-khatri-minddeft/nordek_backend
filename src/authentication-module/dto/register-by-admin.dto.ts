import { IsEmail, IsString, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterByAdminDto {
  @IsEmail()
  @IsString()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;

  @IsObject()
  @ApiProperty()
  fields: object;
}
