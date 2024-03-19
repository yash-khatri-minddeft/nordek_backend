import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';

import admins from './admins.json';
import { UserEntity } from 'src/entities';
import { RolesService } from '../../roles/services/roles.services';
import { UserRepository } from '../repositories';

@Injectable()
export class UserSeedService {
  logger: Logger = new Logger(UserSeedService.name);

  constructor(
    protected readonly dataSource: DataSource,
    private readonly rolesService: RolesService,
    private readonly userRepository: UserRepository,
  ) {}

  private async getAdmins() {
    const roles = await this.rolesService.getList();

    return admins.map((admin: UserEntity) => {
      admin.roles = roles;
      return admin;
    });
  }

  public async plantDev() {
    this.logger.log('Seed started');
    const admins = await this.getAdmins();
    await this.userRepository.saveMany(admins);

    this.logger.log('Seed finised');
  }
}
