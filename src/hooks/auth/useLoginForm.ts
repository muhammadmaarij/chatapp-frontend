import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useSignin from "@/hooks/auth/useSignin";

export const useLoginForm = () => {
  const router = useRouter();
  const { login, isPending } = useSignin();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData);
      toast.success("Login successful! Redirecting...");
      router.push("/dashboard");
    } catch (err) {
      let errorMessage = "An unknown error occurred";
      if (err instanceof Error && "response" in err) {
        const axiosError = err as { response?: { data?: { error?: string } } };
        errorMessage = axiosError.response?.data?.error || errorMessage;
      }
      toast.error(errorMessage);
    }
  };

  return { formData, isPending, handleChange, handleSubmit };
};
