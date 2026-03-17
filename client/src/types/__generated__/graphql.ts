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
  DateTime: { input: string; output: string; }
};

export type CreateRepairInput = {
  brand: Scalars['String']['input'];
  email: Scalars['String']['input'];
  issue: Scalars['String']['input'];
  model: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  problem: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type FindRepairsByEmailInput = {
  email: Scalars['String']['input'];
};

export type Mutation = {
  __typename: 'Mutation';
  createRepair: Repair;
};


export type MutationCreateRepairArgs = {
  input: CreateRepairInput;
};

export type Query = {
  __typename: 'Query';
  findRepairsByEmail: Array<Repair>;
  health: Scalars['String']['output'];
  myRepairs: Array<Repair>;
  trackRepair: Repair;
};


export type QueryFindRepairsByEmailArgs = {
  input: FindRepairsByEmailInput;
};


export type QueryTrackRepairArgs = {
  input: TrackRepairInput;
};

/** Repair model */
export type Repair = {
  __typename: 'Repair';
  brand: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  issue: Scalars['String']['output'];
  model: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  problem: Scalars['String']['output'];
  ticketCode: Scalars['String']['output'];
  ticketNumber: Scalars['Int']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Maybe<Scalars['String']['output']>;
};

export type TrackRepairInput = {
  ticketCode: Scalars['String']['input'];
};

export type CreateRepairMutationVariables = Exact<{
  input: CreateRepairInput;
}>;


export type CreateRepairMutation = { createRepair: { __typename: 'Repair', ticketCode: string, createdAt: string, name: string, phone: string, email: string, type: string, brand: string, model: string, issue: string, problem: string } };

export type TrackRepairQueryVariables = Exact<{
  input: TrackRepairInput;
}>;


export type TrackRepairQuery = { trackRepair: { __typename: 'Repair', ticketCode: string, createdAt: string, name: string, phone: string, email: string, type: string, brand: string, model: string, issue: string, problem: string } };

export type FindRepairsByEmailQueryVariables = Exact<{
  input: FindRepairsByEmailInput;
}>;


export type FindRepairsByEmailQuery = { findRepairsByEmail: Array<{ __typename: 'Repair', ticketCode: string, createdAt: string, name: string, phone: string, email: string, type: string, brand: string, model: string, issue: string, problem: string }> };

export type MyRepairsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyRepairsQuery = { myRepairs: Array<{ __typename: 'Repair', ticketCode: string, createdAt: string, name: string, phone: string, email: string, type: string, brand: string, model: string, issue: string, problem: string }> };
