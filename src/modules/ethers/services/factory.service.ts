import { Injectable } from '@nestjs/common';
import { JsonRpcProvider, Contract, Wallet, parseUnits } from 'ethers';
import { ConfigService } from '@nestjs/config';

import { IEthersConfig } from 'src/configs';
import { ConfigNames } from 'src/common/enums';
import factoryAbi from 'src/common/abi/factory.abi.json';
import { ErrorCode } from '../enum';
import { InternalServerErrorException } from 'src/common/exceptions';

@Injectable()
export class FactoryServices {
  private readonly config: IEthersConfig;
  private readonly contract: Contract;
  private readonly provider: JsonRpcProvider;

  constructor(private readonly configService: ConfigService) {
    this.config = this.configService.getOrThrow<IEthersConfig>(
      ConfigNames.ETHERS,
    );
    this.provider = new JsonRpcProvider(this.config.rpc);

    const signer = new Wallet(this.config.privateKey, this.provider);

    this.contract = new Contract(
      this.config.factoryAddress,
      factoryAbi,
      signer,
    );
  }

  async setSwapFeeBP(value: string): Promise<void> {
    try {
      const valueBigInt = parseUnits(value, 2);
      const fee = await this.provider.getFeeData();

      const tx = await this.contract.setSwapFeeBP(valueBigInt, {
        maxFeePerGas: fee.maxFeePerGas,
      });

      await tx.wait();
    } catch (error) {
      console.log(error);
      if (error.code === ErrorCode.INSUFFICIENT_FUNDS) {
        throw new InternalServerErrorException('Insufficient funds');
      }
      throw new InternalServerErrorException(error.code, error);
    }
  }

  async lock(pool: string): Promise<void> {
    try {
      const fee = await this.provider.getFeeData();

      const tx = await this.contract.lock(pool, {
        maxFeePerGas: fee.maxFeePerGas,
      });

      await tx.wait();
    } catch (error) {
      if (error.code === ErrorCode.INSUFFICIENT_FUNDS) {
        throw new InternalServerErrorException('Insufficient funds');
      }
      throw new InternalServerErrorException(error.code, error);
    }
  }

  async unlock(pool: string): Promise<void> {
    try {
      const fee = await this.provider.getFeeData();

      const tx = await this.contract.unlock(pool, {
        maxFeePerGas: fee.maxFeePerGas,
      });

      await tx.wait();
    } catch (error) {
      if (error.code === ErrorCode.INSUFFICIENT_FUNDS) {
        throw new InternalServerErrorException('Insufficient funds');
      }
      throw new InternalServerErrorException(error.code, error);
    }
  }
}
