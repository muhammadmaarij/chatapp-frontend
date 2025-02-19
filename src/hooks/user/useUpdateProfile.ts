import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance"; // ✅ Uses baseURL
import { baseUrl } from "@/api/constants/baseUrl";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axiosInstance.patch(`${baseUrl}/api/profile`, formData, {
        headers: { "Content-Type": "multipart/form-data" }, // ✅ Important for file uploads
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]); // ✅ Refresh profile data
    },
  });
};
