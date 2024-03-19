import { IsBoolean, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ToggleWallet {
  @IsUUID()
  @ApiProperty()
  id: string;

  @IsBoolean()
  @ApiProperty()
  value: boolean;
}
