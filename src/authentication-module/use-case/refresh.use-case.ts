import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { TokenService, SessionService } from '../services';
import { RefreshTokenPayload, LoginResponse } from '../types';
import { WrongRequestException } from 'src/common/exceptions';

export class RefreshCommand {
  refreshToken: string;
  constructor(props: RefreshCommand) {
    Object.assign(this, props);
  }
}

@Injectable()
export class RefreshUseCase {
  constructor(
    private readonly tokenService: TokenService,
    private readonly sessionService: SessionService,
  ) {}

  async execute(command: RefreshCommand): Promise<LoginResponse> {
    const refreshPayload = this.tokenService.verify<RefreshTokenPayload>(
      command.refreshToken,
    );

    const session = await this.sessionService.getSession(
      refreshPayload.payload.userId,
      refreshPayload.sessionId,
    );

    if (!session) {
      throw new WrongRequestException('Session not found');
    }

    await this.sessionService.deleteSession(
      refreshPayload.payload.userId,
      refreshPayload.sessionId,
    );

    const sessionId = randomUUID();
    const accessToken = await this.tokenService.signAccess(
      refreshPayload.payload,
    );

    const refreshToken =
      await this.tokenService.signRefresh<RefreshTokenPayload>({
        sessionId,
        payload: refreshPayload.payload,
      });

    await this.sessionService.setSession({
      userId: refreshPayload.payload.userId,
      payload: refreshPayload.payload,
      sessionId,
    });

    return { accessToken, refreshToken, payload: refreshPayload.payload };
  }
}
