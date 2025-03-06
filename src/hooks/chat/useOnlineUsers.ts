import { useEffect } from "react";
import socket from "@/api/utils/socket";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import { baseUrl } from "@/api/constants/baseUrl";

export const useOnlineUsers = () => {
  const queryClient = useQueryClient();

  const { data: onlineUsers = new Set<string>() } = useQuery({
    queryKey: ["onlineUsers"],
    queryFn: async () => {
      const response = await axiosInstance.get<{ onlineUsers: string[] }>(
        `${baseUrl}/api/auth/online-users`
      );
      return new Set(response.data.onlineUsers || []);
    },
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    const handleUserOnline = ({ userId }: { userId: string }) => {
      queryClient.setQueryData<Set<string>>(
        ["onlineUsers"],
        (prev = new Set()) => {
          const updatedSet = new Set(prev);
          updatedSet.add(userId);
          return updatedSet;
        }
      );
    };

    const handleUserOffline = ({ userId }: { userId: string }) => {
      queryClient.setQueryData<Set<string>>(
        ["onlineUsers"],
        (prev = new Set()) => {
          const updatedSet = new Set(prev);
          updatedSet.delete(userId);
          return updatedSet;
        }
      );
    };

    socket.on("user_online", handleUserOnline);
    socket.on("user_offline", handleUserOffline);

    return () => {
      socket.off("user_online", handleUserOnline);
      socket.off("user_offline", handleUserOffline);
    };
  }, [queryClient]);

  return onlineUsers;
};
