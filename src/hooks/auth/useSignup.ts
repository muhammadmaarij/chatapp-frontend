import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ApiError, SignupResponse } from "@/types/auth/interfaces";
import { register } from "@/api/auth/authApi";

interface UseSignupResponse {
  signup: (data: { email: string; password: string; display_name: string; username: string }) => Promise<void>;
  isPending: boolean;
  isError: boolean;
  error?: ApiError;
  reset: () => void;
}

interface ErrorResponseData {
  message?: string;
  statusCode?: number;
}

const useSignup = (): UseSignupResponse => {
  const queryClient = useQueryClient(); 

  const signupMutation = useMutation<
    SignupResponse,
    AxiosError<ErrorResponseData>,
    { email: string; password: string; display_name: string; username: string }
  >({
    mutationFn: register,
    onSuccess: (data) => {
      // Store the signup data in the query cache
      queryClient.setQueryData(["signupData"], data);
    },
  });

  const signupError = signupMutation.error
    ? {
        message: signupMutation.error.response?.data?.message || "Failed to register user",
        statusCode: signupMutation.error.response?.status || 500,
      }
    : undefined;

  return {
    signup: async (data) => {
      await signupMutation.mutateAsync(data);
    },
    isPending: signupMutation.isPending,
    isError: signupMutation.isError,
    error: signupError,
    reset: signupMutation.reset,
  };
};


export const useSignupData = () => {
  return useQuery<SignupResponse | undefined>({
    queryKey: ["signupData"], 
    enabled: false, 
  });
};



export default useSignup;