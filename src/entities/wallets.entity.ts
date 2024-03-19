import { Entity, Column } from 'typeorm';

import { DefaultFields } from './default-fields';

@Entity('wallet')
export class WalletEntity extends DefaultFields {
  @Column('varchar', { name: 'address', nullable: false })
  address: string;

  @Column('timestamptz', { name: 'last_log_in', nullable: false })
  lastLogIn: Date;

  @Column('varchar', { name: 'provider_id', nullable: true })
  providerId: string | null;

  @Column('boolean', { name: 'is_active', nullable: false, default: true })
  isActive: boolean;
}
