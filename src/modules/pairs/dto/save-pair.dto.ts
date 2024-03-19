import { IsEthereumAddress, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SavePair {
  @IsEthereumAddress()
  @ApiProperty()
  token0: string;

  @IsEthereumAddress()
  @ApiProperty()
  token1: string;

  @IsBoolean()
  @ApiProperty()
  isHide: boolean;
}
