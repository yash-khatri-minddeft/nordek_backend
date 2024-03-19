import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';

import { DefaultFields } from './default-fields';
import { RoleEntity } from './role.entity';

@Entity('users')
export class UserEntity extends DefaultFields {
  @Column('varchar', { name: 'email', nullable: false })
  email: string;

  @Column('varchar', { name: 'password', nullable: false })
  password: string;

  @Column('varchar', { name: 'name', nullable: false })
  name: string;

  @Column('varchar', { name: 'otp_secret', nullable: true })
  otpSecret: string | null;

  @ManyToMany(() => RoleEntity, (role) => role.users)
  @JoinTable({
    name: 'user_role',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles: RoleEntity[];
}
