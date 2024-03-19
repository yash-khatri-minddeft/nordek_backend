import { Module, Global } from '@nestjs/common';

import { RedisService } from './redis.service';
import { RedisJSONService } from './json.service';
import { RedisConfigurableModule } from './redis.module-definition';
import { UtilsService } from './utils.service';

@Global()
@Module({
  providers: [RedisService, RedisJSONService, UtilsService],
  exports: [RedisService, RedisJSONService],
})
export class RedisModule extends RedisConfigurableModule {}
