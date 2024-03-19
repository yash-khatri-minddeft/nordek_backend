import { Injectable } from '@nestjs/common';

import { TokenService, SessionService } from '../services';
import { RefreshTokenPayload } from '../types';

export class LogoutCommand {
  refreshToken: string;
  constructor(props: LogoutCommand) {
    Object.assign(this, props);
  }
}

@Injectable()
export class LogoutUseCase {
  constructor(
    private readonly tokenService: TokenService,
    private readonly sessionService: SessionService,
  ) {}

  async execute(command: LogoutCommand): Promise<void> {
    const payload = this.tokenService.verify<RefreshTokenPayload>(
      command.refreshToken,
    );

    await this.sessionService.deleteSession(
      payload.payload.userId,
      payload.sessionId,
    );
  }
}
