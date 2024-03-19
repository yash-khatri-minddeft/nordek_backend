import { Module } from '@nestjs/common';

import { WalletsServices } from './services';
import { WalletsController } from './controllers';
import { WalletsRepository } from './repositories';

@Module({
  controllers: [WalletsController],
  providers: [WalletsServices, WalletsRepository],
})
export class WalletsModule {}
