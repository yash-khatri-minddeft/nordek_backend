import { Entity, Column } from 'typeorm';
import { DefaultFields } from './default-fields';

@Entity('example')
export class ExampleEntity extends DefaultFields {
  @Column('varchar', { name: 'name2', nullable: true })
  name: string | null;

  @Column('varchar', { name: 'name3', nullable: true })
  name2: string | null;
}
