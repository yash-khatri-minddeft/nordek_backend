import { Injectable } from '@nestjs/common';

import { ILocalStrategy } from 'src/authentication-module';
import { UserRepository } from '../../users/repositories';
import { RolesService } from '../../roles/services';
import { LoginResult, LoginMeta } from '../types';
import { UserResponseDto } from 'src/modules/users/dto';
import { OtpService } from '../../otp/services';
import { OtpException } from 'src/common/exceptions';

@Injectable()
export class LocalStrategy implements ILocalStrategy<LoginResult, LoginMeta> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly rolesService: RolesService,
    private readonly otpService: OtpService,
  ) {}

  async login(email: string, loginMeta: LoginMeta): Promise<LoginResult> {
    const user = await this.userRepository.getOneByParams({
      where: { email },
      throwError: true,
    });

    const roles = await this.rolesService.getById(user.id);

    if (user.otpSecret) {
      if (!loginMeta.otp) {
        throw new OtpException('Otp required');
      }

      if (!this.otpService.validateSecret(loginMeta.otp, user.otpSecret)) {
        throw new OtpException('Otp invalid');
      }
    }

    const payload = new UserResponseDto(user, roles);

    return { ...payload, roles, userId: user.id, password: user.password };
  }
}
