import { Module } from '@nestjs/common';

import { ExampleController } from './controller';
import { DbModule } from 'src/infrastructure/database';
import { ExampleEntity } from 'src/entities';
import { ExampleRepository } from './repositories';

@Module({
  imports: [DbModule.forFeature([ExampleEntity])],
  controllers: [ExampleController],
  providers: [ExampleRepository],
})
export class ExampleModule {}
