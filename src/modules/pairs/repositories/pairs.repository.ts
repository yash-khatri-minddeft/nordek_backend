import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseRepository } from 'src/infrastructure/database';
import { PairEntity } from 'src/entities';

@Injectable()
export class PairsRepository extends BaseRepository(PairEntity) {
  constructor(protected readonly dataSource: DataSource) {
    super(dataSource);
  }
}
