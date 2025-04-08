/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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
  /** Chat messages */
  messages: Array<Message>;
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

export type CreateMessageInput = {
  /** Chat ID */
  chatId: Scalars['String']['input'];
  /** The message content */
  content: Scalars['String']['input'];
};

export type CreateUserInput = {
  /** Email of user */
  email: Scalars['String']['input'];
  /** Password of user */
  password: Scalars['String']['input'];
};

export type Message = {
  __typename?: 'Message';
  _id: Scalars['ID']['output'];
  /** The message content */
  content: Scalars['String']['output'];
  /** Created date of the message */
  createdAt: Scalars['String']['output'];
  /** The sender of the message */
  sender: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  Create_New_Chat: Chat;
  Create_New_Message: Message;
  Create_New_User: User;
  Delete_Chat: Scalars['String']['output'];
  Delete_User: User;
  Update_Single_Chat: Chat;
  Update_User_Details: User;
};


export type MutationCreate_New_ChatArgs = {
  createChatInput: CreateChatInput;
};


export type MutationCreate_New_MessageArgs = {
  createMessageInput: CreateMessageInput;
};


export type MutationCreate_New_UserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationDelete_ChatArgs = {
  _id: Scalars['String']['input'];
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
  Get_All_Messages: Array<Message>;
  Get_All_Users: Array<User>;
  User: User;
};


export type QueryFind_Single_ChatArgs = {
  _id: Scalars['String']['input'];
};


export type QueryGet_All_MessagesArgs = {
  chatId: Scalars['String']['input'];
};


export type QueryUserArgs = {
  query: Scalars['String']['input'];
};

export type UpdateChatInput = {
  /** Id of Chat */
  _id: Scalars['String']['input'];
  /** Example field (placeholder) */
  isPrivate?: InputMaybe<Scalars['Boolean']['input']>;
  /** Chat Name */
  name: Scalars['String']['input'];
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

export type ChatFragmentFragment = { __typename?: 'Chat', _id: string, userId: string, isPrivate: string, participants: Array<string>, name: string };

export type MessageFragmentFragment = { __typename?: 'Message', _id: string, content: string, sender: string, createdAt: string };

export type Create_New_ChatMutationVariables = Exact<{
  createChatInput: CreateChatInput;
}>;


export type Create_New_ChatMutation = { __typename?: 'Mutation', Create_New_Chat: { __typename?: 'Chat', _id: string, userId: string, isPrivate: string, participants: Array<string>, name: string } };

export type MutationMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;


export type MutationMutation = { __typename?: 'Mutation', Create_New_User: { __typename?: 'User', _id: string, email: string } };

export type GetChatQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetChatQuery = { __typename?: 'Query', Find_Single_Chat: { __typename?: 'Chat', _id: string, userId: string, isPrivate: string, participants: Array<string>, name: string } };

export type GetChatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetChatsQuery = { __typename?: 'Query', Find_Chats: Array<{ __typename?: 'Chat', _id: string, userId: string, isPrivate: string, participants: Array<string>, name: string }> };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', GET_ME: { __typename?: 'User', _id: string, email: string } };

export type GetMessagesQueryVariables = Exact<{
  chatId: Scalars['String']['input'];
}>;


export type GetMessagesQuery = { __typename?: 'Query', Get_All_Messages: Array<{ __typename?: 'Message', _id: string, content: string, sender: string, createdAt: string }> };

export type QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryQuery = { __typename?: 'Query', Get_All_Users: Array<{ __typename?: 'User', _id: string, email: string }> };

export type CreateMessageMutationVariables = Exact<{
  createMessageInput: CreateMessageInput;
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', Create_New_Message: { __typename?: 'Message', _id: string, content: string, sender: string, createdAt: string } };

export const ChatFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ChatFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Chat"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"isPrivate"}},{"kind":"Field","name":{"kind":"Name","value":"participants"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<ChatFragmentFragment, unknown>;
export const MessageFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MessageFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Message"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<MessageFragmentFragment, unknown>;
export const Create_New_ChatDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Create_New_Chat"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createChatInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateChatInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Create_New_Chat"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createChatInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createChatInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ChatFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ChatFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Chat"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"isPrivate"}},{"kind":"Field","name":{"kind":"Name","value":"participants"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<Create_New_ChatMutation, Create_New_ChatMutationVariables>;
export const MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Mutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createUserInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Create_New_User"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createUserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<MutationMutation, MutationMutationVariables>;
export const GetChatDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getChat"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Find_Single_Chat"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ChatFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ChatFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Chat"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"isPrivate"}},{"kind":"Field","name":{"kind":"Name","value":"participants"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<GetChatQuery, GetChatQueryVariables>;
export const GetChatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getChats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Find_Chats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ChatFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ChatFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Chat"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"isPrivate"}},{"kind":"Field","name":{"kind":"Name","value":"participants"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<GetChatsQuery, GetChatsQueryVariables>;
export const GetMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"GET_ME"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<GetMeQuery, GetMeQueryVariables>;
export const GetMessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getMessages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Get_All_Messages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MessageFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MessageFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Message"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<GetMessagesQuery, GetMessagesQueryVariables>;
export const QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Query"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Get_All_Users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<QueryQuery, QueryQueryVariables>;
export const CreateMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createMessageInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateMessageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Create_New_Message"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createMessageInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createMessageInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreateMessageMutation, CreateMessageMutationVariables>;