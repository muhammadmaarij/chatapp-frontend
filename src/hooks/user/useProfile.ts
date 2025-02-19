import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance"; // ✅ Uses baseURL
import { baseUrl } from "@/api/constants/baseUrl";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"], // ✅ Cache key
    queryFn: async () => {
      const response = await axiosInstance.get(`${baseUrl}/api/profile`);
      return response.data.user;
    },
  });
};
