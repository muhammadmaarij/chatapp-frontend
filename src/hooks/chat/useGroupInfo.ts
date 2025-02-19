import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance"; // ✅ Uses baseURL
import { baseUrl } from "@/api/constants/baseUrl";

export const useGroupInfo = (conversationId: string) => {
  return useQuery({
    queryKey: ["groupInfo", conversationId],
    queryFn: async () => {
      const response = await axiosInstance.get(`${baseUrl}/api/chat/group/info/${conversationId}`);
      return response.data;
    },
    enabled: !!conversationId, // ✅ Only fetch if conversationId exists
  });
};
