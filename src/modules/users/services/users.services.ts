import { Injectable } from '@nestjs/common';

import { UserRepository } from '../repositories';
import { UserResponseDto, SaveAdmin, EditMe } from '../dto';
import { RolesService } from '../../roles/services';
import { WrongRequestException } from 'src/common/exceptions';
import { SessionService } from 'src/authentication-module';

@Injectable()
export class UsersServices {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly rolesService: RolesService,
    private readonly sessionService: SessionService,
  ) {}

  async getAdminById(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.getOneByParams({
      where: { id },
      throwError: true,
    });

    const role = await this.rolesService.getById(id);

    return new UserResponseDto(user, role);
  }

  async getAdminList(): Promise<{ data: UserResponseDto[] }> {
    const users = await this.userRepository.getByParams({});

    const admins = await Promise.all(
      users.map(async (item) => {
        const roles = await this.rolesService.getById(item.id);
        return new UserResponseDto(item, roles);
      }),
    );

    return { ...users, data: admins };
  }

  private async emailDuplicateGuard(
    userId: string,
    email: string,
  ): Promise<void> {
    const user = await this.userRepository.getOneByParams({
      where: { id: userId },
      throwError: true,
    });

    if (user.email === email) {
      return;
    }
    const userWithNewEmail = await this.userRepository.getOneByParams({
      where: { email },
      throwError: false,
    });

    if (userWithNewEmail) {
      throw new WrongRequestException('Email already exists');
    }
  }

  async saveAdmin(param: SaveAdmin): Promise<UserResponseDto> {
    /**
     * TODO: be better make a decorator and use it in dto
     */
    await this.emailDuplicateGuard(param.id, param.email);

    const roles = await this.rolesService.getList();

    const userRoles = roles.filter((item) => param.roles.includes(item.id));

    const user = await this.userRepository.save({
      id: param.id,
      email: param.email,
      name: param.name,
      roles: userRoles,
    });

    await this.sessionService.deleteAllSession(param.id);

    return new UserResponseDto(user, user.roles);
  }

  async saveMe(param: EditMe & { id: string }): Promise<UserResponseDto> {
    /**
     * TODO: be better make a decorator and use it in dto
     */
    await this.emailDuplicateGuard(param.id, param.email);

    const user = await this.userRepository.save({
      id: param.id,
      email: param.email,
      name: param.name,
    });

    return new UserResponseDto(user, user.roles);
  }

  async deleteAdmin(id: string): Promise<void> {
    await this.userRepository.delete({
      id,
    });
  }
}
