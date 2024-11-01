import { type AccountId, accountIdToApiFormat } from '@abstract-money/core'
import { gql } from '../_generated/generated-graphql/gql'
import { useGraphQLRequest } from './useGraphQLRequest'
import { useQuery } from '@tanstack/react-query'

export const ACCOUNTS_METADATA_QUERY = gql(/* GraphQL */ `
  query AccountsMetadata($ids: [AccountIdWithChain!]!) {
    accountsByIds(ids: $ids) {
      id
      info { name chainId description link }
      address
      owner
      balances {
        amount
        denom
      }
    }
  }
`)

export type UseAccountsMetadataArgs = {
  accountIds: AccountId[] | undefined
}

export const useAccountsMetadataGraphQLQuery = ({ accountIds }: UseAccountsMetadataArgs) => {
  const request = useGraphQLRequest(ACCOUNTS_METADATA_QUERY)
  return useQuery({
    queryFn: () => {
      if (!accountIds) throw new Error('Missing `accountIds`')
      return request({ ids: accountIds.map(accountIdToApiFormat) })
    },
    queryKey: ['accounts', 'metadata', accountIds],
    select: (result) => result.accountsByIds,
    enabled: accountIds !== undefined,
  })
}
