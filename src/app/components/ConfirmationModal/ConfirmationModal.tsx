"use client";
import { useState } from "react";
import styles from "./ConfirmationModal.module.scss";
import Image from "next/image";
import { Images } from "@/constants/images";
import { Check } from "lucide-react";
import useVerifyEmail from "@/hooks/auth/useVerifyEmail";

interface ConfirmationModalProps {
  onClose: () => void;
  email: string;
  onSuccess: () => void;
}

export default function ConfirmationModal({
  onClose,
  email,
  onSuccess,
}: ConfirmationModalProps) {
  const [code, setCode] = useState("");

  const { verify, isPending, isError, error } = useVerifyEmail(() => {
    handleVerificationSuccess();
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };

  const handleVerificationSuccess = () => {
    alert("✅ Verification successful! Now you can login.");
    onClose();
    onSuccess();
  };

  const handleVerify = async () => {
    if (code.length === 6) {
      try {
        await verify({ email, verification_code: code });
      } catch (err) {
        console.error("Verification failed:", err);
        setCode("");
      }
    } else {
      alert("Please enter a valid 6-digit code.");
    }
  };

  const openGmail = () => {
    window.open("https://mail.google.com", "_blank");
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <button className={styles.closeButton} onClick={onClose}>
            <Image src={Images.crossSvgDark} alt="Close" width={30} height={30} />
          </button>

          <Image
            src={Images.messageSvg}
            alt="Email Sent"
            width={80}
            height={80}
            className={styles.icon}
          />

          <p className={styles.message}>
            Thanks! We have sent a confirmation email to <strong>{email}</strong>
          </p>

          <button className={styles.openGmailButton} onClick={openGmail}>
            <Image src={Images.gmailSvg} alt="Gmail" width={24} height={24} />
            Open Gmail
          </button>

          <div className={styles.inputContainer}>
            <input
              type="text"
              className={styles.codeInput}
              placeholder="Enter Code"
              value={code}
              onChange={handleChange}
              maxLength={6}
              disabled={isPending}
            />
            <button className={styles.verifyButton} onClick={handleVerify} disabled={isPending}>
              {isPending ? "..." : <Check size={24} color="#fff" />}
            </button>
          </div>

          {isError && <p className={styles.errorMessage}>{error}</p>}
        </div>
      </div>
    </div>
  );
}
