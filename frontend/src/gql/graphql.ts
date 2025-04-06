/* eslint-disable */
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
};

export type Chat = {
  __typename?: 'Chat';
  _id: Scalars['ID']['output'];
  /** Privacy option */
  isPrivate: Scalars['String']['output'];
  /** Chat name */
  name: Scalars['String']['output'];
  /** Array of chat participants */
  participants: Array<Scalars['String']['output']>;
  /** Id of user created the chat */
  userId: Scalars['String']['output'];
};

export type CreateChatInput = {
  /** Example field (placeholder) */
  isPrivate: Scalars['Boolean']['input'];
  /** Chat name */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Array of chat participants */
  participants?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CreateUserInput = {
  /** Email of user */
  email: Scalars['String']['input'];
  /** Password of user */
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  Create_New_Chat: Chat;
  Create_New_User: User;
  Delete_Chat: Chat;
  Delete_User: User;
  Update_Single_Chat: Chat;
  Update_User_Details: User;
};


export type MutationCreate_New_ChatArgs = {
  createChatInput: CreateChatInput;
};


export type MutationCreate_New_UserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationDelete_ChatArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDelete_UserArgs = {
  _id: Scalars['String']['input'];
};


export type MutationUpdate_Single_ChatArgs = {
  updateChatInput: UpdateChatInput;
};


export type MutationUpdate_User_DetailsArgs = {
  updateUserInput: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  Find_Chats: Array<Chat>;
  Find_Single_Chat: Chat;
  GET_ME: User;
  Get_All_Users: Array<User>;
  User: User;
};


export type QueryFind_Single_ChatArgs = {
  id: Scalars['Int']['input'];
};


export type QueryUserArgs = {
  query: Scalars['String']['input'];
};

export type UpdateChatInput = {
  id: Scalars['Int']['input'];
  /** Example field (placeholder) */
  isPrivate?: InputMaybe<Scalars['Boolean']['input']>;
  /** Chat name */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Array of chat participants */
  participants?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UpdateUserInput = {
  /** Email of user */
  email: Scalars['String']['input'];
  /** Password of user */
  password: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  /** Email of user */
  email: Scalars['String']['output'];
};
