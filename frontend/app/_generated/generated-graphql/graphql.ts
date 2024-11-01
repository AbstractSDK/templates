/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A field whose value is a bech32 address: https://en.bitcoin.it/wiki/Bech32. */
  Bech32Address: { input: string; output: string; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  /** The `SafeInt` scalar type represents non-fractional signed whole numeric values that are considered safe as defined by the ECMAScript specification. */
  SafeInt: { input: number; output: number; }
  /** A field whose value is a Semantic Version: https://semver.org */
  Semver: { input: string; output: string; }
  /** string tuple custom scalar type */
  StringSemverTuple: { input: any; output: any; }
  /** string tuple custom scalar type */
  StringTuple: { input: any; output: any; }
  _Any: { input: any; output: any; }
  _FieldSet: { input: any; output: any; }
};

export type AccountBalancesInput = {
  ignoreCache?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AccountFilter = {
  /** Filter by the module and their version installed on the Account */
  modules?: InputMaybe<Array<AccountModuleFilter>>;
  owner?: InputMaybe<Scalars['Bech32Address']['input']>;
};

export type AccountIdInput = {
  sequence: Scalars['SafeInt']['input'];
  trace?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type AccountIdWithChain = {
  chain: Scalars['String']['input'];
  sequence: Scalars['SafeInt']['input'];
  trace?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type AccountModuleFilter = {
  id: Scalars['ID']['input'];
  version?: InputMaybe<Scalars['String']['input']>;
};

/** The asset types supported by CosmWasm */
export enum AssetType {
  Cw20 = 'CW20',
  Cw1155 = 'CW1155',
  Native = 'NATIVE'
}

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type CreateAccount = {
  description?: InputMaybe<Scalars['String']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type EntriesFilter = {
  /** Filter by specific JSON Entries */
  entries?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type IdsFilter = {
  /** Filter by specific IDs */
  ids?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type ModuleFilter = {
  /** Filter by the module's name */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Filter by the module's namespace */
  namespace?: InputMaybe<Scalars['String']['input']>;
  /** Filter by the module's status */
  status?: InputMaybe<ModuleStatus>;
  /** Filter by the module's type */
  type?: InputMaybe<ModuleType>;
  /** Filter by the module's version */
  version?: InputMaybe<Scalars['String']['input']>;
};

/** The status of a module in Version Control */
export enum ModuleStatus {
  Pending = 'PENDING',
  Registered = 'REGISTERED',
  Yanked = 'YANKED'
}

/** The different types of modules supported by Abstract. */
export enum ModuleType {
  Account = 'account',
  Adapter = 'adapter',
  App = 'app',
  Native = 'native',
  Standalone = 'standalone'
}

export type Page = {
  afterId?: InputMaybe<Scalars['String']['input']>;
};

export type PoolFilter = {
  /** The assets in the pool. Must have exactly 2 elements. */
  assetPair?: InputMaybe<Array<Scalars['String']['input']>>;
  dex?: InputMaybe<Scalars['String']['input']>;
};

export enum PoolType {
  ConcentratedLiquidity = 'ConcentratedLiquidity',
  ConstantProduct = 'ConstantProduct',
  LiquidityBootstrap = 'LiquidityBootstrap',
  Stable = 'Stable',
  Weighted = 'Weighted'
}

export type AccountsMetadataQueryVariables = Exact<{
  ids: Array<AccountIdWithChain> | AccountIdWithChain;
}>;


export type AccountsMetadataQuery = { __typename?: 'Query', accountsByIds: Array<{ __typename?: 'AbstractAccount', id: string, address: string, owner?: string | null, info: { __typename?: 'AccountInfo', name?: string | null, chainId: string, description?: string | null, link?: string | null }, balances: Array<{ __typename?: 'Balance', amount: string, denom: string }> }> };


export const AccountsMetadataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AccountsMetadata"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AccountIdWithChain"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountsByIds"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"info"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"link"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"owner"}},{"kind":"Field","name":{"kind":"Name","value":"balances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"denom"}}]}}]}}]}}]} as unknown as DocumentNode<AccountsMetadataQuery, AccountsMetadataQueryVariables>;