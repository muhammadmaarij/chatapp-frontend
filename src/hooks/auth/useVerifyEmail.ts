import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { verifyEmail } from "@/api/auth/authApi";
import { VerifyEmailResponse } from "@/types/auth/interfaces";

interface UseVerifyEmailResponse {
  verify: (data: { email: string; verification_code: string }) => Promise<void>;
  isPending: boolean;
  isError: boolean;
  error?: string;
  data?: VerifyEmailResponse;
  reset: () => void;
}

const useVerifyEmail = (onSuccess: () => void): UseVerifyEmailResponse => {
  const mutation = useMutation<
  VerifyEmailResponse,
    AxiosError<{ message?: string }>,
    { email: string; verification_code: string }
  >({
    mutationFn: verifyEmail,
    onSuccess: () => {
      onSuccess();  
    },
  });

  return {
    verify: async (data) => {
      await mutation.mutateAsync(data);
    },
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error?.response?.data?.message || "Verification failed: Incorrect code",
    data: mutation.data,
    reset: mutation.reset,
  };
};

export default useVerifyEmail;