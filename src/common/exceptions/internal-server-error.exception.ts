import { HttpStatus } from '@nestjs/common';
import { AppHttpException } from './app-http.exception';

export class InternalServerErrorException extends AppHttpException {
  constructor(message: string, error?: any) {
    super(
      error?.status ||
        error?.response?.status ||
        HttpStatus.INTERNAL_SERVER_ERROR,
      InternalServerErrorException.name,
      error?.detail || error?.message || message,
    );
  }
}
