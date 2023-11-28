import { Button } from '@chakra-ui/react'
import { useChains } from '@cosmos-kit/react'
import type { FC } from 'react'

interface ConnectButtonProps {}

export const ConnectButton: FC<ConnectButtonProps> = () => {
  const chains = useChains(['juno'])
  const connected = Object.values(chains).every(
    (chain) => chain.isWalletConnected
  )
  const { connect, openView } = Object.values(chains)[0]

  return (
    <Button onClick={connected ? openView : connect}>
      {connected ? 'Wallet' : 'Connect'}
    </Button>
  )
}