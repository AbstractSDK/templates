import type { ChainInfo } from '@keplr-wallet/types'
import { testnetChains } from 'graz/chains'


const chainNameToPolkachuUrl = (chainName: string, urlType: 'api' | 'rpc') => {
  const hyphenatedChainName = chainName.replace('testnet', '-testnet')
  return `https://${hyphenatedChainName}-${urlType}.polkachu.com/`
}

export const proxyChainEndpoints = (chain: ChainInfo): ChainInfo =>
  ({
    ...chain,
    rpc: chainNameToPolkachuUrl(chain.chainName, 'rpc'),
    rest: chainNameToPolkachuUrl(chain.chainName, 'api'),
  }) as const
