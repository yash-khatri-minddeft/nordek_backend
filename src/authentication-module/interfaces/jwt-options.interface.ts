export const DIJWTOption = Symbol.for('DIJWTOption');

export interface JwtOption {
  secret: string;
  expire: number;
  refreshExpire: number;
}
