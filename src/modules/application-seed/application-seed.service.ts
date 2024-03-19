import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { RoleSeedService } from '../roles/seed';
import { UserSeedService } from '../users/seed';
import { ConfigNames } from 'src/common/enums';
import { IAppConfig } from 'src/configs';

@Injectable()
export class ApplicationSeedService {
  private readonly config: IAppConfig;

  constructor(
    private readonly roleSeedService: RoleSeedService,
    private readonly userSeedService: UserSeedService,
    configService: ConfigService,
  ) {
    this.config = configService.getOrThrow(ConfigNames.APP);
  }

  async plant() {
    if (!this.config.isProduction) {
      await this.roleSeedService.plantDev();
      await this.userSeedService.plantDev();
      return;
    }
    await this.roleSeedService.plant();
  }
}
