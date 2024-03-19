import { Module } from '@nestjs/common';

import { DbModule } from 'src/infrastructure/database';
import { UserEntity } from 'src/entities';
import { UserRepository } from './repositories';
import { UsersControllers } from './controllers';
import { UsersServices } from './services';
import { UserSeedService } from './seed';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [DbModule.forFeature([UserEntity]), RolesModule],
  providers: [UserRepository, UserSeedService, UsersServices],
  controllers: [UsersControllers],
  exports: [UserRepository, UserSeedService],
})
export class UsersModule {}
