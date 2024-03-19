import { Controller, Post, Body, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ChangePasswordCommand, ChangePasswordUseCase } from '../use-case';
import { ChangePasswordDto } from '../dto';
import { AccessToken } from '../decorators';
import { RequestWithPayload } from '../types';

@Controller('auth/change-password')
@ApiTags('auth')
export class ChangePasswordController {
  constructor(private readonly changePasswordUseCase: ChangePasswordUseCase) {}

  @Post()
  @AccessToken()
  public changePassword(
    @Req() req: RequestWithPayload,
    @Body() body: ChangePasswordDto,
  ): Promise<void> {
    const command = new ChangePasswordCommand({
      oldPassword: body.oldPassword,
      newPassword: body.newPassword,
      userId: req.payload.userId,
    });
    return this.changePasswordUseCase.execute(command);
  }
}
