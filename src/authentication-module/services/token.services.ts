import { Injectable, Inject } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { DIJWTOption, JwtOption } from '../interfaces';

@Injectable()
export class TokenService {
  constructor(@Inject(DIJWTOption) private readonly option: JwtOption) {}

  signAccess<Payload extends object>(payload: Payload): string {
    return jwt.sign(payload, this.option.secret, {
      expiresIn: this.option.expire,
    });
  }

  signRefresh<Payload extends object>(payload: Payload): string {
    return jwt.sign(payload, this.option.secret, {
      expiresIn: this.option.refreshExpire,
    });
  }

  verify<Payload>(token: string): Payload & jwt.JwtPayload {
    return jwt.verify(token, this.option.secret) as jwt.JwtPayload & Payload;
  }

  decode<Payload>(token: string): Payload & jwt.JwtPayload {
    const payload = jwt.decode(token) as jwt.JwtPayload & Payload;
    return payload;
  }
}
