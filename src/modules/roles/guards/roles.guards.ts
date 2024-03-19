import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Role } from '../enums';
import { ROLES_KEY } from '../decorators';
import { AuthRequest } from '../../auth/types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const { payload } = context.switchToHttp().getRequest<AuthRequest>();

    const payloadRoles = payload.roles.map((item) => item.id);
    const allowAllPermision = payloadRoles.includes(Role.ACCEPT_ALL_PERMISION);

    return (
      allowAllPermision ||
      requiredRoles.some((role) => payloadRoles.includes(role))
    );
  }
}
