"use client";
import { useState, useEffect } from "react";
import styles from "./AuthModal.module.scss";
import Image from "next/image";
import { Images } from "@/constants/images";
import { poppins, righteous } from "@/app/fonts";
import { useRouter } from "next/navigation";
import useSignin from "@/hooks/auth/useSignin";
import useSignup from "@/hooks/auth/useSignup";
import toast from "react-hot-toast";

interface AuthModalProps {
  onClose: () => void;
  mode: "signup" | "login";
  toggleMode: () => void;
  onSignupComplete?: (email: string) => void;
}

export default function AuthModal({
  onClose,
  mode,
  toggleMode,
  onSignupComplete,
}: AuthModalProps) {
  const router = useRouter();
  const isSignup = mode === "signup";

  const { login, isPending: isLoggingIn } = useSignin();
  const { signup, isPending: isSigningUp } = useSignup();

  const [formData, setFormData] = useState({
    email: "",
    display_name: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [passwordStrength, setPasswordStrength] = useState("");

  useEffect(() => {
    resetForm();
  }, [mode]);

  useEffect(() => {
    validateForm();
  }, [formData]);

  const resetForm = () => {
    setFormData({ email: "", display_name: "", username: "", password: "" });
    setErrors({});
    setPasswordStrength("");
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (isSignup && formData.password) {
      if (formData.password.length < 6) {
        newErrors.password = "Must be at least 6 characters";
        setPasswordStrength("Weak");
      } else if (formData.password.length < 10) {
        setPasswordStrength("Medium");
      } else {
        setPasswordStrength("Strong");
      }
    } else {
      setPasswordStrength("");
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
      if (isSignup) {
        await signup(formData);
        toast.success("Signup successful! Check your email for verification.");
        onSignupComplete?.(formData.email);
      } else {
        await login({ email: formData.email, password: formData.password });
        toast.success("Login successful! Redirecting...");
        router.push("/dashboard");
      }
    } catch (err) {
      if (err.response?.data?.error) {
        toast.error(err.response.data.error);
      }
    }
  };

  return (
    <div className={`${poppins.className} ${styles.modalContainer}`}>
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <button className={styles.closeButton} onClick={onClose}>
            <Image
              src={Images.crossSvgDark}
              alt="Close"
              height={30}
              width={30}
            />
          </button>
          <h2 className={`${righteous.className} ${styles.heading}`}>
            {isSignup ? "Signup" : "Login"}
          </h2>

          <form onSubmit={handleSubmit}>
            <InputField
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />

            {isSignup && (
              <>
                <InputField
                  type="text"
                  name="display_name"
                  placeholder="Display Name"
                  value={formData.display_name}
                  onChange={handleChange}
                />
                <InputField
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </>
            )}

            <InputField
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              showStrength={isSignup}
              passwordStrength={passwordStrength}
            />

            <button
              type="submit"
              className={styles.authButton}
              disabled={
                isLoggingIn ||
                isSigningUp ||
                Object.values(errors).some((err) => err !== "")
              }
            >
              {isSignup ? "Signup" : "Login"}
            </button>
          </form>

          <div className={styles.orSeparator}>
            <span>or</span>
          </div>

          <button className={styles.toggleAuth} onClick={toggleMode}>
            {isSignup
              ? "Already have an account? Login"
              : "Don't have an account? Signup"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ✅ Reusable InputField component
interface InputFieldProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  showStrength?: boolean;
  passwordStrength?: string;
}

const InputField = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
  showStrength,
  passwordStrength,
}: InputFieldProps) => (
  <div className={styles.inputContainer}>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
    />
    {error && <p className={styles.error}>{error}</p>}
    {showStrength && passwordStrength && type === "password" && (
      <p
        className={`${styles.passwordStrength} ${
          styles[passwordStrength.toLowerCase()]
        }`}
      >
        Password strength: <strong>{passwordStrength}</strong>
      </p>
    )}
  </div>
);
