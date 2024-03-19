import { Entity, Column } from 'typeorm';

import { DefaultFields } from './default-fields';

@Entity('tokens')
export class TokenEntity extends DefaultFields {
  @Column('varchar', { name: 'address', nullable: false })
  address: string;

  @Column('varchar', { name: 'symbol', nullable: false })
  symbol: string;

  @Column('varchar', { name: 'name', nullable: false })
  name: string;

  @Column('int', { name: 'decimal', nullable: false })
  decimal: number;

  @Column('boolean', { name: 'is_active', nullable: false, default: true })
  isActive: boolean;
}
