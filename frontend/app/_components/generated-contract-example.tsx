import { useCw20BaseBalanceQuery } from '../_generated/generated-abstract/cosmwasm-codegen/Cw20Base.react-query';
import { Cw20BaseQueryClient } from '../_generated/generated-abstract/cosmwasm-codegen/Cw20Base.client';
import { cosmWasmClientQueryOptions } from '../_utils/cosmwasm';
import { useQuery } from '@tanstack/react-query';
import { useAccounts } from '@abstract-money/react';
import { useAccount } from 'graz';
import { useAccountsMetadataGraphQLQuery } from '../_hooks/useQueryAccountsById';
import { appChain } from '../_utils/chains';

export function useGetBalance(address: string) {
  const { data: client } = useQuery(
    cosmWasmClientQueryOptions(appChain.chainName),
  );

  const { data: balance } = useCw20BaseBalanceQuery(
    {
      client: client
        ? new Cw20BaseQueryClient(client, address)
        : undefined,
      args: { address },
      options: { enabled: !!client }
    }
  );

  console.log(balance);
}

export const BalanceComponent: React.FC = () => {
  const chainId = appChain.chainId;
  const { data: cosmosAccount } = useAccount({ chainId });
  const { data: accounts } = useAccounts({
    args: {
      owner: cosmosAccount?.bech32Address ?? '',
      chains: [appChain.chainName],
    },
    query: {
      enabled: !!cosmosAccount?.bech32Address,
    }
  });

  const { data: accountsMetadata } = useAccountsMetadataGraphQLQuery({ accountIds: accounts });

  useGetBalance(accountsMetadata?.[0].proxy ?? '');

  return (
    <div>
      <h2>Balance for address: {accountsMetadata?.[0].proxy ?? ''}</h2>
      <p>Check the console for the balance information.</p>
    </div>
  );
};


