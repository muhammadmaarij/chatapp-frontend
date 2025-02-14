"use client";
import { useState } from "react";
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

  // Simulate Signup Completion
  const handleSignupComplete = (userEmail: string) => {
    setAuthModalOpen(false); // Close signup modal
    setEmail(userEmail); // Store user email
    setConfirmationOpen(true); // Open confirmation modal
  };

  return (
    <section className={styles.welcomeBanner}>
      <div className={styles.container}>
        <div className={`${styles.leftContent}`}>
          <h1 className={righteous.className}>Communicate, Anywhere, Anytime</h1>
          <p>
            Connect effortlessly across all devices with Pulse. Break free from
            limitations and redefine communication, anytime, anywhere.
          </p>

          <div className={styles.buttons}>
            {/* Open Signup Modal */}
            <button 
              className={styles.signupBtn} 
              onClick={() => {
                setAuthMode("signup");
                setAuthModalOpen(true);
              }}
            >
              Signup
            </button>

            {/* Open Login Modal */}
            <button 
              className={styles.loginBtn} 
              onClick={() => {
                setAuthMode("login");
                setAuthModalOpen(true);
              }}
            >
              Login
            </button>
          </div>
        </div>

        <div className={styles.rightImage}>
          <Image
            src={Images.landingSvg}
            alt="Welcome Banner Illustration"
            width={650}
            height={450}
            className={styles.bannerImage}
          />
        </div>
      </div>

      {/* Auth Modal (Appears when a button is clicked) */}
      {isAuthModalOpen && (
        <AuthModal 
          onClose={() => setAuthModalOpen(false)} 
          mode={authMode} 
          toggleMode={() => setAuthMode(authMode === "signup" ? "login" : "signup")}
          onSignupComplete={handleSignupComplete} // Handle signup completion
        />
      )}

      {/* Confirmation Modal (Appears after successful signup) */}
      {isConfirmationOpen && (
        <ConfirmationModal 
          onClose={() => setConfirmationOpen(false)} 
          email={email}
        />
      )}
    </section>
  );
}
