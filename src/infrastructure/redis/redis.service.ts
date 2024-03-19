import { Injectable, Inject } from '@nestjs/common';
import { Redis, RedisKey } from 'ioredis';

import { RedisMap } from './redis-map';
import { REDIS_TOKEN, RedisModuleOptions } from './redis.module-definition';
import { UtilsService } from './utils.service';

/**
 * TODO: add multi command
 */
@Injectable()
export class RedisService {
  private readonly redisClient: Redis;

  constructor(
    @Inject(REDIS_TOKEN) redisOption: RedisModuleOptions,
    private readonly utilsService: UtilsService,
  ) {
    this.redisClient = new Redis(redisOption);
  }

  async set<T = any>(key: RedisKey, value: T, expire?: number) {
    if (expire) {
      return this.redisClient.set(
        key,
        this.utilsService.serialize(value),
        'PX',
        expire,
      );
    }
    return this.redisClient.set(key, this.utilsService.serialize(value));
  }

  async setnx<T = any>(key: RedisKey, value: T, expire?: number) {
    if (expire) {
      const res = await this.redisClient.set(
        key,
        this.utilsService.serialize(value),
        'PX',
        expire,
        'NX',
      );

      if (res === null) {
        throw new Error('[setnx] key already exists');
      }
      return 1;
    }
    const res = await this.redisClient.setnx(
      key,
      this.utilsService.serialize(value),
    );
    if (res === 0) {
      throw new Error('[setnx] key already exists');
    }
    return res;
  }

  async expire(key: RedisKey, ms: number) {
    const res = await this.redisClient.pexpire(key, ms);

    return res === 1;
  }

  async get<T = any>(key: RedisKey) {
    const data = await this.redisClient.get(key);
    if (!data) {
      return null;
    }

    return this.utilsService.deserialize<T>(data);
  }

  async mget<T = any>(...keys: RedisKey[]) {
    const data = await this.redisClient.mget(...keys);
    if (!data) {
      return [];
    }

    return data.map((value) =>
      value ? this.utilsService.deserialize<T>(value) : null,
    );
  }

  async del(key: RedisKey) {
    return this.redisClient.del(key);
  }

  async mdel(...keys: RedisKey[]) {
    return this.redisClient.del(keys);
  }

  async incr(key: RedisKey) {
    return this.redisClient.incr(key);
  }

  public createMap<K, V>(name: string): RedisMap<K, V> {
    return new RedisMap<K, V>(name, this.redisClient, this.utilsService);
  }
}
