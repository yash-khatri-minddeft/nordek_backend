import { Injectable, Inject } from '@nestjs/common';

import { RedisService, RedisMap } from 'src/infrastructure/redis';
import { DIJWTOption, JwtOption } from '../interfaces';

@Injectable()
export class SessionService {
  constructor(
    private readonly redisService: RedisService,
    @Inject(DIJWTOption) private readonly option: JwtOption,
  ) {}

  async setSession({
    userId,
    sessionId,
    payload,
  }: {
    userId: string;
    sessionId: string;
    payload: Record<string, any>;
  }): Promise<void> {
    const sessionMap: RedisMap<
      string,
      Record<string, any>
    > = await this.redisService.createMap(`session:${userId}`);

    await sessionMap.set(
      sessionId,
      payload,
      this.option.refreshExpire || this.option.expire,
    );
  }

  async getSession(
    userId: string,
    sessionId: string,
  ): Promise<Record<string, any> | undefined> {
    const sessionMap: RedisMap<
      string,
      Record<string, any>
    > = await this.redisService.createMap(`session:${userId}`);

    return sessionMap.get(sessionId);
  }

  async deleteSession(userId: string, sessionId: string): Promise<void> {
    const sessionMap: RedisMap<
      string,
      Record<string, any>
    > = await this.redisService.createMap(`session:${userId}`);

    await sessionMap.delete(sessionId);
  }

  async deleteAllSession(userId: string): Promise<void> {
    const sessionMap: RedisMap<
      string,
      Record<string, any>
    > = await this.redisService.createMap(`session:${userId}`);
    await sessionMap.clear();
  }
}
