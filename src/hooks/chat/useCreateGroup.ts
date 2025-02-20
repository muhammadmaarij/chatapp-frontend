import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import { baseUrl } from "@/api/constants/baseUrl";

interface Group {
  id: string;
  group_name: string;
  group_avatar: string;
  created_at: string;
}

interface CreateGroupData {
  group_name: string;
  group_avatar: string;
  members: string[];
}

export const useCreateGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateGroupData) => {
      const response = await axiosInstance.post<{ conversation: Group }>(
        `${baseUrl}/api/chat/group`,
        data
      );
      return response.data.conversation;
    },

    onSuccess: (newGroup) => {
      queryClient.setQueryData<Group[]>(["my-groups"], (oldGroups = []) => {
        return [...oldGroups, newGroup]; // ✅ Append new group
      });
    },
  });
};
