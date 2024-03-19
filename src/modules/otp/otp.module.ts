import { Module } from '@nestjs/common';

import { OtpController } from './controllers';
import { OtpService } from './services';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [OtpController],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule {}
