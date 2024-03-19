import { Module, OnApplicationBootstrap } from '@nestjs/common';

import { ApplicationSeedService } from './application-seed.service';
import { RolesModule } from '../roles/roles.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [RolesModule, UsersModule],
  providers: [ApplicationSeedService],
})
export class ApplicationSeedModule implements OnApplicationBootstrap {
  constructor(private readonly seedService: ApplicationSeedService) {}

  async onApplicationBootstrap() {
    await this.seedService.plant();
  }
}
