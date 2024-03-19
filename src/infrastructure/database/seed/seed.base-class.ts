import { DataSource, EntityTarget } from 'typeorm';
import { Logger } from '@nestjs/common';

export type SingleSeedArgs = {
  dataSource: DataSource;
  entity: EntityTarget<any>;
  data: any[];
  logger: Logger;
  overwrite?: string[];
  conflictTarget?: string[];
  devData?: any[];
};

export class SingleSeed {
  protected readonly dataSource: DataSource;
  private readonly entity: EntityTarget<any>;
  private readonly data: any[];
  private readonly overwrite?: string[];
  private readonly conflictTarget?: string[];
  private readonly devData?: any[];
  private readonly logger: Logger;

  constructor(args: SingleSeedArgs) {
    this.dataSource = args.dataSource;
    this.entity = args.entity;
    this.data = args.data;
    this.overwrite = args.overwrite;
    this.conflictTarget = args.conflictTarget;
    this.devData = args.devData;
    this.logger = args.logger;
  }

  private getQuery() {
    return this.dataSource
      .getRepository(this.entity)
      .createQueryBuilder()
      .insert()
      .into(this.entity);
  }

  public async plant() {
    this.logger.log('Seed started');
    await this.getQuery().values(this.data).orIgnore().execute();
    this.logger.log('Seed finised');
  }

  public async plantDev() {
    const query = this.getQuery().values(this.devData || this.data);

    this.logger.log('Seed started');

    if (this.conflictTarget && this.overwrite) {
      await query.orUpdate(this.overwrite, this.conflictTarget).execute();
      return;
    }

    await query.orIgnore().execute();
    this.logger.log('Seed finised');
  }
}
