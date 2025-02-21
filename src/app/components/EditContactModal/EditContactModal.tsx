"use client";
import { useState } from "react";
import styles from "./EditContactModal.module.scss";
import { poppins } from "@/app/fonts";
import CloseButton from "../CloseButton/CloseButton";

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

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContact(e.target.value);
  };

  const handleSave = () => {
    onSave(email, contact);
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.overlay} onClick={onClose} />
      <div className={`${poppins.className} ${styles.modal}`}>
        <ModalHeader onClose={onClose} />

        <hr className={styles.line} />

        <div className={styles.inputGroup}>
          <label>Email address</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Contact number</label>
          <input
            type="text"
            value={contact}
            onChange={handleContactChange}
            className={styles.input}
          />
        </div>

        <button className={styles.addInfo}>+ Add information</button>

        <ModalActions onClose={onClose} onSave={handleSave} />
      </div>
    </div>
  );
}

interface ModalHeaderProps {
  onClose: () => void;
}

function ModalHeader({ onClose }: ModalHeaderProps) {
  return (
    <div className={styles.header}>
      <h3 className={styles.heading}>Edit contact information</h3>
      <CloseButton onClick={onClose} />
    </div>
  );
}

interface ModalActionsProps {
  onClose: () => void;
  onSave: () => void;
}

function ModalActions({ onClose, onSave }: ModalActionsProps) {
  return (
    <div className={styles.buttonGroup}>
      <button className={styles.cancelButton} onClick={onClose}>
        Cancel
      </button>
      <button className={styles.saveButton} onClick={onSave}>
        Save changes
      </button>
    </div>
  );
}
