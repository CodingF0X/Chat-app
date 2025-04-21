import { graphql } from "../gql";

export const MessageFragment = graphql(`
  fragment MessageFragment on Message {
    _id
    content
    user {
      _id
      email
      imageURL
    }
    chatId
    createdAt
  }
`);
