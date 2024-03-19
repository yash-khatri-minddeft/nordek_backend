import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseRepository } from 'src/infrastructure/database';
import { WalletEntity } from 'src/entities';

@Injectable()
export class WalletsRepository extends BaseRepository(WalletEntity) {
  constructor(protected readonly dataSource: DataSource) {
    super(dataSource);
  }
}
