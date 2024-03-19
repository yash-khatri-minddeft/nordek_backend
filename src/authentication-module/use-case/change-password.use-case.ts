import { Injectable, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { DIChangePassword, IChangePassword } from '../interfaces';
import { compareStringWithHash } from 'src/utils/hashUtil';
import { WrongRequestException } from 'src/common/exceptions';
import { SessionService } from '../services';

export class ChangePasswordCommand {
  oldPassword: string;
  newPassword: string;
  userId: string;
  constructor(props: ChangePasswordCommand) {
    Object.assign(this, props);
  }
}

@Injectable()
export class ChangePasswordUseCase {
  constructor(
    @Inject(DIChangePassword) private readonly strategy: IChangePassword,
    private readonly sessionService: SessionService,
  ) {}

  async execute(command: ChangePasswordCommand): Promise<void> {
    const oldHash = await this.strategy.getPassword(command.userId);
    const result = await compareStringWithHash(command.oldPassword, oldHash);

    if (!result) {
      throw new WrongRequestException('Old password invalid');
    }

    const hashedPassword = await bcrypt.hash(command.newPassword, 10);
    await this.strategy.changePassword(command.userId, hashedPassword);
    await this.sessionService.deleteAllSession(command.userId);
  }
}
