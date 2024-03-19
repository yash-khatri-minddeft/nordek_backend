import { Injectable } from '@nestjs/common';

import { IChangePassword } from 'src/authentication-module';
import { UserRepository } from '../../users/repositories';

@Injectable()
export class ChangePasswordStrategy implements IChangePassword {
  constructor(private readonly userRepository: UserRepository) {}

  async getPassword(userId: string): Promise<string> {
    const user = await this.userRepository.getOneByParams({
      where: { id: userId },
      throwError: true,
    });

    return user.password;
  }

  async changePassword(userId: string, newPassword: string) {
    await this.userRepository.update({ id: userId }, { password: newPassword });
  }
}
