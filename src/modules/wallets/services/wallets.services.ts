import { Injectable } from '@nestjs/common';

import { WalletsRepository } from '../repositories';
import { WalletEntity } from 'src/entities';

@Injectable()
export class WalletsServices {
  constructor(private readonly walletsRepository: WalletsRepository) {}

  async upserWallets(address: string, providerId: string): Promise<void> {
    const walletFromDb = await this.walletsRepository.getOneByParams({
      where: { address, providerId },
      throwError: false,
    });
    const wallet = new WalletEntity();

    if (walletFromDb) {
      wallet.id = walletFromDb.id;
    }

    wallet.address = address;
    wallet.providerId = providerId;
    wallet.lastLogIn = new Date();

    await this.walletsRepository.save(wallet);
  }

  async getWallets(): Promise<WalletEntity[]> {
    return this.walletsRepository.getByParams({});
  }

  async getById(id: string): Promise<WalletEntity> {
    return this.walletsRepository.getOneByParams({
      where: { id },
      throwError: true,
    });
  }

  async getByAddress(address: string): Promise<WalletEntity> {
    return this.walletsRepository.getOneByParams({
      where: { address },
      throwError: true,
    });
  }

  async toggleWallet(id: string, value: boolean): Promise<void> {
    await this.walletsRepository.update({ id }, { isActive: value });
  }
}
