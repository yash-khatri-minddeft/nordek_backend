import { Controller, Put, Body, Get, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Roles } from '../../roles/decorators';
import { Role } from '../../roles/enums';
import { WalletsServices } from '../services';
import { UpsertWallet, ToggleWallet } from '../dto';
import { WalletEntity } from 'src/entities';

@Controller('wallets')
@ApiTags('wallets')
export class WalletsController {
  constructor(private readonly walletsServices: WalletsServices) {}

  @Put()
  async upserWaller(@Body() body: UpsertWallet): Promise<void> {
    await this.walletsServices.upserWallets(body.address, body.providerId);
  }

  @Get()
  @Roles(Role.MANAGE_USERS_ACCOUNT)
  async getWallets(): Promise<WalletEntity[]> {
    return this.walletsServices.getWallets();
  }

  @Get('/:address/address')
  async getWalletByAddres(
    @Param('address') address: string,
  ): Promise<WalletEntity> {
    return this.walletsServices.getByAddress(address);
  }

  @Get('/:id')
  @Roles(Role.MANAGE_USERS_ACCOUNT)
  async getWallet(@Param('id') id: string): Promise<WalletEntity> {
    return this.walletsServices.getById(id);
  }

  @Patch('/toggle-wallet')
  @Roles(Role.MANAGE_USERS_ACCOUNT)
  async toggleWallet(@Body() body: ToggleWallet): Promise<void> {
    await this.walletsServices.toggleWallet(body.id, body.value);
  }
}
