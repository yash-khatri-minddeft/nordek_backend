import { HttpStatus } from '@nestjs/common';
import { AppHttpException } from './app-http.exception';

export class WrongRequestException extends AppHttpException {
  constructor(message?: string, error?: any) {
    super(
      error?.status || error?.response?.status || HttpStatus.BAD_REQUEST,
      WrongRequestException.name,
      error?.detail || error?.message || message || 'Bad request',
    );
  }
}
