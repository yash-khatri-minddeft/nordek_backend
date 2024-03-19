import { Module } from '@nestjs/common';

import { RoleSeedService } from './seed';
import { RolesController } from './controllers';
import { RolesRepository } from './repositories';
import { RolesService } from './services';

@Module({
  controllers: [RolesController],
  providers: [RoleSeedService, RolesRepository, RolesService],
  exports: [RoleSeedService, RolesService],
})
export class RolesModule {}
