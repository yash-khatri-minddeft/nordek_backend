import { SetMetadata, applyDecorators, UseGuards } from '@nestjs/common';

import { Role } from '../enums';
import { AccessToken } from 'src/authentication-module';
import { RolesGuard } from '../guards';

export const ROLES_KEY = Symbol.for('roles');
export const Roles = (...roles: Role[]) =>
  applyDecorators(
    AccessToken(),
    UseGuards(RolesGuard),
    SetMetadata(ROLES_KEY, roles),
  );
