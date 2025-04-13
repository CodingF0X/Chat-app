/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  fragment ChatFragment on Chat {\n    _id\n    name\n    latestMessage {\n      ...MessageFragment\n    }\n  }\n": typeof types.ChatFragmentFragmentDoc,
    "\n  fragment MessageFragment on Message {\n    _id\n    content\n    user {\n      _id\n      email\n    }\n    chatId\n    createdAt\n  }\n": typeof types.MessageFragmentFragmentDoc,
    "\n  mutation Create_New_Chat($createChatInput: CreateChatInput!) {\n    Create_New_Chat(createChatInput: $createChatInput) {\n          ...ChatFragment\n    }\n  }\n": typeof types.Create_New_ChatDocument,
    "\n  mutation Mutation($createUserInput: CreateUserInput!) {\n    Create_New_User(createUserInput: $createUserInput) {\n      _id\n      email\n    }\n  }\n": typeof types.MutationDocument,
    "\n  query getChat($id: String!) {\n    Find_Single_Chat(_id: $id) {\n    ...ChatFragment\n    }\n  }\n": typeof types.GetChatDocument,
    "\n  query getChats {\n    Find_Chats {\n      ...ChatFragment\n    }\n  }\n": typeof types.GetChatsDocument,
    "\n  query GetMe {\n    GET_ME {\n      _id\n      email\n    }\n  }\n": typeof types.GetMeDocument,
    "\n  query getMessages($chatId: String!) {\n    Get_All_Messages(chatId: $chatId) {\n      ...MessageFragment\n    }\n  }\n": typeof types.GetMessagesDocument,
    "\n  query Query {\n  Get_All_Users {\n    _id\n    email\n  }\n}\n": typeof types.QueryDocument,
    "\n  subscription messageCreated($chatIds: [String!]!) {\n    Message_Created(chatIds: $chatIds) {\n      ...MessageFragment\n    }\n  }\n": typeof types.MessageCreatedDocument,
    "\n  mutation createMessage($createMessageInput: CreateMessageInput!) {\n    Create_New_Message(createMessageInput: $createMessageInput) {\n      ...MessageFragment\n    }\n  }\n": typeof types.CreateMessageDocument,
};
const documents: Documents = {
    "\n  fragment ChatFragment on Chat {\n    _id\n    name\n    latestMessage {\n      ...MessageFragment\n    }\n  }\n": types.ChatFragmentFragmentDoc,
    "\n  fragment MessageFragment on Message {\n    _id\n    content\n    user {\n      _id\n      email\n    }\n    chatId\n    createdAt\n  }\n": types.MessageFragmentFragmentDoc,
    "\n  mutation Create_New_Chat($createChatInput: CreateChatInput!) {\n    Create_New_Chat(createChatInput: $createChatInput) {\n          ...ChatFragment\n    }\n  }\n": types.Create_New_ChatDocument,
    "\n  mutation Mutation($createUserInput: CreateUserInput!) {\n    Create_New_User(createUserInput: $createUserInput) {\n      _id\n      email\n    }\n  }\n": types.MutationDocument,
    "\n  query getChat($id: String!) {\n    Find_Single_Chat(_id: $id) {\n    ...ChatFragment\n    }\n  }\n": types.GetChatDocument,
    "\n  query getChats {\n    Find_Chats {\n      ...ChatFragment\n    }\n  }\n": types.GetChatsDocument,
    "\n  query GetMe {\n    GET_ME {\n      _id\n      email\n    }\n  }\n": types.GetMeDocument,
    "\n  query getMessages($chatId: String!) {\n    Get_All_Messages(chatId: $chatId) {\n      ...MessageFragment\n    }\n  }\n": types.GetMessagesDocument,
    "\n  query Query {\n  Get_All_Users {\n    _id\n    email\n  }\n}\n": types.QueryDocument,
    "\n  subscription messageCreated($chatIds: [String!]!) {\n    Message_Created(chatIds: $chatIds) {\n      ...MessageFragment\n    }\n  }\n": types.MessageCreatedDocument,
    "\n  mutation createMessage($createMessageInput: CreateMessageInput!) {\n    Create_New_Message(createMessageInput: $createMessageInput) {\n      ...MessageFragment\n    }\n  }\n": types.CreateMessageDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ChatFragment on Chat {\n    _id\n    name\n    latestMessage {\n      ...MessageFragment\n    }\n  }\n"): (typeof documents)["\n  fragment ChatFragment on Chat {\n    _id\n    name\n    latestMessage {\n      ...MessageFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MessageFragment on Message {\n    _id\n    content\n    user {\n      _id\n      email\n    }\n    chatId\n    createdAt\n  }\n"): (typeof documents)["\n  fragment MessageFragment on Message {\n    _id\n    content\n    user {\n      _id\n      email\n    }\n    chatId\n    createdAt\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Create_New_Chat($createChatInput: CreateChatInput!) {\n    Create_New_Chat(createChatInput: $createChatInput) {\n          ...ChatFragment\n    }\n  }\n"): (typeof documents)["\n  mutation Create_New_Chat($createChatInput: CreateChatInput!) {\n    Create_New_Chat(createChatInput: $createChatInput) {\n          ...ChatFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Mutation($createUserInput: CreateUserInput!) {\n    Create_New_User(createUserInput: $createUserInput) {\n      _id\n      email\n    }\n  }\n"): (typeof documents)["\n  mutation Mutation($createUserInput: CreateUserInput!) {\n    Create_New_User(createUserInput: $createUserInput) {\n      _id\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getChat($id: String!) {\n    Find_Single_Chat(_id: $id) {\n    ...ChatFragment\n    }\n  }\n"): (typeof documents)["\n  query getChat($id: String!) {\n    Find_Single_Chat(_id: $id) {\n    ...ChatFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getChats {\n    Find_Chats {\n      ...ChatFragment\n    }\n  }\n"): (typeof documents)["\n  query getChats {\n    Find_Chats {\n      ...ChatFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMe {\n    GET_ME {\n      _id\n      email\n    }\n  }\n"): (typeof documents)["\n  query GetMe {\n    GET_ME {\n      _id\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getMessages($chatId: String!) {\n    Get_All_Messages(chatId: $chatId) {\n      ...MessageFragment\n    }\n  }\n"): (typeof documents)["\n  query getMessages($chatId: String!) {\n    Get_All_Messages(chatId: $chatId) {\n      ...MessageFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Query {\n  Get_All_Users {\n    _id\n    email\n  }\n}\n"): (typeof documents)["\n  query Query {\n  Get_All_Users {\n    _id\n    email\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription messageCreated($chatIds: [String!]!) {\n    Message_Created(chatIds: $chatIds) {\n      ...MessageFragment\n    }\n  }\n"): (typeof documents)["\n  subscription messageCreated($chatIds: [String!]!) {\n    Message_Created(chatIds: $chatIds) {\n      ...MessageFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createMessage($createMessageInput: CreateMessageInput!) {\n    Create_New_Message(createMessageInput: $createMessageInput) {\n      ...MessageFragment\n    }\n  }\n"): (typeof documents)["\n  mutation createMessage($createMessageInput: CreateMessageInput!) {\n    Create_New_Message(createMessageInput: $createMessageInput) {\n      ...MessageFragment\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;