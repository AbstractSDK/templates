'use client'

import { GrazProvider as Provider } from 'graz'
import type { ComponentProps } from 'react'
import { appChain } from '../../utils/chains'

export function GrazProvider(
  props: Pick<ComponentProps<typeof Provider>, 'children' | 'client'>,
) {
  return (
    <Provider
      client={props.client}
      grazOptions={{
        chains: [appChain],
        chainsConfig: {
          [appChain.chainId]: {
            gas: {
              price: '0.1',
              denom: 'ujuno',
            },
          },
        },
      }}
      {...props}
    />
  )
}
