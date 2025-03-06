import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { SigninResponse, ApiError } from "@/types/auth/interfaces";
import { login } from "@/api/auth/authApi";
import Cookies from "js-cookie";
import { ErrorResponseData, UseLoginResponse } from "@/types/components/types";

const useLogin = (): UseLoginResponse => {
  const queryClient = useQueryClient();

  const loginMutation = useMutation<
    SigninResponse,
    AxiosError<ErrorResponseData>,
    { email: string; password: string }
  >({
    mutationFn: login,
    onSuccess: (data) => {
      Cookies.set("token", data.token);
      queryClient.setQueryData(["loginData"], data);
    },
  });

  const loginError = loginMutation.error
    ? {
        message:
          loginMutation.error.response?.data?.message || "Failed to log in",
        statusCode: loginMutation.error.response?.status || 500,
      }
    : undefined;

  return {
    login: async (data) => {
      await loginMutation.mutateAsync(data);
    },
    isPending: loginMutation.isPending,
    isError: loginMutation.isError,
    error: loginError,
    reset: loginMutation.reset,
  };
};

export default useLogin;
