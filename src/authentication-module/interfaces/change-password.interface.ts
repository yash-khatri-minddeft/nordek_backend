export const DIChangePassword = Symbol.for('DIChangePassword');

export interface IChangePassword {
  getPassword(userId: string): Promise<string>;
  changePassword(userId: string, newPassword: string): Promise<void>;
}
