import { Injectable, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

import { DILocalStrategy, ILocalStrategy } from '../interfaces';
import { MinimalLoginPayload } from '../types';
import { SessionService, TokenService } from '../services';
import { RefreshTokenPayload, LoginResponse } from '../types';
import {
  InternalServerErrorException,
  WrongRequestException,
} from 'src/common/exceptions';

export class LocalLoginCommand {
  password: string;
  email: string;
  meta?: object;
  constructor(props: LocalLoginCommand) {
    Object.assign(this, props);
  }
}

@Injectable()
export class LocalLoginUseCase {
  constructor(
    @Inject(DILocalStrategy) private readonly strategy: ILocalStrategy,
    private readonly sessionService: SessionService,
    private readonly tokenService: TokenService,
  ) {}

  async execute(command: LocalLoginCommand): Promise<LoginResponse> {
    const payload = await this.strategy.login(command.email, command.meta);

    const sessionId = randomUUID();

    const password = payload.password;

    if (!password) {
      throw new InternalServerErrorException('Iterface error password require');
    }

    const result = await bcrypt.compare(command.password, password);

    if (!result) {
      throw new WrongRequestException('Wrong password');
    }

    const newPayload: Omit<MinimalLoginPayload, 'password'> & {
      password?: string;
    } = structuredClone(payload);

    delete newPayload.password;

    await this.sessionService.setSession({
      userId: payload.userId,
      payload,
      sessionId,
    });

    const accessToken = await this.tokenService.signAccess({
      ...newPayload,
      sessionId,
    });
    const refreshToken =
      await this.tokenService.signRefresh<RefreshTokenPayload>({
        sessionId,
        payload: newPayload,
      });

    return { accessToken, refreshToken, payload: newPayload };
  }
}
