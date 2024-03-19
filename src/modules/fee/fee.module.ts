import { Module } from '@nestjs/common';

import { EthersModules } from '../ethers/ethers.module';
import { FeeController } from './controllers';

@Module({ imports: [EthersModules], controllers: [FeeController] })
export class FeeModule {}
