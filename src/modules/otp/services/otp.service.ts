import { Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';

import { UserRepository } from '../../users/repositories';
import { WrongRequestException } from 'src/common/exceptions';
import { SessionService } from 'src/authentication-module';

@Injectable()
export class OtpService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly sessionService: SessionService,
  ) {}

  generateUri(email: string) {
    const secret = authenticator.generateSecret();
    return {
      secret,
      uri: authenticator.keyuri(email, 'NORDEK', secret),
    };
  }

  validateSecret(token: string, secret: string) {
    return authenticator.verify({ token, secret });
  }

  async setOtp({
    secret,
    userId,
    token,
  }: {
    secret: string;
    userId: string;
    token: string;
  }): Promise<void> {
    if (!this.validateSecret(token, secret)) {
      throw new WrongRequestException('Invalid otp');
    }

    await this.userRepository.update({ id: userId }, { otpSecret: secret });
    await this.sessionService.deleteAllSession(userId);
  }

  async disable(userId: string) {
    await this.userRepository.update({ id: userId }, { otpSecret: null });
  }

  async disableWithValidation(code: string, userId: string) {
    const user = await this.userRepository.getOneByParams({
      where: { id: userId },
      throwError: true,
    });

    if (!user.otpSecret) {
      throw new WrongRequestException('User dont have otp');
    }

    if (!this.validateSecret(code, user.otpSecret)) {
      throw new WrongRequestException('Invalid otp');
    }

    await this.disable(userId);
  }
}
