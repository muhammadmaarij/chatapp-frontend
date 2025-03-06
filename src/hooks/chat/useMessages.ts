import { fetchChatHistory } from "@/api/chat/chatApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useMessages = (conversationId: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () => fetchChatHistory(conversationId),
    enabled: !!conversationId,
    initialData: queryClient.getQueryData(["messages", conversationId]) || [],
  });
};
