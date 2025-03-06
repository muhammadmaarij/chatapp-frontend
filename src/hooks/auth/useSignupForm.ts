import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { APIError, SignupProps } from "@/types/components/types";
import useSignup from "@/hooks/auth/useSignup";

export const useSignupForm = (
  onSignupComplete?: SignupProps["onSignupComplete"]
) => {
  const { signup, isPending } = useSignup();
  const [formData, setFormData] = useState({
    email: "",
    display_name: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [passwordStrength, setPasswordStrength] = useState("");

  useEffect(() => validateForm(), [formData]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (formData.password.length < 6) {
      newErrors.password = "Must be at least 6 characters";
      setPasswordStrength("Weak");
    } else if (formData.password.length < 10) {
      setPasswordStrength("Medium");
    } else {
      setPasswordStrength("Strong");
    }
    setErrors(newErrors);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(errors).some((err) => err !== "")) return;

    try {
      await signup(formData);
      toast.success("Signup successful! Check your email for verification.");
      onSignupComplete?.(formData.email);
    } catch (err: unknown) {
      let errorMessage = "An error occurred";
      if (typeof err === "object" && err !== null && "response" in err) {
        const axiosError = err as {
          response?: { data?: { error?: APIError | string } };
        };
        errorMessage =
          typeof axiosError.response?.data?.error === "string"
            ? axiosError.response.data.error
            : axiosError.response?.data?.error?.message || errorMessage;
      }
      toast.error(errorMessage);
    }
  };

  return {
    formData,
    errors,
    passwordStrength,
    isPending,
    handleChange,
    handleSubmit,
  };
};
