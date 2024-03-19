import { Controller, Post, Body, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ChangePasswordByAdminDto } from '../dto';
import {
  ChangePasswordByAdminCommand,
  ChangePasswordByAdminUseCase,
} from '../use-case';
import { AccessToken } from '../decorators';
import { RequestWithPayload } from '../types';

@Controller('/auth/change-password-by-admin')
@ApiTags('auth')
export class ChangePasswordByAdminController {
  constructor(
    private readonly changePasswordByAdminUseCase: ChangePasswordByAdminUseCase,
  ) {}

  @Post()
  @AccessToken()
  public async changePassword(
    @Body() body: ChangePasswordByAdminDto,
    @Req() req: RequestWithPayload,
  ): Promise<void> {
    const command = new ChangePasswordByAdminCommand({
      userId: body.userId,
      newPassword: body.newPassword,
      adminId: req.payload.userId,
      payload: req.payload,
    });
    await this.changePasswordByAdminUseCase.execute(command);
  }
}
