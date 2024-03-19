import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class DefaultFields {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('timestamptz', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamptz', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
