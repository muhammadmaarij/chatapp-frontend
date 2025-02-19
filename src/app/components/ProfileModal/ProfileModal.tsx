"use client";
import styles from "./ProfileModal.module.scss";
import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react"; // Close button
import { Images } from "@/constants/images";
import { poppins } from "@/app/fonts";
import { useProfile } from "@/hooks/user/useProfile"; // ✅ Import the API hook
import EditContactModal from "../EditContactModal/EditContactModal";
import EditProfileModal from "../EditProfile/EditProfileModal";
import DefaultAvatar from "@/assets/images/default-avatar.jpg";
import { baseUrl } from "@/api/constants/baseUrl";

interface ProfileModalProps {
  onClose: () => void;
}

export default function ProfileModal({ onClose }: ProfileModalProps) {
  const { data: user, isLoading, refetch } = useProfile(); // ✅ Fetch user data
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
          <button className={styles.closeButton} onClick={onClose}>
            <Image
              src={Images.crossSvgDark}
              alt={"Close"}
              height={30}
              width={30}
            />
          </button>
        </div>
        <hr className={styles.line} />

        {/* Profile Image */}
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

        {/* Name & Username */}
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

        {/* Status */}
        <div className={styles.field}>
          <p>{user.status || "No status set"}</p>
        </div>

        <br />
        <br />
        <hr className={styles.line} />

        {/* Email */}
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

        {/* Additional Info */}
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
        <EditProfileModal
          initialName={user.display_name}
          initialUsername={user.username}
          initialStatus={user.status || ""}
          initialAvatar={user.avatar_url || ""}
          onClose={() => setEditProfileOpen(false)}
          onSave={(name, username, status, avatar) => {
            console.log("Updated Profile:", name, username, status, avatar);
            setEditProfileOpen(false);
            refetch(); // ✅ Refetch profile after update
          }}
        />
      )}
    </div>
  );
}
