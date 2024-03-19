import { HttpStatus } from '@nestjs/common';
import { AppHttpException } from './app-http.exception';

export class OtpException extends AppHttpException {
  constructor(message?: string, error?: any) {
    super(
      error?.status || error?.response?.status || HttpStatus.BAD_REQUEST,
      OtpException.name,
      error?.detail || error?.message || message || 'Bad request',
    );
  }
}
