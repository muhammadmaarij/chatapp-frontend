"use client";
import styles from "./EditContactModal.module.scss";
import { poppins } from "@/app/fonts";
import Modal from "../Modal/Modal";
import { EditContactModalProps } from "@/types/components/types";
import OutlineButton from "../OutlineButton/OutlineButton";
import Button from "../PrimaryButton/Button";
import useEditContact from "@/hooks/user/useEditContact";

export default function EditContactModal({
  initialEmail,
  initialContact,
  onClose,
  onSave,
}: EditContactModalProps) {
  const { email, contact, handleEmailChange, handleContactChange, handleSave } =
    useEditContact(initialEmail, initialContact, onSave);

  return (
    <Modal title="Edit Contact Information" onClose={onClose}>
      <div className={styles.inputGroup}>
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          className={styles.input}
          aria-label="Edit email"
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="contact">Contact number</label>
        <input
          id="contact"
          type="text"
          value={contact}
          onChange={handleContactChange}
          className={styles.input}
          aria-label="Edit contact number"
        />
      </div>

      <button className={styles.addInfo} aria-label="Add more info">
        + Add information
      </button>

      <div className={styles.buttonGroup}>
        <OutlineButton onClick={onClose}>Cancel</OutlineButton>
        <Button onClick={handleSave}>Save changes</Button>
      </div>
    </Modal>
  );
}
