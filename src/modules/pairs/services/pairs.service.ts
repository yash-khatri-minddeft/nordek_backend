import { Injectable } from '@nestjs/common';

import { PairsRepository } from '../repositories';
import { PairEntity } from 'src/entities';
import { SavePair } from '../dto';

@Injectable()
export class PairsService {
  constructor(private readonly pairsRepository: PairsRepository) {}

  async getPair(token0: string, token1: string): Promise<PairEntity> {
    return this.pairsRepository.getOneByParams({
      where: [
        { token0: token0, token1: token1 },
        { token1: token0, token0: token1 },
      ],
      throwError: true,
    });
  }

  async getHideList(): Promise<PairEntity[]> {
    return this.pairsRepository.getByParams({
      where: { isHide: true },
      throwError: false,
    });
  }

  async upsertPair(params: SavePair): Promise<PairEntity> {
    let pair = await this.pairsRepository.getOneByParams({
      where: [
        { token0: params.token0, token1: params.token1 },
        { token1: params.token0, token0: params.token1 },
      ],
      throwError: false,
    });

    if (!pair) {
      pair = new PairEntity();
      pair.token0 = params.token0;
      pair.token1 = params.token1;
    }

    pair.token1 = params.token1;
    pair.isHide = params.isHide;

    return this.pairsRepository.save(pair);
  }
}
