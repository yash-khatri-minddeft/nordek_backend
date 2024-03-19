import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseRepository } from 'src/infrastructure/database';
import { TokenEntity } from 'src/entities';

@Injectable()
export class TokensRepository extends BaseRepository(TokenEntity) {
  constructor(protected readonly dataSource: DataSource) {
    super(dataSource);
  }
}
