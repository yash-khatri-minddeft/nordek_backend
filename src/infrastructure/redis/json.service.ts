import { Injectable, Inject } from '@nestjs/common';
import { Redis, RedisKey } from 'ioredis';

import { REDIS_TOKEN, RedisModuleOptions } from './redis.module-definition';
import { UtilsService } from './utils.service';

@Injectable()
export class RedisJSONService {
  private readonly redisClient: Redis;

  constructor(
    @Inject(REDIS_TOKEN) redisOption: RedisModuleOptions,
    private readonly utilsService: UtilsService,
  ) {
    this.redisClient = new Redis(redisOption);
  }

  async get({ key, path = '.' }: { key: RedisKey; path?: string }) {
    const result = (await this.redisClient.call(
      'JSON.GET',
      key,
      path,
    )) as string;
    return this.utilsService.deserialize(result);
  }

  async set<T = any>({
    key,
    value,
    path = '.',
  }: {
    key: RedisKey;
    value: T;
    path?: string;
  }) {
    const isRoot = path === '.';

    if (!isRoot) {
      const isExist = await this.redisClient.call(
        'JSON.GET',
        key,
        '.',
        this.utilsService.serialize(value),
      );

      if (!isExist) {
        await this.redisClient.call(
          'JSON.SET',
          key,
          '.',
          this.utilsService.serialize({}),
        );
      }
    }

    return this.redisClient.call(
      'JSON.SET',
      key,
      path,
      this.utilsService.serialize(value),
    );
  }
}
