import { Controller, Get, Req, Param, Put, Body, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Roles } from '../../roles/decorators';
import { AccessToken } from 'src/authentication-module';
import { AuthRequest } from '../../auth/types';
import { Role } from '../../roles/enums';
import { UserResponseDto, SaveAdmin, EditMe } from '../dto';
import { UsersServices } from '../services';

@Controller('users')
@ApiTags('users')
export class UsersControllers {
  constructor(private readonly usersServices: UsersServices) {}

  @Get('/me')
  @AccessToken()
  public async getMe(@Req() req: AuthRequest): Promise<UserResponseDto> {
    return this.usersServices.getAdminById(req.payload.userId);
  }

  @Get('/:id')
  @Roles(Role.MANAGE_ADMINS)
  public async getById(@Param('id') id: string): Promise<UserResponseDto> {
    return this.usersServices.getAdminById(id);
  }

  @Get()
  @Roles(Role.MANAGE_ADMINS)
  public async getAdminList(): Promise<{ data: UserResponseDto[] }> {
    return this.usersServices.getAdminList();
  }

  @Put('/edit-by-admin')
  @Roles(Role.MANAGE_ADMINS)
  public async saveAdmin(@Body() body: SaveAdmin): Promise<UserResponseDto> {
    return this.usersServices.saveAdmin(body);
  }

  @AccessToken()
  @Put('/edit-me')
  public async editMe(
    @Body() body: EditMe,
    @Req() req: AuthRequest,
  ): Promise<UserResponseDto> {
    return this.usersServices.saveMe({ ...body, id: req.payload.id });
  }

  @Delete('/:id')
  @Roles(Role.MANAGE_ADMINS)
  public async deleteAdmin(@Param('id') id: string): Promise<void> {
    await this.usersServices.deleteAdmin(id);
  }
}
