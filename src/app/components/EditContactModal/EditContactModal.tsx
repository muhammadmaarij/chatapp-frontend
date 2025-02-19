"use client";
import styles from "./EditContactModal.module.scss";
import { useState } from "react";
import { X } from "lucide-react";
import { Images } from "@/constants/images";
import Image from "next/image";
import { poppins } from "@/app/fonts";

interface EditContactModalProps {
  initialEmail: string;
  initialContact: string;
  onClose: () => void;
  onSave: (email: string, contact: string) => void;
}

export default function EditContactModal({
  initialEmail,
  initialContact,
  onClose,
  onSave,
}: EditContactModalProps) {
  const [email, setEmail] = useState(initialEmail);
  const [contact, setContact] = useState(initialContact);

  return (
    <div className={styles.modalContainer}>
      <div className={styles.overlay} onClick={onClose} />
      <div className={`${poppins.className} ${styles.modal}`}>
        {/* Header */}
        <div className={styles.header}>
          <h3 className={styles.heading}>Edit contact information</h3>
          <button className={styles.closeButton} onClick={onClose}>
            <Image
              src={Images.crossSvgDark}
              alt={"logo here"}
              height={30}
              width={30}
            />
          </button>
        </div>

        <hr className={styles.line} />


        {/* Email Input */}
        <div className={styles.inputGroup}>
          <label>Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
        </div>

        {/* Contact Input */}
        <div className={styles.inputGroup}>
          <label>Contact number</label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className={styles.input}
          />
        </div>

        {/* Add Information */}
        <button className={styles.addInfo}>+ Add information</button>

        {/* Action Buttons */}
        <div className={styles.buttonGroup}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button
            className={styles.saveButton}
            onClick={() => onSave(email, contact)}
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}
