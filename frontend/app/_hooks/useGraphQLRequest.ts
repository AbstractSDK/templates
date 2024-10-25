import { useConfig } from '@abstract-money/react'
import type { TypedDocumentNode } from '@graphql-typed-document-node/core'
import graphQLRequest, { type RequestDocument, type Variables } from 'graphql-request'
import type { VariablesAndRequestHeaders } from 'graphql-request/dist/types'
import { useCallback } from 'react'

export const useGraphQLRequest = <T = unknown, V extends Variables = Variables>(
  gqlQuery: RequestDocument | TypedDocumentNode<T, V>,
) => {
  const { apiUrl } = useConfig()

  return useCallback(
    function request(...variables: VariablesAndRequestHeaders<V>) {
      return graphQLRequest<T, V>(apiUrl, gqlQuery, ...variables)
    },
    [apiUrl, gqlQuery],
  )
}
