import {
  IsEthereumAddress,
  IsString,
  IsNumber,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SaveToken {
  @IsEthereumAddress()
  @ApiProperty()
  address: string;

  @IsString()
  @ApiProperty()
  symbol: string;

  @IsString()
  @ApiProperty()
  name: string;

  @IsNumber()
  @ApiProperty()
  decimal: number;

  @IsBoolean()
  @ApiProperty()
  isActive: boolean;
}
