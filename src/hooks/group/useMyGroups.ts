import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import { baseUrl } from "@/api/constants/baseUrl";

export const useMyGroups = () => {
  return useQuery({
    queryKey: ["my-groups"],
    queryFn: async () => {
      const response = await axiosInstance.get(`${baseUrl}/api/chat/my-groups`);
      return response.data.groups;
    },
  });
};
