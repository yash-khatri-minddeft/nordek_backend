import { Controller, Get, Put, Body, Query, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Roles } from '../../roles/decorators';
import { Role } from '../../roles/enums';
import { SavePair, GetPair, LockUnlockDto } from '../dto';
import { PairsService } from '../services';
import { FactoryServices } from '../../ethers/services';

@Controller('pairs')
@ApiTags('pairs')
export class PairsController {
  constructor(
    private readonly pairsService: PairsService,
    private readonly factoryServices: FactoryServices,
  ) {}

  @Get()
  async getPairsByAddress(@Query() query: GetPair) {
    return this.pairsService.getPair(query.token0, query.token1);
  }

  @Get('/hide-list')
  async getPairs() {
    return this.pairsService.getHideList();
  }

  @Put('/save')
  @Roles(Role.MANAGE_PAIR)
  async savePair(@Body() body: SavePair) {
    return this.pairsService.upsertPair(body);
  }

  @Post('/lock')
  @Roles(Role.MANAGE_PAIR)
  async lock(@Body() body: LockUnlockDto) {
    return this.factoryServices.lock(body.address);
  }

  @Post('/unlock')
  @Roles(Role.MANAGE_PAIR)
  async unlock(@Body() body: LockUnlockDto) {
    return this.factoryServices.unlock(body.address);
  }
}
