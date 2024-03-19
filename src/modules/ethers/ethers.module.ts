import { Module } from '@nestjs/common';

import { FactoryServices } from './services';

@Module({
  providers: [FactoryServices],
  exports: [FactoryServices],
})
export class EthersModules {}
