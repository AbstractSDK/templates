'use client'

import { ExecuteResult } from '@abstract-money/cli/cosmjs'
import { UseMutationOptions } from '@tanstack/react-query'
import { useMemo } from 'react'

import {
  useAbstractModuleClient,
  useAbstractModuleQueryClient,
  useModuleClient,
  useModuleQueryClient,
} from '@abstract-money/react'

import { AccountId } from '@abstract-money/core'

import {
  useCw20BaseUploadLogoMutation,
  Cw20BaseUploadLogoMutation,
  useCw20BaseUpdateMarketingMutation,
  Cw20BaseUpdateMarketingMutation,
  useCw20BaseUpdateMinterMutation,
  Cw20BaseUpdateMinterMutation,
  useCw20BaseMintMutation,
  Cw20BaseMintMutation,
  useCw20BaseBurnFromMutation,
  Cw20BaseBurnFromMutation,
  useCw20BaseSendFromMutation,
  Cw20BaseSendFromMutation,
  useCw20BaseTransferFromMutation,
  Cw20BaseTransferFromMutation,
  useCw20BaseDecreaseAllowanceMutation,
  Cw20BaseDecreaseAllowanceMutation,
  useCw20BaseIncreaseAllowanceMutation,
  Cw20BaseIncreaseAllowanceMutation,
  useCw20BaseSendMutation,
  Cw20BaseSendMutation,
  useCw20BaseBurnMutation,
  Cw20BaseBurnMutation,
  useCw20BaseTransferMutation,
  Cw20BaseTransferMutation,
  useCw20BaseDownloadLogoQuery,
  useCw20BaseMarketingInfoQuery,
  useCw20BaseAllAccountsQuery,
  useCw20BaseAllSpenderAllowancesQuery,
  useCw20BaseAllAllowancesQuery,
  useCw20BaseAllowanceQuery,
  useCw20BaseMinterQuery,
  useCw20BaseTokenInfoQuery,
  useCw20BaseBalanceQuery,
} from './cosmwasm-codegen/Cw20Base.react-query'

