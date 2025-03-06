"use client";
import styles from "./AuthModal.module.scss";
import CloseButton from "../CloseButton/CloseButton";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import { righteous } from "@/app/fonts";
import { AuthModalProps } from "@/types/components/types";
import Overlay from "../Overlay/Overlay";

export default function AuthModal({
  onClose,
  mode,
  toggleMode,
  onSignupComplete,
}: AuthModalProps) {
  const isSignup = mode === "signup";

  return (
    <div className={styles.modalContainer}>
      <Overlay onClose={onClose}>
        <CloseButton onClick={onClose} variant="absolute" />

        <h2 className={`${righteous.className} ${styles.heading}`}>
          {isSignup ? "Signup" : "Login"}
        </h2>

        {isSignup ? <Signup onSignupComplete={onSignupComplete} /> : <Login />}

        <div className={styles.orSeparator}>
          <span>or</span>
        </div>

        <button className={styles.toggleAuth} onClick={toggleMode}>
          {isSignup
            ? "Already have an account? Login"
            : "Don't have an account? Signup"}
        </button>
      </Overlay>
    </div>
  );
}
