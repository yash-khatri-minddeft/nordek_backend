import { Injectable } from '@nestjs/common';

import { RolesRepository } from '../repositories';
import { RoleEntity } from 'src/entities';
import { Cache } from 'src/infrastructure/util';

@Injectable()
export class RolesService {
  constructor(private readonly rolesRepository: RolesRepository) {}

  @Cache(10000000000)
  async getList(): Promise<RoleEntity[]> {
    return this.rolesRepository.getByParams({ throwError: false });
  }

  async getById(userId: string): Promise<RoleEntity[]> {
    return this.rolesRepository.getByParams({
      where: { users: { id: userId } },
      throwError: false,
    });
  }
}
