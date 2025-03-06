"use client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import axiosInstance from "@/api/axiosInstance";
import { baseUrl } from "@/api/constants/baseUrl";
import DefaultAvatar from "@/assets/images/default-avatar.jpg";
import { GroupDetails } from "@/types/components/types";
export function useGroupInfo() {
  const { groupId } = useParams<{ groupId: string }>(); // Extract groupId from URL

  return useQuery<GroupDetails>({
    queryKey: ["groupInfo", groupId], // ✅ Unique query key
    queryFn: async () => {
      if (!groupId) throw new Error("Group ID is missing!"); // Prevents unnecessary API calls

      const response = await axiosInstance.get(
        `${baseUrl}/api/chat/group/info/${groupId}`
      );

      const { group, members } = response.data;

      return {
        id: group.id,
        name: group.group_name,
        avatar_url: group.group_avatar || DefaultAvatar, // Ensure fallback avatar
        created_at: group.created_at,
        created_by: group.created_by,
        updated_at: group.updated_at,
        members: members || [], // Ensures we always have an array
      };
    },
    enabled: !!groupId,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
}
