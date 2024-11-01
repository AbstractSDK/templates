import type { ChainInfo } from '@keplr-wallet/types'
import { testnetChains } from 'graz/chains'


const chainNameToPolachuUrl = (chainName: string, urlType: 'api' | 'rpc') => {
  const hyphenatedChainName = chainName.replace('testnet', '-testnet')
  return `https://${hyphenatedChainName}-${urlType}.polkachu.com/`
}

export const proxyChainEndpoints = (chain: ChainInfo): ChainInfo =>
  ({
    ...chain,
    rpc: chainNameToPolachuUrl(chain.chainName, 'rpc'),
    rest: chainNameToPolachuUrl(chain.chainName, 'api'),
  }) as const

export const appChain = proxyChainEndpoints(testnetChains.neutrontestnet)
