import { sendMessage } from "@/api/chat/chatApi";
import { MessageInterface } from "@/types/components/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSendMessage = (conversationId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (message: { type: string; content: string }) => {
      const response = await sendMessage({
        conversation_id: conversationId,
        ...message,
      });
      return response as MessageInterface; // ✅ Ensure correct type
    },
    onSuccess: (newMessage) => {
      queryClient.setQueryData<MessageInterface[]>(
        ["messages", conversationId],
        (oldMessages = []) => {
          return [...oldMessages, newMessage]
            .filter(
              (msg, index, self) =>
                self.findIndex((m) => m.id === msg.id) === index
            ) // ✅ Unique messages
            .sort(
              (a, b) =>
                new Date(a.created_at).getTime() -
                new Date(b.created_at).getTime()
            ); // ✅ Correct order
        }
      );
    },
  });
};
