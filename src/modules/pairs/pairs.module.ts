import { Module } from '@nestjs/common';

import { PairsRepository } from './repositories';
import { PairsService } from './services';
import { PairsController } from './controllers';
import { EthersModules } from '../ethers/ethers.module';

@Module({
  imports: [EthersModules],
  controllers: [PairsController],
  providers: [PairsRepository, PairsService],
})
export class PairsModule {}
