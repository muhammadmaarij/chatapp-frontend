"use client";
import { useState } from "react";
import styles from "./AuthModal.module.scss";
import Image from "next/image";
import { Images } from "@/constants/images";
import { righteous } from "@/app/fonts";
import { useRouter } from "next/navigation";
import useSignin from "@/hooks/auth/useSignin";
import useSignup from "@/hooks/auth/useSignup";


interface AuthModalProps {
  onClose: () => void;
  mode: "signup" | "login";
  toggleMode: () => void;
  onSignupComplete?: (email: string) => void;
}

export default function AuthModal({ onClose, mode, toggleMode, onSignupComplete }: AuthModalProps) {
  const router = useRouter();
  const isSignup = mode === "signup";

  const { login, isPending: isLoggingIn, isError: loginError, error: loginErrorMessage } = useSignin();
  const { signup, isPending: isSigningUp, isError: signupError, error: signupErrorMessage } = useSignup();


  const [formData, setFormData] = useState({
    email: "",
    display_name: isSignup ? "" : undefined,
    username: isSignup ? "" : undefined,
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    name: "",
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (isSignup && onSignupComplete) {
  //     onSignupComplete(formData.email); // Call function to show Confirmation Modal
  //   }
  //   else{
  //     router.push("/dashboard");
  //   }
  // };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (isSignup) {
      try {
        await signup(formData);
        if (onSignupComplete) onSignupComplete(formData.email);
      } catch (err: any) {
        if (Array.isArray(err.response?.data?.errors)) {
          const newErrors: Partial<typeof errors> = {};
  
          err.response.data.errors.forEach((error: any) => {
            const fieldName = error.path[0]; // The field name from the API error
            
            // Ensure fieldName is a valid key of FormData
            if (fieldName in formData) {
              newErrors[fieldName as keyof typeof errors] = error.message;
            }
          });
  
          setErrors({ ...errors, ...newErrors });
        }
      }
    }
     else {
      try {
        await login({ email: formData.email, password: formData.password });
        router.push("/dashboard"); // Redirect after login
      } catch (err) {
        console.error("Login failed:", err);
      }
    }
  };

  return (
    <div className={styles.modalContainer}> {/* ✅ Apply the wrapper class */}
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <button className={styles.closeButton} onClick={onClose}>
          <Image
            src={Images.crossSvgDark}
            alt={"logo here"}
            height={30}
            width={30}
            />
            </button>
            <h2 className={`${righteous.className} ${styles.heading}`}>{isSignup ? "Signup" : "Login"}</h2>


          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email Address / Phone Number"
              value={formData.email}
              onChange={handleChange}
            />

            {isSignup && (
              <>
                <input
                  type="text"
                  name="display_name"
                  placeholder="Display Name"
                  value={formData.display_name}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </>
            )}

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />

            <button type="submit" className={styles.authButton}>
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
