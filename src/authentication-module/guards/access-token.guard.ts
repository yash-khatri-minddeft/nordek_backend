import {
  ExecutionContext,
  Injectable,
  CanActivate,
  Inject,
} from '@nestjs/common';

import { TokenService, SessionService } from '../services';
import { UnauthorizedException } from 'src/common/exceptions';
import { RequestWithPayload } from '../types';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    @Inject(TokenService) private readonly tokenService: TokenService,
    private readonly sessionService: SessionService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<RequestWithPayload>();
    const accessToken = request.headers.authorization?.split(' ')[1];

    if (!accessToken) {
      throw new UnauthorizedException();
    }

    try {
      request.payload = this.tokenService.verify(accessToken);
      const session = await this.sessionService.getSession(
        request.payload.userId,
        request.payload.sessionId,
      );

      if (!session) {
        throw new UnauthorizedException('Session not found');
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
