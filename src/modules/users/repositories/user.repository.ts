import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseRepository } from 'src/infrastructure/database';
import { UserEntity } from 'src/entities';

@Injectable()
export class UserRepository extends BaseRepository(UserEntity) {
  constructor(protected readonly dataSource: DataSource) {
    super(dataSource);
  }
}
