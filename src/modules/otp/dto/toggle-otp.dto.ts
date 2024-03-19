import { IsUUID, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DisableOtp {
  @IsString()
  @ApiProperty()
  code: string;
}

export class DisableOtpByAdmin {
  @IsUUID()
  @ApiProperty()
  userId: string;
}
