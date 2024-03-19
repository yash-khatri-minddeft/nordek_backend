import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { ExampleEntity } from 'src/entities';
import { BaseRepository } from 'src/infrastructure/database';

@Injectable()
export class ExampleRepository extends BaseRepository(ExampleEntity) {
  constructor(private readonly dataSource: DataSource) {
    super(dataSource);
  }
}
