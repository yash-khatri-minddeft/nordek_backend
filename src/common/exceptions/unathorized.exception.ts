import { HttpStatus } from '@nestjs/common';
import { AppHttpException } from './app-http.exception';

export class UnauthorizedException extends AppHttpException {
  constructor(error?: any) {
    super(
      error?.status || error?.response?.status || HttpStatus.UNAUTHORIZED,
      UnauthorizedException.name,
      error?.detail || error?.message || 'User unauthorized',
    );
  }
}
