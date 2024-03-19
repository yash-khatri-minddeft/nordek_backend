import { Entity, Column } from 'typeorm';

import { DefaultFields } from './default-fields';

@Entity('pairs')
export class PairEntity extends DefaultFields {
  @Column('varchar', { name: 'token0', nullable: false })
  token0: string;

  @Column('varchar', { name: 'token1', nullable: false })
  token1: string;

  @Column('boolean', { name: 'is_hide', nullable: false, default: false })
  isHide: boolean;
}
