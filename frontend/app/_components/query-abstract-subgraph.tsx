'use client'

import { useAccount } from "graz"
import { useAccountsMetadataGraphQLQuery } from "../_hooks/useQueryAccountsById"
import { useAccounts } from "@abstract-money/react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/card"
import { Alert, AlertDescription, AlertTitle } from "../../components/alert"
import { AlertCircle } from "lucide-react"
import { APP_CHAIN } from '@/app/_lib/constants'

export const QueryAbstractSubgraph: React.FC = () => {
  const { data: cosmosAccount } = useAccount({ chainId: APP_CHAIN.chainId })
  const { data: accounts } = useAccounts({
    args: {
      owner: cosmosAccount?.bech32Address ?? "",
      chains: [APP_CHAIN.chainName],
    },
    query: {
      enabled: !!cosmosAccount?.bech32Address,
    },
  })
  const { data: accountsMetadata, isLoading } = useAccountsMetadataGraphQLQuery({ accountIds: accounts })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Query Abstract Subgraph Example</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {isLoading && <p>Loading account details...</p>}
          {accountsMetadata && accountsMetadata.length > 0 ? (
            <div className="bg-gray-100 p-3 rounded-md">
              <h3 className="font-semibold mb-2">Account Information:</h3>
              {accountsMetadata.map((account) => (
                <div key={account.id} className="mb-4">
                  <p>
                    <strong>ID:</strong> {account.id}
                  </p>
                  <p>
                    <strong>Name:</strong> {account.info.name}
                  </p>
                  <p>
                    <strong>Chain ID:</strong> {account.info.chainId}
                  </p>
                  <p>
                    <strong>Account:</strong> {account.address}
                  </p>
                  <p>
                    <strong>Owner:</strong> {account.owner}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>No Abstract Accounts found</AlertTitle>
              <AlertDescription>
                Connect your wallet and create an account to view account details.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
