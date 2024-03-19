import { Injectable } from '@nestjs/common';

import { TokenEntity } from 'src/entities';
import { TokensRepository } from '../repositories';
import { SaveToken } from '../dto';

@Injectable()
export class TokensService {
  constructor(private readonly tokensRepository: TokensRepository) {}

  async getTokenByAddress(address: string): Promise<TokenEntity> {
    return this.tokensRepository.getOneByParams({
      where: { address },
      throwError: true,
    });
  }

  async getInactiveTokens(): Promise<TokenEntity[]> {
    return this.tokensRepository.getByParams({
      where: { isActive: false },
      throwError: false,
    });
  }

  async upsertToken(params: SaveToken): Promise<TokenEntity> {
    let token = await this.tokensRepository.getOneByParams({
      where: { address: params.address },
      throwError: false,
    });

    if (token) {
      token.id = token.id;
    } else {
      token = new TokenEntity();
    }

    token.address = params.address;
    token.decimal = params.decimal;
    token.name = params.name;
    token.symbol = params.symbol;
    token.isActive = params.isActive;

    return this.tokensRepository.save(token);
  }
}
