"use client";
import { useState, useEffect } from "react";
import styles from "./AuthModal.module.scss";
import Image from "next/image";
import { Images } from "@/constants/images";
import { righteous } from "@/app/fonts";
import { useRouter } from "next/navigation";
import useSignin from "@/hooks/auth/useSignin";
import useSignup from "@/hooks/auth/useSignup";
import toast from "react-hot-toast"; // ✅ Import toast

interface AuthModalProps {
  onClose: () => void;
  mode: "signup" | "login";
  toggleMode: () => void;
  onSignupComplete?: (email: string) => void;
}

export default function AuthModal({ onClose, mode, toggleMode, onSignupComplete }: AuthModalProps) {
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
    setFormData({ email: "", display_name: "", username: "", password: "" });
    setErrors({});
    setPasswordStrength("");
  }, [mode]);

  useEffect(() => {
    const newErrors: { [key: string]: string } = {};

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }


    if (formData.password) {
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
  }, [formData]);

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
        if (onSignupComplete) onSignupComplete(formData.email);
      } else {
        await login({ email: formData.email, password: formData.password });
        toast.success("Login successful! Redirecting...");
        router.push("/dashboard");
      }
    } catch (err) {
      if (err.response?.data?.error) {
        toast.error(err.response.data.error); // ✅ Show error in a toast
      }
    }
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <button className={styles.closeButton} onClick={onClose}>
            <Image src={Images.crossSvgDark} alt="Close" height={30} width={30} />
          </button>
          <h2 className={`${righteous.className} ${styles.heading}`}>
            {isSignup ? "Signup" : "Login"}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className={styles.inputContainer}>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <p className={styles.error}>{errors.email}</p>}
            </div>

            {isSignup && (
              <>
                <div className={styles.inputContainer}>
                  <input
                    type="text"
                    name="display_name"
                    placeholder="Display Name"
                    value={formData.display_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.inputContainer}>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}

            <div className={styles.inputContainer}>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errors.password && <p className={styles.error}>{errors.password}</p>}
              {passwordStrength && isSignup && (
                <p className={`${styles.passwordStrength} ${styles[passwordStrength.toLowerCase()]}`}>
                  Password strength: <strong>{passwordStrength}</strong>
                </p>
              )}
            </div>

            <button
              type="submit"
              className={styles.authButton}
              disabled={isLoggingIn || isSigningUp || Object.values(errors).some((err) => err !== "")}
            >
              {isSignup ? "Signup" : "Login"}
            </button>
          </form>

          <div className={styles.orSeparator}><span>or</span></div>

          <button className={styles.toggleAuth} onClick={toggleMode}>
            {isSignup ? "Already have an account? Login" : "Don't have an account? Signup"}
          </button>
        </div>
      </div>
    </div>
  );
}
