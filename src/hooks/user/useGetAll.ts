import { fetchUsers, getConversationId } from "@/api/user/chatApi";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

// Hook to fetch all users
export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
};

// Hook to fetch conversation ID
export const useConversation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (targetUserId: string) => {
      return getConversationId(targetUserId);
    },
  });
};
