import { Controller, Post, Body, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RegisterByAdminDto } from '../dto';
import { RegisterByAdminUseCase, RegisterByAdminCommand } from '../use-case';
import { RequestWithPayload } from '../types';
import { AccessToken } from '../decorators';

@Controller('auth/register-by-admin')
@ApiTags('auth')
export class RegisterByAdminController {
  constructor(
    private readonly registerByAdminUseCase: RegisterByAdminUseCase,
  ) {}

  @Post()
  @AccessToken()
  async registeByAdmin(
    @Body() body: RegisterByAdminDto,
    @Req() req: RequestWithPayload,
  ) {
    const command = new RegisterByAdminCommand({
      adminId: req.payload.userId,
      email: body.email,
      password: body.password,
      payload: req.payload,
      fields: body.fields,
    });

    return this.registerByAdminUseCase.execute(command);
  }
}
