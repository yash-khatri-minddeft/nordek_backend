import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');
  use(req: Request, res: Response, next: NextFunction) {
    this.handleRequestLog(req);
    this.handleResponseLog(req, res);
    if (next) {
      next();
    }
  }

  handleRequestLog(req: Request) {
    const { method, originalUrl } = req;
    const message = `[REQUEST]: ${method} ${originalUrl}`;
    this.logger.log(message);
  }
  handleResponseLog(req: Request, res: Response) {
    res.on('finish', () => {
      const { method, originalUrl } = req;
      const { statusCode, statusMessage } = res;

      const message = `[RESPONSE]: ${method} ${originalUrl} ${statusCode} ${statusMessage}`;
      if (statusCode >= 500) {
        return this.logger.error(message);
      }

      if (statusCode >= 400) {
        return this.logger.warn(message);
      }

      return this.logger.log(message);
    });
  }
}
