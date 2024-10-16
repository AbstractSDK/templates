import { useActiveWalletType, useChainInfos, useDisconnect, useSuggestChainAndConnect, useAccount } from 'graz'
import { mainnetChains } from 'graz/chains';
import { useCallback } from 'react'


export const GrazConnection: React.FC = () => {
  const chainsIds = Object.values(mainnetChains).map((chain) => chain.chainId)

  const { disconnect } = useDisconnect();
  const { suggestAndConnect: connect, isLoading } = useSuggestChainAndConnect()
  const { data: account } = useAccount()

  const chains = useChainInfos({ chainId: chainsIds })
  const walletType = useActiveWalletType()

  const onClick = useCallback(() => {
    if (!chains || !walletType) return

    chains.map((chain) => {
      connect({
        chainInfo: chain,
        walletType: walletType.walletType,
      })
    })
  }, [connect, chains, walletType])

  return (
    <div className="bg-black">
      <h2 className="text-xl font-bold mb-4">Wallet Connection</h2>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClick}
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {isLoading ? 'Connecting...' : 'Connect Wallet'}
          </button>
          <button
            type="button"
            onClick={() => disconnect({ chainId: chainsIds })}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Disconnect
          </button>
        </div>
        {account && (
          <div className="bg-gray-800 p-3 rounded-md">
            <h3 className="font-semibold mb-2">Connected Wallet Info:</h3>
            <p><strong>Address:</strong> {account.bech32Address}</p>
            <p><strong>Wallet Type:</strong> {walletType?.walletType}</p>
          </div>
        )}
      </div>
    </div>
  )
}