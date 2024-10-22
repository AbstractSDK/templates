import type { ChainInfo } from '@keplr-wallet/types'
import { mainnetChains } from "graz/chains";

const ABSTRACT_CORS_PROXY_BASE_URL = 'https://rpc-proxy.abstract-os.workers.dev/'

const proxiedUrl = (chainId: string, path: 'rpc' | 'api') =>
  `${ABSTRACT_CORS_PROXY_BASE_URL}${chainId}/${path}`

export const proxyChainEndpoints = (chain: ChainInfo): ChainInfo =>
  ({
    ...chain,
    rpc: proxiedUrl(chain.chainId, 'rpc'),
    rest: proxiedUrl(chain.chainId, 'api'),
  }) as const

export const appChain = proxyChainEndpoints(mainnetChains.juno)
