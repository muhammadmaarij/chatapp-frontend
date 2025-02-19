import { sendMessage } from "@/api/chat/chatApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSendMessage = (conversationId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (message: { type: string; content: string }) => {
      return sendMessage({ conversation_id: conversationId, ...message });
    },
    onSuccess: (newMessage) => {
      queryClient.setQueryData(["messages", conversationId], (oldMessages: any) => {
        if (!oldMessages) return [newMessage];

        // Ensure unique messages & order by created_at
        const updatedMessages = [...oldMessages, newMessage]
          .filter((msg, index, self) => self.findIndex((m) => m.id === msg.id) === index) // Remove duplicates
          .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

        return updatedMessages;
      });
    },
  });
};
