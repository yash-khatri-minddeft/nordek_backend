import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { SingleSeed } from 'src/infrastructure/database';
import roles from './role.json';
import { RoleEntity } from 'src/entities';

@Injectable()
export class RoleSeedService extends SingleSeed {
  constructor(protected readonly dataSource: DataSource) {
    super({
      dataSource: dataSource,
      entity: RoleEntity,
      data: roles,
      logger: new Logger(RoleSeedService.name),
    });
  }
}
