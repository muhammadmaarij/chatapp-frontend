"use client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import axiosInstance from "@/api/axiosInstance";
import { baseUrl } from "@/api/constants/baseUrl";
import { ApiError } from "next/dist/server/api-utils";
import { ChatDetails } from "@/types/components/types";

export function useChatDetails() {
  const { chatId } = useParams<{ chatId: string }>();

  return useQuery<ChatDetails>({
    queryKey: ["chatDetails", chatId],
    queryFn: async () => {
      if (!chatId) throw new Error("Chat ID is missing");
      const response = await axiosInstance.get(
        `${baseUrl}/api/partner/${chatId}`
      );
      const user = response.data.user;
      return {
        id: user.id,
        username: user.username,
        avatar_url: user.avatar_url,
        display_name: user.display_name,
        type: "user",
      };
    },
    enabled: !!chatId,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
}
