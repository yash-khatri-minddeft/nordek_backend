import { Controller, Post, Req, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Roles } from '../../roles/decorators';
import { Role } from '../../roles/enums';
import { OtpService } from '../services';
import { AccessToken } from 'src/authentication-module';
import { AuthRequest } from '../../auth/types';
import { EnableOtp, DisableOtp, DisableOtpByAdmin } from '../dto';

@Controller('otp')
@ApiTags('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('generate-uri')
  @AccessToken()
  async generateUri(@Req() req: AuthRequest) {
    return this.otpService.generateUri(req.payload.email);
  }

  @Post('set-otp')
  @AccessToken()
  async enableOtp(
    @Req() req: AuthRequest,
    @Body() body: EnableOtp,
  ): Promise<void> {
    await this.otpService.setOtp({
      userId: req.payload.userId,
      token: body.token,
      secret: body.secret,
    });
  }

  @Post('disable')
  @AccessToken()
  async disableOtp(
    @Req() req: AuthRequest,
    @Body() body: DisableOtp,
  ): Promise<void> {
    await this.otpService.disableWithValidation(body.code, req.payload.userId);
  }

  @Post('disable-by-admin')
  @Roles(Role.MANAGE_ADMINS)
  async disableByAdmin(@Body() body: DisableOtpByAdmin): Promise<void> {
    await this.otpService.disable(body.userId);
  }
}
