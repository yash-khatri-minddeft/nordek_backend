import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SetFee } from '../dto';
import { FactoryServices } from '../../ethers/services';
import { Roles } from '../../roles/decorators';
import { Role } from '../../roles/enums';

@Controller('/fee')
@ApiTags('fee')
export class FeeController {
  constructor(private readonly factoryServices: FactoryServices) {}

  @Roles(Role.MANAGE_FEE)
  @Post('/swap')
  public async handleSwapFee(@Body() body: SetFee): Promise<void> {
    await this.factoryServices.setSwapFeeBP(body.value);
  }
}
