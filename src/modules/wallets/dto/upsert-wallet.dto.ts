import { IsString, IsEthereumAddress } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpsertWallet {
  @IsEthereumAddress()
  @ApiProperty()
  address: string;

  @IsString()
  @ApiProperty()
  providerId: string;
}
