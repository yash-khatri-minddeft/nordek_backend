import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseRepository } from 'src/infrastructure/database';
import { RoleEntity } from 'src/entities';

@Injectable()
export class RolesRepository extends BaseRepository(RoleEntity) {
  constructor(protected readonly dataSource: DataSource) {
    super(dataSource);
  }
}
