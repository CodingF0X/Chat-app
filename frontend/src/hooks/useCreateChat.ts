import { useMutation } from "@apollo/client";
import { graphql } from "../gql";
import { ChatFragment } from "../fragments/chat.fragment";

const createChatDocument = graphql(`
  mutation Create_New_Chat($createChatInput: CreateChatInput!) {
    Create_New_Chat(createChatInput: $createChatInput) {
          ...ChatFragment
    }
  }
`);

const useCreateChat = () => {
  // the second argument is to updated the cache after the mutation
  // which updates the chat list with the new chat
    return useMutation(createChatDocument, {
        update(cache, { data }) {
            cache.modify({
                fields: {
                  Find_Chats(existingChats = []) {
                        const newChatRef = cache.writeFragment({
                            data: data?.Create_New_Chat,
                            fragment: ChatFragment
                        });
                        return [...existingChats, newChatRef];
                    }
                }
            });
        }
    })
}

export default useCreateChat;
