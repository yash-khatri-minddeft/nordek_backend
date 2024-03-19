import { Controller, Get, Put, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Roles } from '../../roles/decorators';
import { Role } from '../../roles/enums';
import { SaveToken } from '../dto';
import { TokensService } from '../services';
import { TokenEntity } from 'src/entities';

@Controller('tokens')
@ApiTags('tokens')
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @Get('/inactive')
  public async getInactiveToken(): Promise<TokenEntity[]> {
    return this.tokensService.getInactiveTokens();
  }

  @Get('/:address')
  public async getTokenByAddress(
    @Param('address') address: string,
  ): Promise<TokenEntity> {
    return this.tokensService.getTokenByAddress(address);
  }

  @Put('/save')
  @Roles(Role.MANAGE_SWAP)
  public async saveToken(@Body() body: SaveToken): Promise<TokenEntity> {
    return this.tokensService.upsertToken(body);
  }
}
