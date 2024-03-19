import { Controller, Post, Body, Headers } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { LocalLoginDto } from '../dto';
import {
  LocalLoginUseCase,
  LocalLoginCommand,
  LogoutUseCase,
  RefreshUseCase,
  LogoutCommand,
  RefreshCommand,
} from '../use-case';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly localLoginUseCase: LocalLoginUseCase,
    private readonly logoutUseCase: LogoutUseCase,
    private readonly refreshUseCase: RefreshUseCase,
  ) {}

  @Post('/login')
  async loginHandler(@Body() body: LocalLoginDto) {
    const command = new LocalLoginCommand({
      password: body.password,
      email: body.email,
      meta: body.meta,
    });
    return this.localLoginUseCase.execute(command);
  }

  @Post('/logout')
  async logoutHandler(@Headers('x-refresh-token') refreshToken: string) {
    const command = new LogoutCommand({
      refreshToken,
    });
    return this.logoutUseCase.execute(command);
  }

  @Post('/refresh')
  async refreshHandler(@Headers('x-refresh-token') refreshToken: string) {
    const command = new RefreshCommand({
      refreshToken,
    });
    return this.refreshUseCase.execute(command);
  }
}
