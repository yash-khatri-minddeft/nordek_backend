import { IsEthereumAddress } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LockUnlockDto {
  @IsEthereumAddress()
  @ApiProperty()
  address: string;
}
