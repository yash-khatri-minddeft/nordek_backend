import { Module } from '@nestjs/common';

import { TokensRepository } from './repositories';
import { TokensService } from './services';
import { TokensController } from './controllers';

@Module({
  controllers: [TokensController],
  providers: [TokensRepository, TokensService],
})
export class TokensModule {}
