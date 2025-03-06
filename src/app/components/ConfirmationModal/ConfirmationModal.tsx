"use client";
import styles from "./ConfirmationModal.module.scss";
import Image from "next/image";
import { Images } from "@/constants/images";
import { Check } from "lucide-react";
import CloseButton from "../CloseButton/CloseButton";
import Overlay from "../Overlay/Overlay";
import { useEmailVerification } from "@/hooks/auth/useEmailVerification";
import { poppins } from "@/app/fonts";

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
  const {
    code,
    isPending,
    isError,
    error,
    handleChange,
    handleVerify,
    openGmail,
  } = useEmailVerification(email, () => {
    onClose();
    onSuccess();
  });

  return (
    <Overlay onClose={onClose}>
      <div className={`${poppins.className} ${styles.modalWrapper}`}>
        <CloseButton onClick={onClose} variant="absolute" />

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
          <button
            className={styles.verifyButton}
            onClick={handleVerify}
            disabled={isPending}
          >
            {isPending ? "..." : <Check size={24} color="#fff" />}
          </button>
        </div>

        {isError && <p className={styles.errorMessage}>{error}</p>}
      </div>
    </Overlay>
  );
}
