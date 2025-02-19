import { fetchChatHistory } from "@/api/chat/chatApi";
import { useQuery } from "@tanstack/react-query";

export const useMessages = (conversationId: string) => {
  return useQuery({
    queryKey: ["messages", conversationId], 
    queryFn: () => fetchChatHistory(conversationId), 
    enabled: !!conversationId, 
  });
};
