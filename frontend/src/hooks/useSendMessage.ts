import { useMutation } from "@apollo/client";
import { graphql } from "../gql";
import { MessageFragment } from "../fragments/message.fragment";

const createMessageDocument = graphql(`
  mutation createMessage($createMessageInput: CreateMessageInput!) {
    Create_New_Message(createMessageInput: $createMessageInput) {
      _id
      content
      sender
      createdAt
    }
  }
`);

const useSendMessage = () => {
    return useMutation(createMessageDocument,{
        update: (cache, { data }) => {
            if (!data) return;
            cache.modify({
                fields: {
                    Get_All_Messages(existingMessages = []) {
                        const newMessageRef = cache.writeFragment({
                            data: data.Create_New_Message,
                            fragment: MessageFragment,
                        });
                        return [...existingMessages, newMessageRef];
                    },
                },
            });
        },
    })
}

export default useSendMessage;