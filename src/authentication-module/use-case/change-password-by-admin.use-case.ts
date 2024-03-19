import { Injectable, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { DIChangePasswordByAdmin, IChangePasswordByAdmin } from '../interfaces';
import { UserIdPayload } from '../types';
import { SessionService } from '../services';

export class ChangePasswordByAdminCommand {
  newPassword: string;
  userId: string;
  adminId: string;
  payload: UserIdPayload;
  constructor(props: ChangePasswordByAdminCommand) {
    Object.assign(this, props);
  }
}

@Injectable()
export class ChangePasswordByAdminUseCase {
  constructor(
    @Inject(DIChangePasswordByAdmin)
    private readonly changePasswordByAdmin: IChangePasswordByAdmin,
    private readonly sessionService: SessionService,
  ) {}

  async execute(command: ChangePasswordByAdminCommand): Promise<void> {
    const hashedPassword = await bcrypt.hash(command.newPassword, 10);
    await this.changePasswordByAdmin.changePassword({
      userId: command.userId,
      adminId: command.adminId,
      newPassword: hashedPassword,
      payload: command.payload,
    });
    await this.sessionService.deleteAllSession(command.userId);
  }
}
