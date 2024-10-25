'use client'

import { cw20Base } from "../_generated/generated-abstract"
import { useAccounts } from "@abstract-money/react"
import { useAccount } from "graz"
import { useAccountsMetadataGraphQLQuery } from "../_hooks/useQueryAccountsById"
import { appChain } from "../../utils/chains"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/card"
import { Alert, AlertDescription, AlertTitle } from "../../components/alert"
import { AlertCircle } from "lucide-react"

export const CodegenContract: React.FC = () => {
  const contractAddress = "juno1ju8k8sqwsqu5k6umrypmtyqu2wqcpnrkf4w4mntvl0javt4nma7s8lzgss"
  const chainId = appChain.chainId

  const { data: cosmosAccount } = useAccount({ chainId })
  const { data: accounts } = useAccounts({
    args: {
      owner: cosmosAccount?.bech32Address ?? "",
      chains: [appChain.chainName],
    },
    query: {
      enabled: !!cosmosAccount?.bech32Address,
    },
  })
  const { data: accountsMetadata } = useAccountsMetadataGraphQLQuery({ accountIds: accounts })
  const { data: balance, isLoading } = cw20Base.queries.useBalance({
    contractAddress,
    args: { address: accountsMetadata?.[0]?.proxy ?? "" },
    options: { enabled: !!accountsMetadata?.[0]?.proxy && !!contractAddress },
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Codegen Contract Example</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p>Loading balance...</p>
        ) : balance ? (
          <div className="bg-gray-100 p-3 rounded-md">
            <h3 className="font-semibold mb-2">Balance for address: {accountsMetadata?.[0]?.proxy ?? ""}</h3>
            <p>
              <strong>Balance:</strong> {balance.balance}
            </p>
          </div>
        ) : (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No balance found</AlertTitle>
            <AlertDescription>
              Connect your wallet and create an account to view your balance.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}