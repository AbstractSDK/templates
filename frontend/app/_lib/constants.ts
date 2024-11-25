import { proxyChainEndpoints } from '@/utils/chains'
import { testnetChains } from 'graz/chains'

export const ABSTRACT_API_URL = "https://believathon.api.abstract.money"
export const APP_CHAIN_CW20_EXAMPLE = 'neutron1sj7exsjqgy460zky8t0u0cvjutu09fswqfq3trssq9z935dryl3snjeekf'

export const APP_CHAIN = proxyChainEndpoints(testnetChains.neutrontestnet)
export const APP_CHAIN_ID = APP_CHAIN.chainId
export const APP_CHAIN_NAME = APP_CHAIN.chainName
