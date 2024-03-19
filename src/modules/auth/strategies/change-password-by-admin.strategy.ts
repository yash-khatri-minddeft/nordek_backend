import { Injectable } from '@nestjs/common';

import { IChangePasswordByAdmin } from 'src/authentication-module';
import { UserRepository } from '../../users/repositories';
import { Payload } from '../types';
import { Role } from '../../roles/enums';
import { ForbiddenException } from 'src/common/exceptions';

@Injectable()
export class ChangePasswordByAdminStrategy
  implements IChangePasswordByAdmin<Payload>
{
  constructor(private readonly userRepository: UserRepository) {}
  private isAllow(payload: Payload): boolean {
    return Boolean(
      payload.roles.find((item) => item.name === Role.MANAGE_ADMINS),
    );
  }

  async changePassword({
    userId,
    newPassword,
    payload,
  }: {
    userId: string;
    newPassword: string;
    payload: Payload;
  }): Promise<void> {
    if (!this.isAllow(payload)) {
      throw new ForbiddenException();
    }

    await this.userRepository.update({ id: userId }, { password: newPassword });
  }
}
