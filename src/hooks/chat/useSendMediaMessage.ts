import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import { baseUrl } from "@/api/constants/baseUrl";

export const useSendMediaMessage = (conversationId: string) => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axiosInstance.post(`${baseUrl}/api/chat/media`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
  });
};
