import { IsEthereumAddress } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetPair {
  @IsEthereumAddress()
  @ApiProperty()
  token0: string;

  @IsEthereumAddress()
  @ApiProperty()
  token1: string;
}
