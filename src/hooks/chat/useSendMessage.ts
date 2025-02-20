import { sendMessage } from "@/api/chat/chatApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  display_name: string;
  content: string;
  created_at: string;
  type: string;
}

export const useSendMessage = (conversationId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (message: { type: string; content: string }) => {
      const response = await sendMessage({ conversation_id: conversationId, ...message });
      return response as Message; // ✅ Ensure correct type
    },
    onSuccess: (newMessage) => {
      queryClient.setQueryData<Message[]>(["messages", conversationId], (oldMessages = []) => {
        return [...oldMessages, newMessage]
          .filter((msg, index, self) => self.findIndex((m) => m.id === msg.id) === index) // ✅ Unique messages
          .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()); // ✅ Correct order
      });
    },
  });
};
