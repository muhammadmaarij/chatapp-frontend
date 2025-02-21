"use client";
import styles from "./ProfileModal.module.scss";
import Image from "next/image";
import { useState } from "react";
import { poppins } from "@/app/fonts";
import { useProfile } from "@/hooks/user/useProfile"; // ✅ Import the API hook
import EditContactModal from "../EditContactModal/EditContactModal";
import EditProfileModal from "../EditProfile/EditProfileModal";
import DefaultAvatar from "@/assets/images/default-avatar.jpg";
import { baseUrl } from "@/api/constants/baseUrl";
import CloseButton from "../CloseButton/CloseButton";

interface ProfileModalProps {
  onClose: () => void;
}

export default function ProfileModal({ onClose }: ProfileModalProps) {
  const { data: user, isLoading } = useProfile(); // ✅ Fetch user data
  const [isEditContactOpen, setEditContactOpen] = useState(false);
  const [isEditProfileOpen, setEditProfileOpen] = useState(false);

  if (isLoading) {
    return <div className={styles.loading}>Loading profile...</div>;
  }

  return (
    <div className={styles.modalContainer}>
      <div className={styles.overlay} onClick={onClose} />
      <div className={`${poppins.className} ${styles.modal}`}>
        <div className={styles.header}>
          <h2 className={styles.heading}>Profile</h2>
          <CloseButton onClick={onClose} />
        </div>
        <hr className={styles.line} />

        <div className={styles.profileImage}>
          <Image
            src={
              user.avatar_url ? `${baseUrl}${user.avatar_url}` : DefaultAvatar
            }
            alt="Profile Picture"
            width={200}
            height={200}
            className={styles.avatar}
          />
        </div>

        <div className={styles.editSection}>
          <div className={styles.info}>
            <h3>{user.display_name || "Unknown"}</h3>
            <p className={styles.username}>@{user.username}</p>
          </div>
          <button
            className={styles.editButton}
            onClick={() => setEditProfileOpen(true)}
          >
            Edit
          </button>
        </div>

        <div className={styles.field}>
          <p>{user.status || "No status set"}</p>
        </div>

        <br />
        <br />
        <hr className={styles.line} />

        <div className={styles.editSection}>
          <div className={styles.field}>
            <label>Email Address</label>
            <p>{user.email}</p>
          </div>
          <button
            className={styles.editButton}
            onClick={() => setEditContactOpen(true)}
          >
            Edit
          </button>
        </div>

        <button className={styles.addInfo}>+ Add Information</button>
      </div>

      {isEditContactOpen && (
        <EditContactModal
          initialEmail={user.email}
          initialContact={""} // Add contact field in the future
          onClose={() => setEditContactOpen(false)}
          onSave={(email, contact) => {
            console.log("Updated Email:", email);
            console.log("Updated Contact:", contact);
            setEditContactOpen(false);
          }}
        />
      )}

      {isEditProfileOpen && (
        <EditProfileModal onClose={() => setEditProfileOpen(false)} />
      )}
    </div>
  );
}
