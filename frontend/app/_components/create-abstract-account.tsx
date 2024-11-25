'use client'

import { useCreateAccountMonarchy, useAccounts } from "@abstract-money/react"
import { useAccount as graz_useAccount } from "graz"
import { Button } from '@/components/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/alert'
import { AlertCircle } from "lucide-react"
import { useEffect } from "react"
import { APP_CHAIN } from '@/app/_lib/constants'


export const CreateAbstractAccount: React.FC = () => {
  const { chainName, chainId } = APP_CHAIN

  const { data: cosmosAccount } = graz_useAccount({ chainId })

  const { mutate: createAccount, isLoading: isCreating, isSuccess: isAccountCreated } = useCreateAccountMonarchy({
    chainName,
  })

  const { data: accounts, isLoading: isLoadingAccounts, refetch: refetchAccounts } = useAccounts({
    args: {
      owner: cosmosAccount?.bech32Address ?? "",
      chains: [chainName],
    },
    query: {
      enabled: !!cosmosAccount?.bech32Address,
    },
  })

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    const fetchAccounts = async () => {
      if (isAccountCreated) {
        try {
          await refetchAccounts();
        } catch (error) {
          console.error("Error fetching accounts:", error);
        }
      }
    };

    if (isAccountCreated) {
      fetchAccounts(); // Fetch immediately when account is created
      intervalId = setInterval(fetchAccounts, 5000); // Then fetch every 5 seconds
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isAccountCreated, refetchAccounts]);

  const handleCreateAccount = async () => {
    if (!cosmosAccount) {
      console.error("No Cosmos account found")
      return
    }

    try {
      createAccount({
        args: { name: "Felipe test account", owner: cosmosAccount.bech32Address },
        fee: "auto",
      })
    } catch (error) {
      console.error("Error creating account:", error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Abstract Account Example</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <Button onClick={handleCreateAccount} disabled={isCreating}>
            {isCreating ? "Creating..." : "Create Account"}
          </Button>
          {isLoadingAccounts ? (
            <p>Loading accounts...</p>
          ) : accounts && accounts.length > 0 ? (
            <div className="bg-gray-100 p-3 rounded-md">
              <h3 className="font-semibold mb-2">Abstract Accounts:</h3>
              {accounts.map((account) => (
                <div key={account.seq} className="mb-2">
                  <p>
                    <strong>Chain Name:</strong> {account.chainName}
                  </p>
                  <p>
                    <strong>Sequence:</strong> {account.seq}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>No Abstract Accounts found</AlertTitle>
              <AlertDescription>
                Connect your wallet and create an account to get started.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
