"use client";
import styles from "./ProfileModal.module.scss";
import { useState } from "react";
import { useProfile } from "@/hooks/user/useProfile";
import EditContactModal from "../EditContactModal/EditContactModal";
import EditProfileModal from "../EditProfile/EditProfileModal";
import { ProfileModalProps } from "@/types/components/types";
import ProfileHeader from "./components/ProfileHeader/ProfileHeader";
import ProfileDetails from "./components/ProfileDetails/ProfileDetails";
import ProfileContact from "./components/ProfileContact/ProfileContact";
import ProfileAvatar from "../ProfileAvatar/ProfileAvatar";
import { poppins } from "@/app/fonts";

export default function ProfileModal({ onClose }: ProfileModalProps) {
  const { data: user, isLoading } = useProfile();
  const [isEditContactOpen, setEditContactOpen] = useState(false);
  const [isEditProfileOpen, setEditProfileOpen] = useState(false);

  if (isLoading)
    return <div className={styles.loading}>Loading profile...</div>;

  const openEditContact = () => setEditContactOpen(true);
  const closeEditContact = () => setEditContactOpen(false);
  const openEditProfile = () => setEditProfileOpen(true);
  const closeEditProfile = () => setEditProfileOpen(false);

  return (
    <div className={styles.modalContainer}>
      <div className={styles.overlay} onClick={onClose} />
      <div className={`${poppins.className} ${styles.modal}`}>
        <ProfileHeader onClose={onClose} />
        <ProfileAvatar
          src={user.avatar_url}
          alt="Profile Avatar"
          size={280}
          variant="square"
        />
        <ProfileDetails
          name={user.display_name}
          username={user.username}
          status={user.status}
          onEditProfile={openEditProfile}
        />
        <ProfileContact email={user.email} onEditContact={openEditContact} />
      </div>

      {isEditContactOpen && (
        <EditContactModal
          initialEmail={user.email}
          initialContact={""} // Future field
          onClose={closeEditContact}
          onSave={(email, contact) => {
            console.log("Updated Email:", email, "Updated Contact:", contact);
            closeEditContact();
          }}
        />
      )}

      {isEditProfileOpen && <EditProfileModal onClose={closeEditProfile} />}
    </div>
  );
}
