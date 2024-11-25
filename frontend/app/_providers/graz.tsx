'use client'

import { GrazProvider as Provider } from 'graz'
import type { ComponentProps } from 'react'
import { testnetChains, mainnetChainsArray, testnetChainsArray, mainnetChains } from 'graz/chains'
import { proxyChainEndpoints } from '@/utils/chains'

export function GrazProvider(
  props: Pick<ComponentProps<typeof Provider>, 'children' | 'client'>,
) {
  return (
    <Provider
      client={props.client}
      grazOptions={{
        chains: [...mainnetChainsArray, ...testnetChainsArray].map(proxyChainEndpoints),
        chainsConfig: {
          [mainnetChains.osmosis.chainId]: {
            gas: {
              price: '0.25',
              denom: 'uosmo',
            },
          },
          [mainnetChains.neutron.chainId]: {
            gas: {
              price: '0.1',
              denom: 'untrn',
            },
          },
          [testnetChains.xiontestnet.chainId]: {
            gas: {
              price: '0.001',
              denom: 'uxion',
            },
          },
          [testnetChains.osmosistestnet.chainId]: {
            gas: {
              price: '0.25',
              denom: 'uosmo',
            },
          },
          [testnetChains.neutrontestnet.chainId]: {
            gas: {
              price: '0.1',
              denom: 'untrn',
            },
          },
        },
      }}
      {...props}
    />
  )
}
