import { HttpStatus } from '@nestjs/common';
import { AppHttpException } from './app-http.exception';

export class ForbiddenException extends AppHttpException {
  constructor(error?: any) {
    super(
      error?.status || error?.response?.status || HttpStatus.FORBIDDEN,
      ForbiddenException.name,
      error?.detail || error?.message || 'Forbidden',
    );
  }
}
