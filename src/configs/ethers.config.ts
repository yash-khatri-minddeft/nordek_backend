import { registerAs } from '@nestjs/config';

import { ConfigNames } from 'src/common/enums';

export interface IEthersConfig {
  rpc: string;
  privateKey: string;
  factoryAddress: string;
}

export const etherConfig = registerAs(ConfigNames.ETHERS, () => {
  const rpc = process.env.RPC;
  const privateKey = process.env.PRIVATE_KEY;
  const factoryAddress = process.env.FACTORY_ADDRESS;

  if (!rpc || !factoryAddress || !privateKey) {
    throw new Error(
      '[Config selector]: required env RPC, PRIVATE_KEY, FACTORY_ADDRESS',
    );
  }

  const config: IEthersConfig = {
    rpc,
    privateKey,
    factoryAddress,
  };

  return config;
});
