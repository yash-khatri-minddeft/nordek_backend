import { Injectable } from '@nestjs/common';

import { IRegistrationByAdmin } from 'src/authentication-module';
import { UserRepository } from '../../users/repositories';
import { Payload, RegisteFields } from '../types';
import { WrongRequestException } from 'src/common/exceptions';
import { Role } from '../../roles/enums';
import { UserResponseDto } from 'src/modules/users/dto';
import { RolesService } from '../../roles/services';

@Injectable()
export class RegisterByAdminStrategy
  implements IRegistrationByAdmin<Payload, UserResponseDto, RegisteFields>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly rolesService: RolesService,
  ) {}
  private isAllow(payload: Payload): boolean {
    return Boolean(
      payload.roles.find((item) => item.name === Role.MANAGE_ADMINS),
    );
  }

  async registrationByAdmin(params: {
    email: string;
    password: string;
    adminId: string;
    fields?: RegisteFields;
    payload: Payload;
  }): Promise<UserResponseDto> {
    this.isAllow(params.payload);

    const candidate = await this.userRepository.getOneByParams({
      where: { email: params.email },
      throwError: false,
    });

    if (candidate) {
      throw new WrongRequestException('Email alredy exist');
    }

    if (!params.fields?.name) {
      throw new WrongRequestException('Name required');
    }

    const rolesIds = params?.fields.roles || [];

    const roles = await this.rolesService.getList();

    const userRoles = roles.filter((item) => rolesIds.includes(item.id));

    const user = await this.userRepository.save({
      email: params.email,
      password: params.password,
      name: params.fields.name,
      roles: userRoles,
    });

    return new UserResponseDto(user, userRoles);
  }
}
