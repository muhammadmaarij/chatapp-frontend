"use client";
import { useState } from "react";
import styles from "./WelcomeBanner.module.scss";
import { righteous } from "@/app/fonts";
import { Images } from "@/constants/images";
import LeftContent from "./components/LeftContent/LeftContent";
import RightImage from "./components/RightImage/RightImage";
import AuthModalWrapper from "./components/AuthModalWrapper/AuthModalWrapper";
import ConfirmationModalWrapper from "./components/ConfirmationModalWrapper/ConfirmationModalWrapper";

export default function WelcomeBanner() {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signup" | "login">("signup");
  const [email, setEmail] = useState<string>("");

  return (
    <section className={styles.welcomeBanner}>
      <div className={styles.container}>
        <LeftContent
          setAuthMode={setAuthMode}
          setAuthModalOpen={setAuthModalOpen}
        />
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