import {
  Cw20BaseQueryClient,
  Cw20BaseClient,
} from './cosmwasm-codegen/Cw20Base.client'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Cw20Base
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const cw20Base = {
  queries: {
    useDownloadLogo: ({
      options,
      ...rest
    }: Omit<
      Parameters<
        typeof useCw20BaseDownloadLogoQuery<Cw20BaseTypes.DownloadLogoResponse>
      >[0],
      'client'
    > & {
      contractAddress: string | undefined
      chainName: string | undefined
    }) => {
      const { data: cw20BaseQueryClient } = useModuleQueryClient({
        ...rest,
        Module: Cw20BaseQueryClient,
      })

      return useCw20BaseDownloadLogoQuery({
        client: cw20BaseQueryClient,
        options,
      })
    },
    useMarketingInfo: ({
      options,
      ...rest
    }: Omit<
      Parameters<
        typeof useCw20BaseMarketingInfoQuery<Cw20BaseTypes.MarketingInfoResponse>
      >[0],
      'client'
    > & {
      contractAddress: string | undefined
      chainName: string | undefined
    }) => {
      const { data: cw20BaseQueryClient } = useModuleQueryClient({
        ...rest,
        Module: Cw20BaseQueryClient,
      })

      return useCw20BaseMarketingInfoQuery({
        client: cw20BaseQueryClient,
        options,
      })
    },
    useAllAccounts: ({
      options,
      args,
      ...rest
    }: Omit<
      Parameters<
        typeof useCw20BaseAllAccountsQuery<Cw20BaseTypes.AllAccountsResponse>
      >[0],
      'client'
    > & {
      contractAddress: string | undefined
      chainName: string | undefined
    }) => {
      const { data: cw20BaseQueryClient } = useModuleQueryClient({
        ...rest,
        Module: Cw20BaseQueryClient,
      })

      return useCw20BaseAllAccountsQuery({
        client: cw20BaseQueryClient,
        options,
        args,
      })
    },
    useAllSpenderAllowances: ({
      options,
      args,
      ...rest
    }: Omit<
      Parameters<
        typeof useCw20BaseAllSpenderAllowancesQuery<Cw20BaseTypes.AllSpenderAllowancesResponse>
      >[0],
      'client'
    > & {
      contractAddress: string | undefined
      chainName: string | undefined
    }) => {
      const { data: cw20BaseQueryClient } = useModuleQueryClient({
        ...rest,
        Module: Cw20BaseQueryClient,
      })

      return useCw20BaseAllSpenderAllowancesQuery({
        client: cw20BaseQueryClient,
        options,
        args,
      })
    },
    useAllAllowances: ({
      options,
      args,
      ...rest
    }: Omit<
      Parameters<
        typeof useCw20BaseAllAllowancesQuery<Cw20BaseTypes.AllAllowancesResponse>
      >[0],
      'client'
    > & {
      contractAddress: string | undefined
      chainName: string | undefined
    }) => {
      const { data: cw20BaseQueryClient } = useModuleQueryClient({
        ...rest,
        Module: Cw20BaseQueryClient,
      })

      return useCw20BaseAllAllowancesQuery({
        client: cw20BaseQueryClient,
        options,
        args,
      })
    },
    useAllowance: ({
      options,
      args,
      ...rest
    }: Omit<
      Parameters<
        typeof useCw20BaseAllowanceQuery<Cw20BaseTypes.AllowanceResponse>
      >[0],
      'client'
    > & {
      contractAddress: string | undefined
      chainName: string | undefined
    }) => {
      const { data: cw20BaseQueryClient } = useModuleQueryClient({
        ...rest,
        Module: Cw20BaseQueryClient,
      })

      return useCw20BaseAllowanceQuery({
        client: cw20BaseQueryClient,
        options,
        args,
      })
    },
    useMinter: ({
      options,
      ...rest
    }: Omit<
      Parameters<
        typeof useCw20BaseMinterQuery<Cw20BaseTypes.MinterResponse>
      >[0],
      'client'
    > & {
      contractAddress: string | undefined
      chainName: string | undefined
    }) => {
      const { data: cw20BaseQueryClient } = useModuleQueryClient({
        ...rest,
        Module: Cw20BaseQueryClient,
      })

      return useCw20BaseMinterQuery({
        client: cw20BaseQueryClient,
        options,
      })
    },
    useTokenInfo: ({
      options,
      ...rest
    }: Omit<
      Parameters<
        typeof useCw20BaseTokenInfoQuery<Cw20BaseTypes.TokenInfoResponse>
      >[0],
      'client'
    > & {
      contractAddress: string | undefined
      chainName: string | undefined
    }) => {
      const { data: cw20BaseQueryClient } = useModuleQueryClient({
        ...rest,
        Module: Cw20BaseQueryClient,
      })

      return useCw20BaseTokenInfoQuery({
        client: cw20BaseQueryClient,
        options,
      })
    },
    useBalance: ({
      options,
      args,
      ...rest
    }: Omit<
      Parameters<
        typeof useCw20BaseBalanceQuery<Cw20BaseTypes.BalanceResponse>
      >[0],
      'client'
    > & {
      contractAddress: string | undefined
      chainName: string | undefined
    }) => {
      const { data: cw20BaseQueryClient } = useModuleQueryClient({
        ...rest,
        Module: Cw20BaseQueryClient,
      })

      return useCw20BaseBalanceQuery({
        client: cw20BaseQueryClient,
        options,
        args,
      })
    },
  },
  mutations: {
    useUploadLogo: (
      {
        contractAddress,
        chainName,
        sender,
      }: {
        contractAddress: string | undefined
        chainName: string | undefined
        sender?: string | undefined
      },
      options?: Omit<
        UseMutationOptions<
          ExecuteResult,
          Error,
          Omit<Cw20BaseUploadLogoMutation, 'client'>
        >,
        'mutationFn'
      >,
    ) => {
      const {
        data: cw20BaseClient,
        // TODO: figure out what to do with those
        // isLoading: isCw20BaseClientLoading,
        // isError: isCw20BaseClientError,
        // error: cw20BaseClientError,
      } = useModuleClient({
        contractAddress,
        chainName,
        Module: Cw20BaseClient,
      })

      const {
        mutate: mutate_,
        mutateAsync: mutateAsync_,
        ...rest
      } = useCw20BaseUploadLogoMutation(options)

      const mutate = useMemo(() => {
        if (!cw20BaseClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutate_>[0], 'client'>,
          options?: Parameters<typeof mutate_>[1],
        ) => mutate_({ client: cw20BaseClient, ...variables }, options)
      }, [mutate_, cw20BaseClient])

      const mutateAsync = useMemo(() => {
        if (!cw20BaseClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutateAsync_>[0], 'client'>,
          options?: Parameters<typeof mutateAsync_>[1],
        ) => mutateAsync_({ client: cw20BaseClient, ...variables }, options)
      }, [mutateAsync_, cw20BaseClient])

      return { mutate, mutateAsync, ...rest } as const
    },
    useUpdateMarketing: (
      {
        contractAddress,
        chainName,
        sender,
      }: {
        contractAddress: string | undefined
        chainName: string | undefined
        sender?: string | undefined
      },
      options?: Omit<
        UseMutationOptions<
          ExecuteResult,
          Error,
          Omit<Cw20BaseUpdateMarketingMutation, 'client'>
        >,
        'mutationFn'
      >,
    ) => {
      const {
        data: cw20BaseClient,
        // TODO: figure out what to do with those
        // isLoading: isCw20BaseClientLoading,
        // isError: isCw20BaseClientError,
        // error: cw20BaseClientError,
      } = useModuleClient({
        contractAddress,
        chainName,
        Module: Cw20BaseClient,
      })

      const {
        mutate: mutate_,
        mutateAsync: mutateAsync_,
        ...rest
      } = useCw20BaseUpdateMarketingMutation(options)

      const mutate = useMemo(() => {
        if (!cw20BaseClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutate_>[0], 'client'>,
          options?: Parameters<typeof mutate_>[1],
        ) => mutate_({ client: cw20BaseClient, ...variables }, options)
      }, [mutate_, cw20BaseClient])

      const mutateAsync = useMemo(() => {
        if (!cw20BaseClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutateAsync_>[0], 'client'>,
          options?: Parameters<typeof mutateAsync_>[1],
        ) => mutateAsync_({ client: cw20BaseClient, ...variables }, options)
      }, [mutateAsync_, cw20BaseClient])

      return { mutate, mutateAsync, ...rest } as const
    },
    useUpdateMinter: (
      {
        contractAddress,
        chainName,
        sender,
      }: {
        contractAddress: string | undefined
        chainName: string | undefined
        sender?: string | undefined
      },
      options?: Omit<
        UseMutationOptions<
          ExecuteResult,
          Error,
          Omit<Cw20BaseUpdateMinterMutation, 'client'>
        >,
        'mutationFn'
      >,
    ) => {
      const {
        data: cw20BaseClient,
        // TODO: figure out what to do with those
        // isLoading: isCw20BaseClientLoading,
        // isError: isCw20BaseClientError,
        // error: cw20BaseClientError,
      } = useModuleClient({
        contractAddress,
        chainName,
        Module: Cw20BaseClient,
      })

      const {
        mutate: mutate_,
        mutateAsync: mutateAsync_,
        ...rest
      } = useCw20BaseUpdateMinterMutation(options)

      const mutate = useMemo(() => {
        if (!cw20BaseClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutate_>[0], 'client'>,
          options?: Parameters<typeof mutate_>[1],
        ) => mutate_({ client: cw20BaseClient, ...variables }, options)
      }, [mutate_, cw20BaseClient])

      const mutateAsync = useMemo(() => {
        if (!cw20BaseClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutateAsync_>[0], 'client'>,
          options?: Parameters<typeof mutateAsync_>[1],
        ) => mutateAsync_({ client: cw20BaseClient, ...variables }, options)
      }, [mutateAsync_, cw20BaseClient])

      return { mutate, mutateAsync, ...rest } as const
    },
    useMint: (
      {
        contractAddress,
        chainName,
        sender,
      }: {
        contractAddress: string | undefined
        chainName: string | undefined
        sender?: string | undefined
      },
      options?: Omit<
        UseMutationOptions<
          ExecuteResult,
          Error,
          Omit<Cw20BaseMintMutation, 'client'>
        >,
        'mutationFn'
      >,
    ) => {
      const {
        data: cw20BaseClient,
        // TODO: figure out what to do with those
        // isLoading: isCw20BaseClientLoading,
        // isError: isCw20BaseClientError,
        // error: cw20BaseClientError,
      } = useModuleClient({
        contractAddress,
        chainName,
        Module: Cw20BaseClient,
      })

      const {
        mutate: mutate_,
        mutateAsync: mutateAsync_,
        ...rest
      } = useCw20BaseMintMutation(options)

      const mutate = useMemo(() => {
        if (!cw20BaseClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutate_>[0], 'client'>,
          options?: Parameters<typeof mutate_>[1],
        ) => mutate_({ client: cw20BaseClient, ...variables }, options)
      }, [mutate_, cw20BaseClient])

      const mutateAsync = useMemo(() => {
        if (!cw20BaseClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutateAsync_>[0], 'client'>,
          options?: Parameters<typeof mutateAsync_>[1],
        ) => mutateAsync_({ client: cw20BaseClient, ...variables }, options)
      }, [mutateAsync_, cw20BaseClient])

      return { mutate, mutateAsync, ...rest } as const
    },
    useBurnFrom: (
      {
        contractAddress,
        chainName,
        sender,
      }: {
        contractAddress: string | undefined
        chainName: string | undefined
        sender?: string | undefined
      },
      options?: Omit<
        UseMutationOptions<
          ExecuteResult,
          Error,
          Omit<Cw20BaseBurnFromMutation, 'client'>
        >,
        'mutationFn'
      >,
    ) => {
      const {
        data: cw20BaseClient,
        // TODO: figure out what to do with those
        // isLoading: isCw20BaseClientLoading,
        // isError: isCw20BaseClientError,
        // error: cw20BaseClientError,
      } = useModuleClient({
        contractAddress,
        chainName,
        Module: Cw20BaseClient,
      })

      const {
        mutate: mutate_,
        mutateAsync: mutateAsync_,
        ...rest
      } = useCw20BaseBurnFromMutation(options)

      const mutate = useMemo(() => {
        if (!cw20BaseClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutate_>[0], 'client'>,
          options?: Parameters<typeof mutate_>[1],
        ) => mutate_({ client: cw20BaseClient, ...variables }, options)
      }, [mutate_, cw20BaseClient])

      const mutateAsync = useMemo(() => {
        if (!cw20BaseClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutateAsync_>[0], 'client'>,
          options?: Parameters<typeof mutateAsync_>[1],
        ) => mutateAsync_({ client: cw20BaseClient, ...variables }, options)
      }, [mutateAsync_, cw20BaseClient])

      return { mutate, mutateAsync, ...rest } as const
    },
    useSendFrom: (
      {
        contractAddress,
        chainName,
        sender,
      }: {
        contractAddress: string | undefined
        chainName: string | undefined
        sender?: string | undefined
      },
      options?: Omit<
        UseMutationOptions<
          ExecuteResult,
          Error,
          Omit<Cw20BaseSendFromMutation, 'client'>
        >,
        'mutationFn'
      >,
    ) => {
      const {
        data: cw20BaseClient,
        // TODO: figure out what to do with those
        // isLoading: isCw20BaseClientLoading,
        // isError: isCw20BaseClientError,
        // error: cw20BaseClientError,
      } = useModuleClient({
        contractAddress,
        chainName,
        Module: Cw20BaseClient,
      })

      const {
        mutate: mutate_,
        mutateAsync: mutateAsync_,
        ...rest
      } = useCw20BaseSendFromMutation(options)

      const mutate = useMemo(() => {
        if (!cw20BaseClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutate_>[0], 'client'>,
          options?: Parameters<typeof mutate_>[1],
        ) => mutate_({ client: cw20BaseClient, ...variables }, options)
      }, [mutate_, cw20BaseClient])

      const mutateAsync = useMemo(() => {
        if (!cw20BaseClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutateAsync_>[0], 'client'>,
          options?: Parameters<typeof mutateAsync_>[1],
        ) => mutateAsync_({ client: cw20BaseClient, ...variables }, options)
      }, [mutateAsync_, cw20BaseClient])

      return { mutate, mutateAsync, ...rest } as const
    },
    useTransferFrom: (
      {
        contractAddress,
        chainName,
        sender,
      }: {
        contractAddress: string | undefined
        chainName: string | undefined
        sender?: string | undefined
      },
      options?: Omit<
        UseMutationOptions<
          ExecuteResult,
          Error,
          Omit<Cw20BaseTransferFromMutation, 'client'>
        >,
        'mutationFn'
      >,
    ) => {
      const {
        data: cw20BaseClient,
        // TODO: figure out what to do with those
        // isLoading: isCw20BaseClientLoading,
        // isError: isCw20BaseClientError,
        // error: cw20BaseClientError,
      } = useModuleClient({
        contractAddress,
        chainName,
        Module: Cw20BaseClient,
      })

      const {
        mutate: mutate_,
        mutateAsync: mutateAsync_,
        ...rest
      } = useCw20BaseTransferFromMutation(options)

      const mutate = useMemo(() => {
        if (!cw20BaseClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutate_>[0], 'client'>,
          options?: Parameters<typeof mutate_>[1],
        ) => mutate_({ client: cw20BaseClient, ...variables }, options)
      }, [mutate_, cw20BaseClient])

      const mutateAsync = useMemo(() => {
        if (!cw20BaseClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutateAsync_>[0], 'client'>,
          options?: Parameters<typeof mutateAsync_>[1],
        ) => mutateAsync_({ client: cw20BaseClient, ...variables }, options)
      }, [mutateAsync_, cw20BaseClient])

      return { mutate, mutateAsync, ...rest } as const
    },
    useDecreaseAllowance: (
      {
        contractAddress,
        chainName,
        sender,
      }: {
        contractAddress: string | undefined
        chainName: string | undefined
        sender?: string | undefined
      },
      options?: Omit<
        UseMutationOptions<
          ExecuteResult,
          Error,
          Omit<Cw20BaseDecreaseAllowanceMutation, 'client'>
        >,
        'mutationFn'
      >,
    ) => {
      const {
        data: cw20BaseClient,
        // TODO: figure out what to do with those
        // isLoading: isCw20BaseClientLoading,
        // isError: isCw20BaseClientError,
        // error: cw20BaseClientError,
      } = useModuleClient({
        contractAddress,
        chainName,
        Module: Cw20BaseClient,
      })

      const {
        mutate: mutate_,
        mutateAsync: mutateAsync_,
        ...rest
      } = useCw20BaseDecreaseAllowanceMutation(options)

      const mutate = useMemo(() => {
        if (!cw20BaseClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutate_>[0], 'client'>,
          options?: Parameters<typeof mutate_>[1],
        ) => mutate_({ client: cw20BaseClient, ...variables }, options)
      }, [mutate_, cw20BaseClient])

      const mutateAsync = useMemo(() => {
        if (!cw20BaseClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutateAsync_>[0], 'client'>,
          options?: Parameters<typeof mutateAsync_>[1],
        ) => mutateAsync_({ client: cw20BaseClient, ...variables }, options)
      }, [mutateAsync_, cw20BaseClient])

      return { mutate, mutateAsync, ...rest } as const
    },
    useIncreaseAllowance: (
      {
        contractAddress,
        chainName,
        sender,
      }: {
        contractAddress: string | undefined
        chainName: string | undefined
        sender?: string | undefined
      },
      options?: Omit<
        UseMutationOptions<
          ExecuteResult,
          Error,
          Omit<Cw20BaseIncreaseAllowanceMutation, 'client'>
        >,
        'mutationFn'
      >,
    ) => {
      const {
        data: cw20BaseClient,
        // TODO: figure out what to do with those
        // isLoading: isCw20BaseClientLoading,
        // isError: isCw20BaseClientError,
        // error: cw20BaseClientError,
      } = useModuleClient({
        contractAddress,
        chainName,
        Module: Cw20BaseClient,
      })

      const {
        mutate: mutate_,
        mutateAsync: mutateAsync_,
        ...rest
      } = useCw20BaseIncreaseAllowanceMutation(options)

      const mutate = useMemo(() => {
        if (!cw20BaseClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutate_>[0], 'client'>,
          options?: Parameters<typeof mutate_>[1],
        ) => mutate_({ client: cw20BaseClient, ...variables }, options)
      }, [mutate_, cw20BaseClient])

      const mutateAsync = useMemo(() => {
        if (!cw20BaseClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutateAsync_>[0], 'client'>,
          options?: Parameters<typeof mutateAsync_>[1],
        ) => mutateAsync_({ client: cw20BaseClient, ...variables }, options)
      }, [mutateAsync_, cw20BaseClient])

      return { mutate, mutateAsync, ...rest } as const
    },
    useSend: (
      {
        contractAddress,
        chainName,
        sender,
      }: {
        contractAddress: string | undefined
        chainName: string | undefined
        sender?: string | undefined
      },
      options?: Omit<
        UseMutationOptions<
          ExecuteResult,
          Error,
          Omit<Cw20BaseSendMutation, 'client'>
        >,
        'mutationFn'
      >,
    ) => {
      const {
        data: cw20BaseClient,
        // TODO: figure out what to do with those
        // isLoading: isCw20BaseClientLoading,
        // isError: isCw20BaseClientError,
        // error: cw20BaseClientError,
      } = useModuleClient({
        contractAddress,
        chainName,
        Module: Cw20BaseClient,
      })

      const {
        mutate: mutate_,
        mutateAsync: mutateAsync_,
        ...rest
      } = useCw20BaseSendMutation(options)

      const mutate = useMemo(() => {
        if (!cw20BaseClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutate_>[0], 'client'>,
          options?: Parameters<typeof mutate_>[1],
        ) => mutate_({ client: cw20BaseClient, ...variables }, options)
      }, [mutate_, cw20BaseClient])

      const mutateAsync = useMemo(() => {
        if (!cw20BaseClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutateAsync_>[0], 'client'>,
          options?: Parameters<typeof mutateAsync_>[1],
        ) => mutateAsync_({ client: cw20BaseClient, ...variables }, options)
      }, [mutateAsync_, cw20BaseClient])

      return { mutate, mutateAsync, ...rest } as const
    },
    useBurn: (
      {
        contractAddress,
        chainName,
        sender,
      }: {
        contractAddress: string | undefined
        chainName: string | undefined
        sender?: string | undefined
      },
      options?: Omit<
        UseMutationOptions<
          ExecuteResult,
          Error,
          Omit<Cw20BaseBurnMutation, 'client'>
        >,
        'mutationFn'
      >,
    ) => {
      const {
        data: cw20BaseClient,
        // TODO: figure out what to do with those
        // isLoading: isCw20BaseClientLoading,
        // isError: isCw20BaseClientError,
        // error: cw20BaseClientError,
      } = useModuleClient({
        contractAddress,
        chainName,
        Module: Cw20BaseClient,
      })

      const {
        mutate: mutate_,
        mutateAsync: mutateAsync_,
        ...rest
      } = useCw20BaseBurnMutation(options)

      const mutate = useMemo(() => {
        if (!cw20BaseClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutate_>[0], 'client'>,
          options?: Parameters<typeof mutate_>[1],
        ) => mutate_({ client: cw20BaseClient, ...variables }, options)
      }, [mutate_, cw20BaseClient])

      const mutateAsync = useMemo(() => {
        if (!cw20BaseClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutateAsync_>[0], 'client'>,
          options?: Parameters<typeof mutateAsync_>[1],
        ) => mutateAsync_({ client: cw20BaseClient, ...variables }, options)
      }, [mutateAsync_, cw20BaseClient])

      return { mutate, mutateAsync, ...rest } as const
    },
    useTransfer: (
      {
        contractAddress,
        chainName,
        sender,
      }: {
        contractAddress: string | undefined
        chainName: string | undefined
        sender?: string | undefined
      },
      options?: Omit<
        UseMutationOptions<
          ExecuteResult,
          Error,
          Omit<Cw20BaseTransferMutation, 'client'>
        >,
        'mutationFn'
      >,
    ) => {
      const {
        data: cw20BaseClient,
        // TODO: figure out what to do with those
        // isLoading: isCw20BaseClientLoading,
        // isError: isCw20BaseClientError,
        // error: cw20BaseClientError,
      } = useModuleClient({
        contractAddress,
        chainName,
        Module: Cw20BaseClient,
      })

      const {
        mutate: mutate_,
        mutateAsync: mutateAsync_,
        ...rest
      } = useCw20BaseTransferMutation(options)

      const mutate = useMemo(() => {
        if (!cw20BaseClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutate_>[0], 'client'>,
          options?: Parameters<typeof mutate_>[1],
        ) => mutate_({ client: cw20BaseClient, ...variables }, options)
      }, [mutate_, cw20BaseClient])

      const mutateAsync = useMemo(() => {
        if (!cw20BaseClient) return undefined

        return (
          variables: Omit<Parameters<typeof mutateAsync_>[0], 'client'>,
          options?: Parameters<typeof mutateAsync_>[1],
        ) => mutateAsync_({ client: cw20BaseClient, ...variables }, options)
      }, [mutateAsync_, cw20BaseClient])

      return { mutate, mutateAsync, ...rest } as const
    },
  },
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Vanilla
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export * from './cosmwasm-codegen/Cw20Base.client'
export * from './cosmwasm-codegen/Cw20Base.message-builder'
export * from './cosmwasm-codegen/Cw20Base.message-composer'
import * as Cw20BaseTypes from './cosmwasm-codegen/Cw20Base.types'
export { Cw20BaseTypes }
