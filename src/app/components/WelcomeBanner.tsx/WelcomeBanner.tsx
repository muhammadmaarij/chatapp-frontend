"use client";
import { useState, Dispatch, SetStateAction } from "react";
import styles from "./WelcomeBanner.module.scss";
import Image from "next/image";
import { Images } from "@/constants/images";
import AuthModal from "../AuthPopups/AuthModal";
import { righteous } from "@/app/fonts";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";

export default function WelcomeBanner() {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signup" | "login">("signup");
  const [email, setEmail] = useState<string>("");

  return (
    <section className={styles.welcomeBanner}>
      <div className={styles.container}>
        <LeftContent setAuthMode={setAuthMode} setAuthModalOpen={setAuthModalOpen} />
        <RightImage />
      </div>

      <AuthModalWrapper 
        isAuthModalOpen={isAuthModalOpen} 
        setAuthModalOpen={setAuthModalOpen} 
        authMode={authMode} 
        setAuthMode={setAuthMode} 
        setEmail={setEmail} 
        setConfirmationOpen={setConfirmationOpen} 
      />

      <ConfirmationModalWrapper 
        isConfirmationOpen={isConfirmationOpen} 
        setConfirmationOpen={setConfirmationOpen} 
        email={email} 
      />
    </section>
  );
}

// ✅ Define Props Type for LeftContent
interface LeftContentProps {
  setAuthMode: Dispatch<SetStateAction<"signup" | "login">>;
  setAuthModalOpen: Dispatch<SetStateAction<boolean>>;
}

const LeftContent: React.FC<LeftContentProps> = ({ setAuthMode, setAuthModalOpen }) => {
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
        <button className={styles.signupBtn} onClick={() => handleOpenAuthModal("signup")}>Signup</button>
        <button className={styles.loginBtn} onClick={() => handleOpenAuthModal("login")}>Login</button>
      </div>
    </div>
  );
};

// ✅ Right Image Component
const RightImage: React.FC = () => (
  <div className={styles.rightImage}>
    <Image
      src={Images.landingSvg}
      alt="Welcome Banner Illustration"
      width={650}
      height={450}
      className={styles.bannerImage}
    />
  </div>
);

// ✅ Define Props Type for AuthModalWrapper
interface AuthModalWrapperProps {
  isAuthModalOpen: boolean;
  setAuthModalOpen: Dispatch<SetStateAction<boolean>>;
  authMode: "signup" | "login";
  setAuthMode: Dispatch<SetStateAction<"signup" | "login">>;
  setEmail: Dispatch<SetStateAction<string>>;
  setConfirmationOpen: Dispatch<SetStateAction<boolean>>;
}

const AuthModalWrapper: React.FC<AuthModalWrapperProps> = ({
  isAuthModalOpen,
  setAuthModalOpen,
  authMode,
  setAuthMode,
  setEmail,
  setConfirmationOpen,
}) => {
  const handleSignupComplete = (userEmail: string) => {
    setAuthModalOpen(false);
    setEmail(userEmail);
    setConfirmationOpen(true);
  };

  return isAuthModalOpen ? (
    <AuthModal 
      onClose={() => setAuthModalOpen(false)} 
      mode={authMode} 
      toggleMode={() => setAuthMode(authMode === "signup" ? "login" : "signup")}
      onSignupComplete={handleSignupComplete} 
    />
  ) : null;
};

// ✅ Define Props Type for ConfirmationModalWrapper
interface ConfirmationModalWrapperProps {
  isConfirmationOpen: boolean;
  setConfirmationOpen: Dispatch<SetStateAction<boolean>>;
  email: string;
}

const ConfirmationModalWrapper: React.FC<ConfirmationModalWrapperProps> = ({
  isConfirmationOpen,
  setConfirmationOpen,
  email,
}) => (
  isConfirmationOpen ? (
    <ConfirmationModal 
      onClose={() => setConfirmationOpen(false)} 
      email={email}
      onSuccess={() => console.log("Verification Successful! Redirect user...")}
    />
  ) : null
);
