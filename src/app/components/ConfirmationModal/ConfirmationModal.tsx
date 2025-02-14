"use client";
import { useState } from "react";
import styles from "./ConfirmationModal.module.scss";
import Image from "next/image";
import { Images } from "@/constants/images";
import { Check } from "lucide-react"; // ✅ Import the Check icon

interface ConfirmationModalProps {
  onClose: () => void;
  email: string;
  onVerify: (code: string) => void;
}

export default function ConfirmationModal({ onClose, email, onVerify }: ConfirmationModalProps) {
  const [code, setCode] = useState("");

  const handleVerify = () => {
    if (code.length === 6) { 
      onVerify(code); // Send code for verification
    } else {
      alert("Please enter a valid 6-digit code.");
    }
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <button className={styles.closeButton} onClick={onClose}>
            <Image src={Images.crossSvgDark} alt="Close" width={30} height={30} />
          </button>

          <Image src={Images.messageSvg} alt="Email Sent" width={80} height={80} className={styles.icon} />

          <p className={styles.message}>
            Thanks! We have sent a confirmation email to <strong>{email}</strong>
          </p>

          <button
            className={styles.openGmailButton}
            onClick={() => window.open("https://mail.google.com", "_blank")}
          >
            <Image src={Images.gmailSvg} alt="Gmail" width={24} height={24} />
            Open Gmail
          </button>

          <div className={styles.inputContainer}>
            <input
              type="text"
              className={styles.codeInput}
              placeholder="Enter Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={6}
            />
            <button className={styles.verifyButton} onClick={handleVerify}>
              <Check size={24} color="#fff" /> {/* ✅ Lucide Check Icon */}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
