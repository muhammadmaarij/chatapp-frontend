"use client";
import { useState } from "react";
import styles from "./AuthModal.module.scss";
import Image from "next/image";
import { Images } from "@/constants/images";
import { righteous } from "@/app/fonts";
import { useRouter } from "next/navigation";




interface AuthModalProps {
  onClose: () => void;
  mode: "signup" | "login";
  toggleMode: () => void;
  onSignupComplete?: (email: string) => void;
}

export default function AuthModal({ onClose, mode, toggleMode, onSignupComplete }: AuthModalProps) {
  const router = useRouter();
  const isSignup = mode === "signup";

  const [formData, setFormData] = useState({
    email: "",
    displayName: isSignup ? "" : undefined,
    username: isSignup ? "" : undefined,
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isSignup && onSignupComplete) {
      onSignupComplete(formData.email); // Call function to show Confirmation Modal
    }
    else{
      router.push("/dashboard");
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
                  name="displayName"
                  placeholder="Display Name"
                  value={formData.displayName}
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
