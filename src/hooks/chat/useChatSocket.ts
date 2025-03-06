import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import socket from "@/api/utils/socket";
import { Message } from "@/types/components/types";

export const useChatSocket = (conversationId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!conversationId) return;

    console.log(`🔄 Switching to conversation: ${conversationId}`);
    const handleNewMessage = (msg: Message) => {
      if (msg.conversation_id !== conversationId) return;

      queryClient.setQueryData<Message[]>(
        ["messages", conversationId],
        (oldMessages) => {
          const messagesArray = Array.isArray(oldMessages) ? oldMessages : []; // ✅ Ensure array type

          return [...messagesArray, msg]
            .filter(
              (message, index, self) =>
                self.findIndex((m) => m.id === message.id) === index
            )
            .sort(
              (a, b) =>
                new Date(a.created_at).getTime() -
                new Date(b.created_at).getTime()
            );
        }
      );
    };

    socket.on("new_message", handleNewMessage);

    return () => {
      console.log(`🚫 Cleaning up listeners for: ${conversationId}`);
      socket.off("new_message", handleNewMessage);
    };
  }, [conversationId, queryClient]);
};
