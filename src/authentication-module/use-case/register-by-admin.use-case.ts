import { Injectable, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { DIRegistrationByAdmin, IRegistrationByAdmin } from '../interfaces';
import { UserIdPayload } from '../types';

export class RegisterByAdminCommand {
  email: string;
  password: string;
  adminId: string;
  fields: object;
  payload: UserIdPayload;
  constructor(props: RegisterByAdminCommand) {
    Object.assign(this, props);
  }
}

@Injectable()
export class RegisterByAdminUseCase {
  constructor(
    @Inject(DIRegistrationByAdmin)
    private readonly strategy: IRegistrationByAdmin<
      UserIdPayload,
      object,
      object
    >,
  ) {}

  async execute(command: RegisterByAdminCommand): Promise<object> {
    const hashedPassword = await bcrypt.hash(command.password, 10);
    return this.strategy.registrationByAdmin({
      email: command.email,
      password: hashedPassword,
      adminId: command.adminId,
      payload: command.payload,
      fields: command.fields,
    });
  }
}
