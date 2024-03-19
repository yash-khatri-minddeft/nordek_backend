import { Controller, Get, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RolesService } from '../services';
import { AuthRequest } from '../../auth/types';
import { AccessToken } from 'src/authentication-module';
import { RoleEntity } from 'src/entities';

@Controller('roles')
@ApiTags('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @AccessToken()
  @Get('/list')
  async getRolesListHandler(): Promise<RoleEntity[]> {
    return this.rolesService.getList();
  }

  @AccessToken()
  @Get('/my')
  async getMyRolesHandler(@Req() req: AuthRequest): Promise<RoleEntity[]> {
    return this.rolesService.getById(req.payload.userId);
  }
}
