import { useState } from "react";
import toast from "react-hot-toast";
import useVerifyEmail from "@/hooks/auth/useVerifyEmail";

export const useEmailVerification = (email: string, onSuccess: () => void) => {
  const [code, setCode] = useState("");
  const { verify, isPending, isError, error } = useVerifyEmail(() => {
    handleVerificationSuccess();
  });

  const handleVerificationSuccess = () => {
    toast.success("✅ Verification successful! Now you can login.");
    onSuccess();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };

  const handleVerify = async () => {
    if (code.length === 6) {
      try {
        await verify({ email, verification_code: code });
      } catch (err) {
        console.error("Verification failed:", err);
        setCode("");
      }
    } else {
      toast.error("Please enter a valid 6-digit code.");
    }
  };

  const openGmail = () => {
    window.open("https://mail.google.com", "_blank");
  };

  return {
    code,
    isPending,
    isError,
    error,
    handleChange,
    handleVerify,
    openGmail,
  };
};
