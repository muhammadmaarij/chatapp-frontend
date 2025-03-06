import styles from "./LeftContent.module.scss";
import { righteous } from "@/app/fonts";
import { LeftContentProps } from "@/types/components/types";

export default function LeftContent({
  setAuthMode,
  setAuthModalOpen,
}: LeftContentProps) {
  const handleOpenAuthModal = (mode: "signup" | "login") => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <div className={styles.leftContent}>
      <h1 className={righteous.className}>Communicate, Anywhere, Anytime</h1>
      <p>
        Connect effortlessly across all devices with Pulse. Break free from
        limitations and redefine communication, anytime, anywhere.
      </p>

      <div className={styles.buttons}>
        <button
          className={styles.signupBtn}
          onClick={() => handleOpenAuthModal("signup")}
        >
          Signup
        </button>
        <button
          className={styles.loginBtn}
          onClick={() => handleOpenAuthModal("login")}
        >
          Login
        </button>
      </div>
    </div>
  );
}
