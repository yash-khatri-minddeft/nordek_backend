import { UserEntity, RoleEntity } from 'src/entities';

export class UserResponseDto {
  id: string;
  name: string;
  email: string;
  otp: boolean;
  roles: RoleEntity[];
  createdAt: Date;
  updatedAt: Date;

  constructor(user: UserEntity, roles: RoleEntity[]) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.otp = Boolean(user.otpSecret);
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.roles = roles;
  }
}
