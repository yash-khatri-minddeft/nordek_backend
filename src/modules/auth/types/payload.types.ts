import {
  UserIdPayload,
  PasswordPayload,
} from 'src/authentication-module/types';
import { RequestWithPayload } from 'src/authentication-module';
import { UserResponseDto } from '../../users/dto';

export type Payload = UserIdPayload & UserResponseDto;

export type LoginResult = PasswordPayload & Payload;

export type AuthRequest = RequestWithPayload<Payload>;
