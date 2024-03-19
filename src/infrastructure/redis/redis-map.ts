import { Redis } from 'ioredis';

import { UtilsService } from './utils.service';

export class RedisMap<K = string, V = unknown> {
  constructor(
    private readonly name: string,
    private readonly client: Redis,
    private readonly utilsService: UtilsService,
  ) {}

  private addAlias(key: string): string {
    return `${this.name}:${key}`;
  }

  private removeAlias(key: string): string {
    return key.replace(`${this.name}:`, '');
  }

  private getAll(): Promise<string[]> {
    return this.client.keys(`${this.name}:*`);
  }

  async get(key: K): Promise<V | undefined> {
    const keyStr = this.utilsService.serialize<K>(key);
    const valueStr = await this.client.get(this.addAlias(keyStr));
    if (!valueStr) {
      return undefined;
    }
    return this.utilsService.deserialize<V>(valueStr);
  }

  async set(key: K, value: V, expired?: number): Promise<void> {
    const keyStr = this.utilsService.serialize<K>(key);
    const valueStr = this.utilsService.serialize<V>(value);

    const fullKey = this.addAlias(keyStr);

    if (expired) {
      await this.client.setex(fullKey, expired, valueStr);
      return;
    }

    await this.client.set(fullKey, valueStr);
  }

  async has(key: K): Promise<boolean> {
    const keyStr = this.utilsService.serialize<K>(key);
    return Boolean(await this.client.exists(this.addAlias(keyStr)));
  }

  async clear(): Promise<void> {
    const keys = await this.client.keys(`${this.name}:*`);
    if (keys.length) {
      await this.client.unlink(...keys);
    }
  }

  async delete(key: K): Promise<void> {
    const keyStr = this.utilsService.serialize<K>(key);
    await this.client.del(this.addAlias(keyStr));
  }

  async *[Symbol.asyncIterator]() {
    const data = await this.getAll();
    for await (const item of data) {
      const valueStr = await this.client.get(item);
      const key = this.utilsService.deserialize<K>(this.removeAlias(item));

      const value = valueStr && this.utilsService.deserialize<V>(valueStr);
      yield [key, value];
    }
  }
}
