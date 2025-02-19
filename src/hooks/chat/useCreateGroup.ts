import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import { baseUrl } from "@/api/constants/baseUrl";

interface CreateGroupData {
  group_name: string;
  group_avatar: string;
  members: string[];
}

export const useCreateGroup = () => {
    const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateGroupData) => {
      const response = await axiosInstance.post(`${baseUrl}/api/chat/group`, data);
      return response.data.conversation;
    },

    onSuccess: (newGroup) => {
        queryClient.setQueryData(["my-groups"], (oldGroups: any) => {
          return oldGroups ? [...oldGroups, newGroup] : [newGroup]; // ✅ Append new group
        });
      },
  });
};

