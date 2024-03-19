import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { AccessTokenGuard } from '../guards';

export const BaseAccessToken = () => UseGuards(AccessTokenGuard);

export const AccessToken = () =>
  applyDecorators(BaseAccessToken(), ApiBearerAuth());
