import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import { baseUrl } from "@/api/constants/baseUrl";
import { CreateGroupData, GroupInterface } from "@/types/components/types";

export const useCreateGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateGroupData) => {
      const response = await axiosInstance.post<{
        conversation: GroupInterface;
      }>(`${baseUrl}/api/chat/group`, data);
      return response.data.conversation;
    },

    onSuccess: (newGroup) => {
      queryClient.setQueryData<GroupInterface[]>(
        ["my-groups"],
        (oldGroups = []) => {
          return [...oldGroups, newGroup]; // ✅ Append new group
        }
      );
    },
  });
};
